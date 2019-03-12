require("dotenv").load();
const _ = require("lodash");
const request = require("request-promise-native");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");
const { Relationship } = require("./../models/relationship");
const config  = require("./../config");
const mongoose = require("mongoose")

const changeUserStatus = async (type, id, status, rejectionReason) => {
  if(type === "mentor") return await Mentor.findByIdAndUpdate(id, {status, rejectionReason}, {new: true}).exec().then(p => {return p});
  else return await Mentee.findByIdAndUpdate(id, {status, rejectionReason}, {new: true}).exec().then(p => {return p});
};

const matchingMentorRecommendations = async (id) => {
  const menteeProfile = await Mentee.findById(id).exec().then(p => {return p});

  let mentors = await Mentor.find().exec().then(p => {return p});

  const mentorRecommendations = new Array(3);

  //TODO consider mentor.maxNumberOfMentees and only suggest mentors that have capacity to mentor

  mentorRecommendations[0] = _.sample(mentors);
  mentors = mentors.filter(m => m._id !== mentorRecommendations[0]._id);
  mentorRecommendations[1] = _.sample(mentors);
  mentors = mentors.filter(m => m._id !== mentorRecommendations[1]._id);
  mentorRecommendations[2] = _.sample(mentors);

  return mentorRecommendations;

};

const createMatch = async (mentorId, menteeId) => {
  const id = new mongoose.Types.ObjectId();
  await new Relationship({_id: id, mentee: menteeId, mentor: mentorId, status: "awaitingConfirmation", matchedOn: new Date()}).save();
  const mentor = await Mentor.findByIdAndUpdate(mentorId, {$push: {relationship: id}}).exec().then(p => { return p});
  const mentee = await Mentee.findByIdAndUpdate(menteeId, {relationship: id}).exec().then(p => { return p});

  const sendBirdResponse = await createSendBirdChat(mentor, mentee);

  await Relationship.findByIdAndUpdate(id, {chatUrl: sendBirdResponse.channel_url}).exec();
  return Relationship.findById(id).populate({ path: 'mentee', populate: { path: 'relationship', populate : {path: "mentor"} }})
    .populate({ path: 'mentor', populate: { path: 'relationship', populate: { path: "mentee"} }}).exec().then(p => { return p});
};

const createSendBirdChat = async (mentor, mentee) => {
  const body = {
    'name': `${mentor.firstName} and ${mentee.firstName}`,
    'user_ids': [mentor._id.toString(), mentee._id.toString()],
    'invitation_status[]': [`${mentor._id.toString()}:joined`,`${mentee._id.toString()}:joined`]
  };
  return request({
    method: 'post',
    body: body,
    json: true,
    url: "https://api.sendbird.com/v3/group_channels",
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }});
};

module.exports = { changeUserStatus, matchingMentorRecommendations, createMatch };