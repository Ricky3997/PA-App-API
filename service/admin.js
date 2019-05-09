require('dotenv').load();
const _ = require('lodash');
const request = require('request-promise-native');
const { Mentor } = require('./../models/mentors');
const { Mentee } = require('./../models/mentees');
const relationshipService = require('./relationships');
const { Relationship } = require('./../models/relationship');
const config = require('./../config');
const mongoose = require('mongoose');
const fs = require('fs');
const algoConfig = require('../algoConfig');

const changeUserStatus = async (type, id, status, rejectionReason) => {
  if (type === 'mentor') return await Mentor.findByIdAndUpdate(id, {
    status,
    rejectionReason
  }, { new: true }).exec().then(p => {
    return p;
  });
  else return await Mentee.findByIdAndUpdate(id, { status, rejectionReason }, { new: true }).exec().then(p => {
    return p;
  });
};

const matchingMentorRecommendations = async (id) => {
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
  return scoredMentors.map(scoredMentor => {
    scoredMentor._doc.score = scoredMentor._doc.score / highestScore * 100; //TODO For now scale highest to be 100% match and rest scaled, next look into proper fitness % score
    return scoredMentor;
  });

};

const createMatch = async (mentorId, menteeId) => {
  const id = new mongoose.Types.ObjectId();
  await new Relationship({
    _id: id,
    mentee: menteeId,
    mentor: mentorId,
    status: 'awaitingConfirmation',
    matchedOn: new Date()
  }).save();
  const mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { relationship: id } }).exec().then(p => {
    return p;
  });
  const mentee = await Mentee.findByIdAndUpdate(menteeId, { relationship: id }).exec().then(p => {
    return p;
  });

  const sendBirdResponse = await createSendBirdChat(mentor, mentee);

  await Relationship.findByIdAndUpdate(id, { chatUrl: sendBirdResponse.channel_url }).exec();
  return await Relationship.findById(id).populate({
    path: 'mentee',
    populate: { path: 'relationship', populate: { path: 'mentor' } }
  })
    .populate({ path: 'mentor', populate: { path: 'relationship', populate: { path: 'mentee' } } }).exec().then(p => {
      return p;
    });
};

const createSendBirdChat = async (mentor, mentee) => {
  const body = {
    'name': `${mentor.firstName} and ${mentee.firstName}`,
    'user_ids': [mentor._id.toString(), mentee._id.toString()],
    'invitation_status[]': [`${mentor._id.toString()}:joined`, `${mentee._id.toString()}:joined`]
  };
  return request({
    method: 'post',
    body: body,
    json: true,
    url: 'https://api.sendbird.com/v3/group_channels',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }
  });
};

const cancelMentoringRelationship = async (relationshipId) => {
  const rel = await Relationship.findById(relationshipId);
  if (!rel) return null;
  await relationshipService.deleteRelationship(relationshipId, rel.mentor, rel.mentee);
  return true;
};

const removeMentorFromBlacklist = async (menteeId, mentorId) => {
  return Mentee.findByIdAndUpdate(menteeId, { $pull: { mentorBlackList: mentorId } }, { new: true }).populate({
    path: 'relationship',
    populate: { path: 'mentor' }
  }).populate({ path: 'mentorBlackList', populate: { path: 'mentor' } }).exec().then(p => {
    return p;
  });
};

const toggleMentorAdmin = async (mentorId, adminValue, campusTeamAdmin) => {
  let update = {};
  if (campusTeamAdmin) {
    update.campusTeamAdmin = adminValue;
    update.admin = null;
  } else update.admin = adminValue;
  return Mentor.findByIdAndUpdate(mentorId, update, { new: true }).populate({
    path: 'relationship',
    populate: { path: 'mentee' }
  }).exec().then(p => {
    return p;
  });
};


module.exports = {
  toggleMentorAdmin,
  changeUserStatus,
  matchingMentorRecommendations,
  createMatch,
  cancelMentoringRelationship,
  removeMentorFromBlacklist
};
