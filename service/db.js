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

let _db;

const initDb = (callback) => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }

  mongoose.connect(config.mongodb.URI, { useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true }).then(async () => {
    _db = mongoose.connection;

    await clearDb();
    await loadAdmin();
    if (!config.PROD_MODE){
      await loadDummyMentors();
      await loadDummyMentees();
    }
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

const loadDummyMentors = async () => {
  const dummy = [
    {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Andrea",
      lastName: "Delton",
      university: "KCL",
      subject: "Sociology",
      city: "Milano",
      email: 'test12345g4ko3@notexistent.com',
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      email: 'test12ui345654g43@noxistent.com',
      firstName: "Rebecca",
      lastName: "Natalie",
      subject: "French",
      university: "LSE",
      city: "Singapore",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      email: 'test123ooil45ll63@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Filippo",
      lastName: "Ugo",
      subject: "Mathematics",
      university: "Oxford",
      city: "Prague",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      email: 'test1tfkl543h@notexistent.com',
      gender: "Nonbinary",
      year: "2",
      area: "Business",
      firstName: "James",
      lastName: "Hancoj",
      subject: "Physics",
      university: "Imperial",
      city: "Stockholm",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      email: 'test12653456jj99843@notexistent.com',
      gender: "Female",
      year: "2",
      area: "Social Sciences",
      firstName: "Elisa",
      lastName: "Caretto",
      subject: "Religion",
      university: "Oxford",
      city: "Milano",
      status: "approved",
    }, {
      level: "Masters",
      country: "Italy",
      email: 'test12345654lkjhg563@noexistent.cm',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "George",
      lastName: "Jode",
      subject: "Mathematics",
      university: "KCL",
      city: "Edinburgh",
      status: "approved",
    }
  ];
  dummy.forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, d.lastName,"mentor");
    await MentorService.registerNew(res.user._id.toString(), d);
  });
};
const loadDummyMentees = async () => {
  const dummy = [
    {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      email: 'te1234bm56543@noteistent.com',
      unisApplyingFor: ["Oxford"],
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Emil",
      lastName: "Bender Lassen",
      coursesApplyingFor: ["Mathematics", "Sociology"],
      university: "KCL",
      subject: "PPE",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      interestedIn: ["Computer Science", "Mathematics"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["LSE", "Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test12365rr43@notexistioent.com',
      coursesApplyingFor: ["Psychological & Behavioural Sciences"],
      firstGenStudent: "Yes",
      gender: "Female",
      year: "2",
      area: "Social Sciences",
      firstName: "Nicole",
      lastName: "Lim",
      subject: "International Relations",
      university: "LSE",
      city: "Singapore",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["LSE", "Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test1234565rf43@notexkooistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      coursesApplyingFor: ["Physics"],
      area: "Social Sciences",
      firstName: "Filip",
      lastName: "Tokarski",
      subject: "Mathematics",
      university: "Oxford",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["LSE", "Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'tesrrrt1234565ioio43@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      coursesApplyingFor: ["Psychological & Behavioural Sciences"],
      year: "2",
      area: "Business",
      firstName: "Raphael",
      lastName: "Eder",
      subject: "Economics",
      university: "Imperial",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["LSE", "Oxford"],
      level: "Masters",
      coursesApplyingFor: ["Psychological & Behavioural Sciences"],
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Female",
      email: 'test1234ge56543okli@notexistent.com',
      year: "2",
      area: "Social Sciences",
      firstName: "Anna",
      lastName: "Gross",
      subject: "History",
      university: "Oxford",
      city: "Milano",
      status: "approved",
      emailAddress: "riccardo@broggi.co.uk",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      coursesApplyingFor: ["Psychological & Behavioural Sciences"],
      subjects: ["Biology"],
      unisApplyingFor: ["LSE", "Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test12345hogrf6gg7643@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Alexander",
      lastName: "Hutterer",
      subject: "PPE",
      university: "KCL",
      city: "Milano",
      status: "approved",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    }
  ];
  dummy.forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, d.lastName, "mentee");
    await MenteeService.registerNew(res.user._id.toString(), d);
  });
};
const loadAdmin = async () => {
  const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
  const userProfile = {
    _id: id,
    firstName: "Riccardo",
    lastName: "Broggi",
    type: "mentor",
    email: "riccardo@broggi.co.uk",
    emailConfirmed: true,
    onboarded: true,
    admin: 'superadmin',
    mentorProfile: id,
    menteeProfile: id,
  };
  await new User(userProfile).save();
  const mentorProfile = {
    _id: id,
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
  await MenteeService.registerNew(id, menteeProfile);
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
