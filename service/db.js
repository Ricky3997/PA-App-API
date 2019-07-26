const { Mentor } = require('../models/mentors');
const { Mentee } = require('../models/mentees');
const { Relationship } = require('../models/relationship');
const relationshipService = require('../service/relationships');
const { User } = require('../models/users');
const scheduler = require('node-schedule');
const _ = require('lodash');


const initDb = async () => {
  let rule = new scheduler.RecurrenceRule();
  rule.minute = new scheduler.Range(0, 59, 20);
  scheduler.scheduleJob(rule, relationshipService.checkForElapsedMatches);
};


const clearDb = async () => {
  await Mentor.deleteMany({});
  await Mentee.deleteMany({});
  await User.deleteMany({});
  await Relationship.deleteMany({});
  console.log('Cleared Database');
};


module.exports = { initDb };
