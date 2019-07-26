const authService = require('../service/auth');
const express = require('express');
const router = express.Router();
const { Mentor } = require('./../models/mentors');

//TODO Make proper documentation

router.post('/onboard', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentor.findByIdAndUpdate(id, {...data, onboarded: true }, {new: true}).exec();
  res.json(profile);
});

router.get('/', authService.checkAdmin, async (req, res) => {
  const { admin } = req.admin;
  let criteria;
  if (!admin) return [];
  else if (admin === 'superadmin') criteria = {};
  else criteria = { country: admin.admin };
  const mentors = await Mentor.find(criteria).populate({ path: 'relationship', populate: { path: 'mentee' } }).exec();
  res.json(mentors);
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const mentor = await Mentor.findById(id).populate({ path: 'relationship', populate: { path: 'mentee' } }).exec();
  res.json(mentor);
});

router.post('/changeStatus', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentor.findByIdAndUpdate(id, { ...data, latestStatusChange: new Date() }, {new: true}).exec();
  res.json(profile);
});

router.post('/edit', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentor.findByIdAndUpdate(id, { ...data }, {new: true}).exec();
  res.json(profile);
});

module.exports = router;