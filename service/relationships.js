require('dotenv').load();
const { Relationship } = require("./../models/relationship");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");
const _ = require("lodash");

getAll = async () => {
    return await Relationship.find().populate({ path: 'mentee', populate: { path: 'relationship' }})
      .populate({ path: 'mentor', populate: { path: 'relationship' }}).exec().then(p => { return p})
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
        await Mentor.findByIdAndUpdate(mentorId, {$pull: {relationship: relationshipId}}).exec().then(p => { return p});
        await Mentee.findById(rel.mentee).update({relationship: null}).exec();
        await Relationship.remove({_id: relationshipId});
        return true;
        //TODO ADD TO BLACKLIST
        //TODO Hourly check for this
    }
};

module.exports = {getAll, mentorDecision};