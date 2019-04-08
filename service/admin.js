require("dotenv").load();
const _ = require("lodash");
const request = require("request-promise-native");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");
const relationshipService = require("./relationships");
const { Relationship } = require("./../models/relationship");
const config = require("./../config");
const mongoose = require("mongoose");
const fs = require("fs")

const changeUserStatus = async (type, id, status, rejectionReason) => {
  if (type === "mentor") return await Mentor.findByIdAndUpdate(id, {
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
  const menteeProfile = await Mentee.findById(id).exec().then(p => {return p});

  let mentors = await Mentor.find().populate({ path: 'relationship', populate: { path: 'mentee' }}).exec().then(p => {return p});

  //TODO Only pick mentors of that country
  //TODO stress testing of algorithm and performance with, say, 500, 1000, 2000 and 5000 mentors.
  //including different ways of iterating, i.e. forEach, normal for-loop, and map
  //TODO make the configuration for the algo configurable for the admin teams
  //Get latest configuration
  const config = JSON.parse(fs.readFileSync("algoConfig.json"))

  //TODO Menteee.coursesApplyingFor available with an array of courses interested, chosen from the UI/src/defaults/defaults.json list

  const degreeLevelMentee = _.get(menteeProfile, "level")

  let scoredMentors = mentors.filter(mentor => {
    return mentor.status === "approved" //Only allow approved mentors to be matched
  }).filter(mentor => {
    return _.get(mentor, "relationship").length < _.get(mentor, "maxNumberOfMentees") //Only propose mentors that have capacity
  }).filter(mentor => {
    if (menteeProfile.mentorBlackList.length === 0) return true;
    else return menteeProfile.mentorBlackList.map(blackListedMentor => blackListedMentor._id.toString()).indexOf(mentor._id.toString()) === -1  // Only allow matching if mentor not blacklisted
  }).map((mentor) => {
        let score = 0
        const degreeLevelMentor = _.get(mentor, "level")
        if(degreeLevelMentee === "Undergraduate"){
          if(_.get(mentor, "level") === "Undergraduate"){
            score += config["Undergraduate"][degreeLevelMentor]["degreePoints"];
          }
          if(_.get(menteeProfile, "unisApplyingFor").includes(_.get(mentor, "university"))){
            score += config["Undergraduate"][degreeLevelMentor]["uniPoints"];
          }
          if(_.get(menteeProfile, "subjects").includes(_.get(mentor, "subject"))){
            score += config["Undergraduate"][degreeLevelMentor]["subjectPoints"];
          }
          if(_.get(menteeProfile, "country") === _.get(mentor, "country")){
            score += config["Undergraduate"][degreeLevelMentor]["countryPoints"];
          }
          if(_.get(menteeProfile, "firstGenStudent") === _.get(mentor, "firstGenStudent")){
            score += config["Undergraduate"][degreeLevelMentor]["firstGenPoints"];
          }
          if(_.get(menteeProfile, "gender") === _.get(mentor, "gender")){
            score += config["Undergraduate"][degreeLevelMentor]["genderIdentityPoints"];
          }
          if(_.get(menteeProfile, "ethnicBackground") === _.get(mentor, "ethnicBackground")){
            score += config["Undergraduate"][degreeLevelMentor]["ethnicBackgroundPoints"];
          }
          if((_.get(mentor, "yearGraduation") - _.get(menteeProfile, "yearApply")) > 2){
            score += config["Undergraduate"][degreeLevelMentor]["degreePoints"];
          }
          if(_.get(menteeProfile, "fromThreeLargestCity") === _.get(mentor, "fromThreeLargestCity")){
            score += config["Undergraduate"][degreeLevelMentor]["fromThreeLargestCity"];
          }
          const menteeHobbiesAndInterests = _.get(menteeProfile, "hobbiesAndInterests")
          const mentorHobbiesAndInterests = _.get(mentor, "hobbiesAndInterests")
          const hobbyIntersection = _.intersectin(menteeHobbiesAndInterests, mentorHobbiesAndInterests)
          if((hobbyIntersection.length / menteeHobbiesAndInterests.length) >= 0.5 ){
            score += config["Undergraduate"][degreeLevelMentor]["hobbiesAndInterests"];
          }
          mentor._doc.score = score;
          return mentor;
        }
        else if (degreeLevelMentee === "Masters"){
          if(_.get(mentor, "level") === "Masters"){
            score += config["Masters"][degreeLevelMentor]["degreePoints"];
          }
          if(_.get(menteeProfile, "unisApplyingFor").includes(_.get(mentor, "university"))){
            score += config["Masters"][degreeLevelMentor]["uniPoints"];
          }
          if(_.get(menteeProfile, "subjects").includes(_.get(mentor, "subject"))){
            score += config["Masters"][degreeLevelMentor]["subjectPoints"];
          }
          if(_.get(menteeProfile, "country") === _.get(mentor, "country")){
            score += config["Masters"][degreeLevelMentor]["countryPoints"];
          }
          if(_.get(menteeProfile, "firstGenStudent") === _.get(mentor, "firstGenStudent")){
            score += config["Masters"][degreeLevelMentor]["firstGenPoints"];
          }
          if(_.get(menteeProfile, "gender") === _.get(mentor, "gender")){
            score += config["Masters"][degreeLevelMentor]["genderIdentityPoints"];
          }
          if(_.get(menteeProfile, "ethnicBackground") === _.get(mentor, "ethnicBackground")){
            score += config["Masters"][degreeLevelMentor]["ethnicBackgroundPoints"];
          }
          if((_.get(mentor, "yearGraduation") - _.get(menteeProfile, "yearApply")) > 2){
            score += config["Masters"][degreeLevelMentor]["degreePoints"];
          }
          if(_.get(menteeProfile, "fromThreeLargestCity") === _.get(mentor, "fromThreeLargestCity")){
            score += config["Masters"][degreeLevelMentor]["fromThreeLargestCity"];
          }
          const menteeHobbiesAndInterests = _.get(menteeProfile, "hobbiesAndInterests")
          const mentorHobbiesAndInterests = _.get(mentor, "hobbiesAndInterests")
          const hobbyIntersection = _.intersectin(menteeHobbiesAndInterests, mentorHobbiesAndInterests)
          if((hobbyIntersection.length / menteeHobbiesAndInterests.length) >= 0.5 ){
            score += config["Masters"][degreeLevelMentor]["hobbiesAndInterests"];
          }
          mentor._doc.score = score;
          return mentor;
        }
        else{
          //TODO Handle postgraduate
          //err, invalid degree type
        }

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
    status: "awaitingConfirmation",
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
    path: "mentee",
    populate: { path: "relationship", populate: { path: "mentor" } }
  })
    .populate({ path: "mentor", populate: { path: "relationship", populate: { path: "mentee" } } }).exec().then(p => {
      return p;
    });
};

const createSendBirdChat = async (mentor, mentee) => {
  const body = {
    "name": `${mentor.firstName} and ${mentee.firstName}`,
    "user_ids": [mentor._id.toString(), mentee._id.toString()],
    "invitation_status[]": [`${mentor._id.toString()}:joined`, `${mentee._id.toString()}:joined`]
  };
  return request({
    method: "post",
    body: body,
    json: true,
    url: "https://api.sendbird.com/v3/group_channels",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": config.sendbird.API_TOKEN
    }
  });
};


const cancelMentoringRelationship = async (relationshipId) => {
  const rel = await Relationship.findById(relationshipId);
  if(!rel) return null;
  await relationshipService.deleteRelationship(relationshipId, rel.mentor, rel.mentee);
  return true;
};

const removeMentorFromBlacklist = async (menteeId, mentorId) => {
  return Mentee.findByIdAndUpdate(menteeId, {$pull: {mentorBlackList: mentorId}}, {new: true}).populate({ path: 'relationship', populate: { path: 'mentor' }}).populate({path: 'mentorBlackList', populate: { path: 'mentor' }}).exec().then(p => { return p});
};


module.exports = { changeUserStatus, matchingMentorRecommendations, createMatch, cancelMentoringRelationship, removeMentorFromBlacklist};
