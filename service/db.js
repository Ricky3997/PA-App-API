const { Mentor } = require("../models/mentors");
const { Mentee } = require("../models/mentees");
const { Relationship } = require("../models/relationship");
const relationshipService  = require("../service/relationships");
const { User } = require("../models/users");
const request = require( "request");
const MentorService = require("./mentors");
const MenteeService = require("./mentees");
const AuthService = require("./auth");
const assert = require("assert");
const mongoose = require("mongoose");
const scheduler = require("node-schedule");
const config = require("./../config");
const countries = require("svg-country-flags/countries");
const defaults = require("../defaults");
const _ = require('lodash');
const moment = require('moment');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }

  mongoose.connect(config.mongodb.URI, { useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true }).then(async () => {
    _db = mongoose.connection;

    //TODO Throw error if fail to connect

    // if (!config.PROD_MODE){
      await clearDb();
      await loadRLB();
      // [
      //   {name: 'Raphael', surname: 'Eder', email: 'raphael.eder@projectaccess.org'},
      //   {name: 'Emil', surname: 'Bender Lassen', email: 'emil.lassen@projectaccess.org'},
      //   {name: 'Anna', surname: 'Gross', email: 'anna.gross@projectaccess.org'},
      //   {name: 'Luca', surname: 'Broggi', email: 'riccardo.broggi@projectaccess.org'},
      // ].forEach(await loadAdmin);
      // await loadDummyMentors();
      // await loadDummyMentees();
    // }
    let rule = new scheduler.RecurrenceRule();
    rule.minute = new scheduler.Range(0, 59, 20);
    scheduler.scheduleJob(rule, relationshipService.checkForElapsedMatches);
    return callback(null, _db);
  }, (err) => {
    console.error(err);
  });
};

const getDb = () => {
  assert.ok(_db, "Db has not been initialized. Please called init first.");
  return _db;
};


randomUser = () => {
  return {
    level: _.sample(["Masters", "Undergraduate"]),
    country: _.sample(Object.values(defaults.countries_operating)),
    email: Math.random().toString(36).substring(2,11) + '@dummynotexist.com',
    firstGenStudent: _.sample(["Yes", "No"]),
    gender: _.sample(defaults.gender),
    year: _.sample(["1","2","3","4","5"]),
    area: _.sample(Object.keys(defaults.uni_subjects)),
    firstName: _.sample(["Filippo", "John", "Emil", "Anna", "Julian", "Kas", "Carolina", "Katie", "Nicole", "Joe", "Brandon", "Nick"]),
    lastName: _.sample(["Broggi", "Ugo", "Biscaldi", "Carretto", 'Heyste', "Juilk", "Heiny", "Buvtr", "Whynut"]),
    subject: _.sample(_.flatMap((Object.values(defaults.uni_subjects)))),
    university: _.sample(_.flatMap((Object.values(defaults.universities))).map(u => u.name)),
    city: _.sample(["Prague", "Milano", "London", "Copenhagen", "Singapore"]),
    status: _.sample(['notYetRequested', 'requested', 'rejected', 'approved']),
    pictureUrl: "https://source.unsplash.com/featured/500x500?student,person," + Math.floor(Math.random()*1000),
    interestedIn: _.sampleSize(Object.keys(defaults.uni_subjects), Math.floor(Math.random()*6)),
    school: _.sample(["Collegio San Carlo", "ISM", "CopenhagenMeinSkul", "Ecole du Ridtmajknd", "Colegio dos padres"]),
    subjects: _.sampleSize(_.flatMap(Object.values(defaults.school_subjects)), Math.floor(Math.random()*6)),
    unisApplyingFor: _.sampleSize(_.flatMap((Object.values(defaults.universities))).map(u => u.name), 4),
    coursesApplyingFor: _.sampleSize(_.flatMap((Object.values(defaults.uni_subjects))), Math.floor(Math.random()*6)),
    latestStatusChange: moment().subtract(Math.floor(Math.random()*7), 'd').toDate(),
    referral: _.sampleSize(Object.values(defaults.referrer), Math.floor(Math.random()*4)),
  }
};

const loadAdmin = async({name, surname, email}) => {
  const id = new mongoose.Types.ObjectId();
  const userProfile = {
    _id: id,
    firstName: name,
    lastName: surname,
    type: "mentor",
    email: email,
    emailConfirmed: true,
    onboarded: true,
    mentorProfile: id,
    menteeProfile: id,
  };
  await new User(userProfile).save();
  const mentorProfile = {
    _id: id,

    admin: 'superadmin',
    level: "Masters",
    country: "Italy",
    firstGenStudent: "Yes",
    gender: "Male",
    year: "2",
    area: "Natural Sciences",
    firstName: name,
    lastName: surname,
    university: "LSE",
    subject: "Economics",
    city: "Milano",
    status: "approved",

    maxNumberOfMentees: 5,
    careerInterests: ["Creative Arts and Design"],
    confirmCommittment: true,
    ethnicBackground: "Mixed / multiple ethnic groups",
    fromThreeLargestCity: false,
    hobbiesAndInterests: ["Professional Sports"],
    linkedinUrl: "https://www.linkedin.com/in/riccardobroggi/",
    offersFromUnis: ["LSE"],
    referral: ["Project Access Mentor", "Friends"],
    subjectsInSchool: ["French"],
    typeOfHighSchool: "Independent",
    yearBorn: 1991,
    yearGraduation: 2020,
    notes: 'Here are some notes'
  };
  await MentorService.registerNew(id, mentorProfile);
  await request({
    method: 'post',
    body: {
      "user_id": id,
      "nickname": userProfile.firstName,
      "profile_url": ""
    },
    json: true,
    url: "https://api.sendbird.com/v3/users",
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }});
}


const loadDummyMentors = async () => {
  [...Array(Math.floor(Math.random()*100)).keys()].map(i => randomUser()).forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, d.lastName,"mentor");
    await MentorService.registerNew(res.user._id.toString(), d);
  });
};

const loadDummyMentees = async () => {
  [...Array(Math.floor(Math.random()*100)).keys()].map(i => randomUser()).forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, d.lastName, "mentee");
    await MenteeService.registerNew(res.user._id.toString(), d);
  });
};

const loadRLB = async () => {
  const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
  const userProfile = {
    _id: id,
    firstName: "Riccardo",
    lastName: "Broggi",
    type: "mentor",
    email: "riccardo@broggi.co.uk",
    emailConfirmed: true,
    onboarded: true,
    mentorProfile: id,
    menteeProfile: id,
  };
  await new User(userProfile).save();
  const mentorProfile = {
    _id: id,

    admin: 'superadmin',
    // campusTeamAdmin: 'LSE',

    level: "Masters",
    country: "Italy",
    firstGenStudent: "Yes",
    gender: "Male",
    year: "2",
    area: "Natural Sciences",
    firstName: "Riccardo",
    lastName: "Broggi",
    university: "Oxford",
    subject: "Computer Science",
    city: "Milano",
    status: "approved",

    maxNumberOfMentees: 5,
    careerInterests: ["Creative Arts and Design"],
    confirmCommittment: true,
    ethnicBackground: "Mixed / multiple ethnic groups",
    fromThreeLargestCity: false,
    hobbiesAndInterests: ["Professional Sports"],
    linkedinUrl: "https://www.linkedin.com/in/riccardobroggi/",
    offersFromUnis: ["LSE"],
    referral: ["Project Access Mentor", "Friends"],
    subjectsInSchool: ["French"],
    typeOfHighSchool: "Independent",
    yearBorn: 1991,
    yearGraduation: 2020,
    notes: 'Here are some notes',
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"
  };
  const menteeProfile = {
    _id: id,
    city: "London",
    journey: [],
    coursesApplyingFor: ["Psychological & Behavioural Sciences"],
    country: "Spain",
    firstGenStudent: "No",
    firstName: "Jorge",
    lastName: "Joura",
    gender: "Prefer not to say",
    interestedIn: ["Natural Sciences", "Technology", "Humanities"],
    level: "Undergraduate",
    school: "StLouisSchool Of Milan",
    subjects: ["Biology"],
    unisApplyingFor: ["LSE", "Oxford"],
    year: "Gap Year",
    status: "approved",

    careerInterests: ["Creative Arts and Design"],
    ethnicBackground: "Mixed / multiple ethnic groups",
    fromThreeLargestCity: false,
    hobbiesAndInterests: ["Professional Sports"],
    referral: ["Project Access Mentor", "Friends"],
    typeOfHighSchool: "Independent",
    yearBorn: 1991,
    yearApply: 2020,
    notes: 'Here are some notes',
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"

  };
  await MentorService.registerNew(id, mentorProfile);
  // await MenteeService.registerNew(id, menteeProfile);
  await request({
    method: 'post',
    body: {
      "user_id": id,
      "nickname": userProfile.firstName,
      "profile_url": ""
    },
    json: true,
    url: "https://api.sendbird.com/v3/users",
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }});

};

const clearDb = async () => {
  await Mentor.deleteMany({});
  await Mentee.deleteMany({});
  await User.deleteMany({});
  await Relationship.deleteMany({});
};


module.exports = { getDb, initDb };
