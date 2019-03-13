require('dotenv').load();
const { Relationship } = require("./../models/relationship");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");
const _ = require("lodash");
const moment = require('moment')

getAll = async () => {
    return await Relationship.find().populate({ path: 'mentee', populate: { path: 'relationship' }})
      .populate({ path: 'mentor', populate: { path: 'relationship' }}).exec().then(p => { return p})
};

deleteRelationship = async (relationshipId, mentorId, menteeId) => {
    await Mentor.findByIdAndUpdate(mentorId, {$pull: {relationship: relationshipId}}).exec().then(p => { return p});
    await Mentee.findById(menteeId).update({relationship: null}).exec();
    await Relationship.remove({_id: relationshipId});
    console.log(`Deleted {${relationshipId}}`);
};

checkForElapsedMatches = async () => {
    const rels = await Relationship.find({matchedOn: {$lte: new moment().subtract('5', 'd').toDate()}});
    console.log(`Checking elapsed matches, found ${rels.length}`);
    await rels.forEach(async r => await deleteRelationship(r._id, r.mentor, r.mentee));
};

mentorDecision = async (relationshipId, mentorId, accept) => {
    const rel = await Relationship.findById(relationshipId);
    if(rel.mentor.toString() !== mentorId) return null;
    if(accept){
        await Relationship.findById(relationshipId).update({status: "confirmed"}).exec();
        return await Relationship.findById(relationshipId).populate({ path: 'mentee', populate: { path: 'relationship' }})
          .populate({ path: 'mentor', populate: { path: 'relationship' }}).exec().then(p => { return p})
        //TODO Send email notification
    } else{
        await deleteRelationship(relationshipId, mentorId, rel.mentee);
        return true;
        //TODO ADD TO BLACKLIST
        //TODO Hourly check for this
    }
};

module.exports = {getAll, mentorDecision, checkForElapsedMatches};