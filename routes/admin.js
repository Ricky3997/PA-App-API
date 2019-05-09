const express = require('express');
const router = express.Router();
const algoConfig = require('../algoConfig');
const _ = require('lodash');
const { Mentor } = require('../models/mentors');
const { Mentee } = require('../models/mentees');
const mongoose = require('mongoose');
const relationshipService = require('../service/relationships');
const messagingService = require('../service/messaging');
const { Relationship } = require('./../models/relationship');

router.post('/changeUserStatus', async (req, res) => {
  const { status, id, type, rejectionReason } = req.body;
  let updated;
  if (type === 'mentor') updated = await Mentor.findByIdAndUpdate(id, {
    status,
    rejectionReason
  }, { new: true }).exec();
  else updated = await Mentee.findByIdAndUpdate(id, { status, rejectionReason }, { new: true }).exec();
  res.json(updated);
});

router.get('/matchingMentorRecommendations/:id', async (req, res) => {
  const {id} = req.params;

  const mentee = await Mentee.findById(id).exec();
  let mentors = await Mentor.find().populate({ path: 'relationship', populate: { path: 'mentee' } }).exec();

  //TODO Only pick mentors of that country
  //TODO stress testing of algorithm and performance with, say, 500, 1000, 2000 and 5000 mentors.
  //including different ways of iterating, i.e. forEach, normal for-loop, and map
  //TODO make the configuration for the algo configurable for the admin teams
  //Get latest configuration
  //TODO Menteee.coursesApplyingFor available with an array of courses interested, chosen from the UI/src/defaults/defaults.json list
  //TODO Handle postgraduate

  let scoredMentors = mentors.filter(mentor => {
    return mentor.status === 'approved'; //Only allow approved mentors to be matched
  }).filter(mentor => {
    return _.get(mentor, 'relationship').length < _.get(mentor, 'maxNumberOfMentees'); //Only propose mentors that have capacity
  }).filter(mentor => {
    if (mentee.mentorBlackList.length === 0) return true;
    else return mentee.mentorBlackList.map(blackListedMentor => blackListedMentor._id.toString()).indexOf(mentor._id.toString()) === -1;  // Only allow matching if mentor not blacklisted
  }).map((mentor) => {
    let score = 0;
    let criteriaMatched = {};
    const degreeLevelMentor = _.get(mentor, 'level');
    let degreeLevelMentee = _.get(mentee, 'level');
    if(degreeLevelMentee === 'Postgraduate') degreeLevelMentee = 'Masters';

    if (degreeLevelMentee === degreeLevelMentor) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['degreePoints'];
    }
    if (_.get(mentee, 'unisApplyingFor').includes(_.get(mentor, 'university'))) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['uniPoints'];
      criteriaMatched['University'] = true;
    } else criteriaMatched['University'] = false;
    if (_.get(mentee, 'subjects').includes(_.get(mentor, 'subject'))) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['subjectPoints'];
      criteriaMatched['Subject'] = true;
    } else criteriaMatched['Subject'] = false;
    if (_.get(mentee, 'country') === _.get(mentor, 'country')) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['countryPoints'];
      criteriaMatched['Country'] = true;
    } else criteriaMatched['Country'] = false;
    if (_.get(mentee, 'firstGenStudent') === _.get(mentor, 'firstGenStudent')) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['firstGenPoints'];
      criteriaMatched['First Gen'] = true;
    } else criteriaMatched['First Gen'] = false;
    if (_.get(mentee, 'gender') === _.get(mentor, 'gender')) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['genderIdentityPoints'];
      criteriaMatched['Gender'] = true;
    } else criteriaMatched['Gender'] = false;
    if (_.get(mentee, 'ethnicBackground') === _.get(mentor, 'ethnicBackground')) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['ethnicBackgroundPoints'];
      criteriaMatched['Ethnic Background'] = true;
    } else criteriaMatched['Ethnic Background'] = false;
    if ((_.get(mentor, 'yearGraduation') - _.get(mentee, 'yearApply')) > 2) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['degreePoints'];
      criteriaMatched['Age Distance'] = true;
    } else criteriaMatched['Age Distance'] = false;
    if (_.get(mentee, 'fromThreeLargestCity') === _.get(mentor, 'fromThreeLargestCity')) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['fromThreeLargestCity'];
      criteriaMatched['From 3 Largest City'] = true;
    } else criteriaMatched['From 3 Largest City'] = false;
    const menteeHobbiesAndInterests = _.get(mentee, 'hobbiesAndInterests');
    const mentorHobbiesAndInterests = _.get(mentor, 'hobbiesAndInterests');
    const hobbyIntersection = _.intersection(menteeHobbiesAndInterests, mentorHobbiesAndInterests);
    if ((hobbyIntersection.length / menteeHobbiesAndInterests.length) >= 0.5) {
      score += algoConfig[degreeLevelMentee][degreeLevelMentor]['hobbiesAndInterests'];
      criteriaMatched['Hobbies & Interests'] = true;
    } else criteriaMatched['Hobbies & Interests'] = true;
    mentor._doc.score = score;
    mentor._doc.criteriaMatched = criteriaMatched;
    return mentor;
  });

  const highestScore = Math.max(...scoredMentors.map(scoredMentor => scoredMentor._doc.score));
  const toReturn = scoredMentors.map(scoredMentor => {
    scoredMentor._doc.score = scoredMentor._doc.score / highestScore * 100; //TODO For now scale highest to be 100% match and rest scaled, next look into proper fitness % score
    return scoredMentor;
  });
  res.json(toReturn);
});

router.post('/createMatch', async (req, res) => {
  const { mentorId, menteeId } = req.body;

  const id = new mongoose.Types.ObjectId();
  await new Relationship({
    _id: id,
    mentee: menteeId,
    mentor: mentorId,
    status: 'awaitingConfirmation',
    matchedOn: new Date()
  }).save();
  const mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { relationship: id } }).exec();
  const mentee = await Mentee.findByIdAndUpdate(menteeId, { relationship: id }).exec();

  const sendBirdResponse = await messagingService.createSendBirdChat(mentor, mentee);

  await Relationship.findByIdAndUpdate(id, { chatUrl: sendBirdResponse.channel_url }).exec();
  const relationshio = await Relationship.findById(id)
    .populate({ path: 'mentee', populate: { path: 'relationship', populate: { path: 'mentor' } } })
    .populate({ path: 'mentor', populate: { path: 'relationship', populate: { path: 'mentee' } } }).exec();

  res.json(relationshio);





});

router.post('/cancelRelationship', async (req, res) => {
  const { relationshipId } = req.body;
  const rel = await Relationship.findById(relationshipId);
  if (!rel) res.json({ error: 'Cannot find relationship' });
  else {
    await relationshipService.deleteRelationship(relationshipId, rel.mentor, rel.mentee);
    res.json(true);
  }
});

router.post('/removeMentorFromBlacklist', async (req, res) => {
  const { menteeId, mentorId } = req.body;

  const updated = await Mentee.findByIdAndUpdate(menteeId, { $pull: { mentorBlackList: mentorId } }, { new: true })
    .populate({ path: 'relationship', populate: { path: 'mentor' } })
    .populate({ path: 'mentorBlackList', populate: { path: 'mentor' } })
    .exec();
  res.json(updated);
});

router.post('/toggleMentorAdmin', async (req, res) => {
  const { mentorId, adminValue, campusTeamAdmin } = req.body;
  if (req.admin.admin !== 'superadmin' && (adminValue === 'superadmin' || adminValue !== req.admin.admin)) res.status(456).json({ error: 'Invalid' });

  let update = {};
  if (campusTeamAdmin) {
    update.campusTeamAdmin = adminValue;
    update.admin = null;
  } else update.admin = adminValue;

  const updated = await Mentor.findByIdAndUpdate(mentorId, update, { new: true }).populate({
    path: 'relationship',
    populate: { path: 'mentee' }
  }).exec();
  res.json(updated);

});

module.exports = router;