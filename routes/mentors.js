const authService = require('../service/auth');
const express = require('express');
const router = express.Router();
const mentorsService = require('../service/mentors');
const { Mentor } = require('./../models/mentors');

//TODO Make proper documentation


router.post('/onboard', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentor.findByIdAndUpdate(id, {...data, onboarded: true }, {new: true}).exec();
  res.json(profile);
});

router.get('/', authService.checkAdmin, async (req, res) => {
  const result = await mentorsService.getAll(req.admin);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.get('/:id', async (req, res) => {
  const result = await mentorsService.getById(req.params.id);
  if (result) res.json(result);
  else res.sendStatus(400);
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

// await request({ TODO Wait until in a relationship to start mentoring and create messaging account
//   method: 'post',
//   body: {
//     'user_id': id,
//     'nickname': user.firstName,
//     'profile_url': ''
//   },
//   json: true,
//   url: 'https://api.sendbird.com/v3/users',
//   headers: {
//     'Content-Type': 'application/json',
//     'Api-Token': config.sendbird.API_TOKEN
//   }
// });

module.exports = router;