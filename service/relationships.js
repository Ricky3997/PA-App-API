require('dotenv').load();
const { Relationship } = require('./../models/relationship');
const { Mentor } = require('./../models/mentors');
const { Mentee } = require('./../models/mentees');
const _ = require('lodash');
const moment = require('moment');

deleteRelationship = async (relationshipId, mentorId, menteeId) => {
  await Mentor.findByIdAndUpdate(mentorId, { $pull: { relationship: relationshipId } }).exec();
  await Mentee.findByIdAndUpdate(menteeId,{ relationship: null }).exec();
  await Relationship.deleteOne({ _id: relationshipId });
};

checkForElapsedMatches = async () => {
  const rels = await Relationship.find({ matchedOn: { $lte: new moment().subtract('5', 'd').toDate() } });
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} - Checking elapsed matches, found ${rels.length}`);
  await rels.forEach(async r => await deleteRelationship(r._id, r.mentor, r.mentee));
};


module.exports = { checkForElapsedMatches, deleteRelationship };