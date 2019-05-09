const authService = require('../service/auth');
const express = require('express');
const router = express.Router();
const { Mentee } = require('../models/mentees');
const _ = require('lodash');

router.get('/', authService.checkAdmin, async (req, res) => {
  const { admin } = req.admin;
  let criteria;
  if (!admin) return [];
  else if (admin === 'superadmin') criteria = {};
  else criteria = { country: admin };
  const mentees = await Mentee.find(criteria)
    .populate({ path: 'relationship', populate: { path: 'mentor' } })
    .populate({ path: 'mentorBlackList', populate: { path: 'mentor' } }).exec();
  res.json(mentees);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const mentee = await Mentee.findById(id)
    .populate({ path: 'relationship', populate: { path: 'mentor' } })
    .populate({ path: 'mentorBlackList', populate: { path: 'mentor' } }).exec();
  res.json(mentee);

});

router.post('/edit', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentee.findByIdAndUpdate(id, { ...data }, { new: true }).exec();
  res.json(profile);
});

router.post('/onboard', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentee.findByIdAndUpdate(id, { ...data, onboarded: true }, { new: true }).exec();
  res.json(profile);
});

router.post('/changeStatus', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const profile = await Mentee.findByIdAndUpdate(id, {
    ...data,
    latestStatusChange: new Date(),
    journey: generateJourney(data)
  }, { new: true }).exec();
  res.json(profile);
});


const generateJourney = ({ unisApplyingFor }) => {
  let coreJourney = [
    {
      title: 'Subject choice',
      description: 'The choice of a subject bla bla bla',
      progress: 10,
      order: 1,
      date: 'June/July',
      completed: null,
      ready: true,
      typeformID: 'oybn'
    }, {
      title: 'Personal Statement',
      description: 'Preparing your personal statement involves bla bla',
      progress: 30,
      date: 'September',
      completed: null,
      ready: true,
      typeformID: 'MDHUre'

    }, {
      title: 'Interviews',
      description: 'Preparing your interviews bla bla',
      progress: 70,
      date: 'December',
      completed: null,
      ready: false,
      typeformID: 'ohbh'
    }, {
      title: 'Offer',
      description: 'Receiving the offer bla bla bla',
      progress: 90,
      date: 'January',
      completed: null,
      ready: false,
      typeformID: 'xxxxX'
    }, {
      title: 'Ready, start!',
      description: 'Ready to start bla bla',
      progress: 100,
      date: 'September',
      completed: null,
      ready: false,
      typeformID: 'oiuyu'
    }];

  if (_.some(['Cambridge', 'Oxford'], (vals) => _.includes(unisApplyingFor, vals))) coreJourney.push({
    title: 'Oxbridge deadline',
    description: 'The deadline for Obridge bla bla bla',
    progress: 50,
    date: '15 October',
    completed: null,
    ready: false,
    typeformID: 'xoxoox'

  });
  return coreJourney;
};

module.exports = router;