const express = require('express');
const router = express.Router();
const relationshipsService = require('../service/relationships');
const { Relationship } = require('./../models/relationship');
const { Mentee } = require('./../models/mentees');

router.get('/', async (req, res) => {
  const rels = await Relationship.find()
    .populate({ path: 'mentee', populate: { path: 'relationship' } })
    .populate({ path: 'mentor', populate: { path: 'relationship' } }).exec();
  res.json(rels);
});

router.post('/mentorDecision/:relationshipId', async (req, res) => {
  const { id } = req.decoded;
  const { relationshipId } = req.params;
  const { accept } = req.body;

  const rel = await Relationship.findById(relationshipId);
  if (rel.mentor.toString() !== id) res.status(401).json({error: 'Mentor in relationship is not active user'});
  if (accept) {
    await Relationship.findById(relationshipId).update({ status: 'confirmed' }).exec();
    const rel =  await Relationship.findById(relationshipId).populate({ path: 'mentee', populate: { path: 'relationship' } })
      .populate({ path: 'mentor', populate: { path: 'relationship' } }).exec();
    res.json(rel);
    //TODO Send email notification
  } else {
    await relationshipsService.deleteRelationship(relationshipId, id, rel.mentee);
    await Mentee.findByIdAndUpdate(rel.mentee, { $push: { mentorBlackList: id } }).exec();
    res.json(true)
  }
});

module.exports = router;