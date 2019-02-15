require("dotenv").load();
const _ = require("lodash");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");
const { Relationship } = require("./../models/relationship");
const mongoose = require("mongoose")

const changeUserStatus = async (id, status, type) => {
  if(type === "mentor") return await Mentor.findByIdAndUpdate(id, {status: status}, {new: true}).exec().then(p => {return p});
  else return await Mentee.findByIdAndUpdate(id, {status: status}, {new: true}).exec().then(p => {return p});
};

const matchingMentorRecommendations = async (id) => {
  const menteeProfile = await Mentee.findById(id).exec().then(p => {return p});;

  const mentors = await Mentor.find().exec().then(p => {return p});

  const mentorRecommendations = new Array(3);
  mentorRecommendations[0] = _.sample(mentors);
  mentorRecommendations[1] = _.sample(mentors);
  mentorRecommendations[2] = _.sample(mentors);

  return mentorRecommendations;

};

const createMatch = async (mentorId, menteeId) => {
  const id = new mongoose.Types.ObjectId();
  await new Relationship({_id: id, mentee: menteeId, mentor: mentorId, status: "awaitingConfirmation"}).save();
  await Mentor.findByIdAndUpdate(mentorId, {relationship: id}).exec();
  await Mentee.findByIdAndUpdate(menteeId, {relationship: id}).exec();
  return Relationship.findById(id).populate("mentee").populate("mentor").exec().then(p => { return p});
};

module.exports = { changeUserStatus, matchingMentorRecommendations, createMatch };