const { Mentor } = require("../models/mentors");
const { Mentee } = require("../models/mentees");
const { Relationship } = require("../models/relationship");
const { User } = require("../models/users");
const request = require( "request");
const MentorService = require("./mentors");
const MenteeService = require("./mentees");
const AuthService = require("./auth");
const assert = require("assert");
const mongoose = require("mongoose");
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
      firstName: "Emil",
      university: "King's College London",
      subject: "PPE",
      city: "Milano",
      email: 'test1234565g43@notexistent.com',
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      email: 'test12345654g43@notexistent.com',
      firstName: "Nicole",
      subject: "International Relations",
      university: "London School of Economics",
      city: "Singapore",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      email: 'test12345ll6543@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Filip",
      subject: "Mathematics",
      university: "University of Oxford",
      city: "Milano",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      email: 'test123456543h@notexistent.com',
      gender: "Male",
      year: "2",
      area: "Business",
      firstName: "Raphael",
      subject: "Economics",
      university: "Imperial College London",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      email: 'test12653456543@notexistent.com',
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Anna",
      subject: "History",
      university: "University of Oxford",
      city: "Milano",
      status: "approved",
      emailAddress: "riccardo@broggi.co.uk",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    }, {
      level: "Masters",
      country: "Italy",
      email: 'test12345654563@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Alexander",
      subject: "PPE",
      university: "King's College London",
      city: "Milano",
      status: "approved",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    }
  ];
  dummy.forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, "mentor");
    await MentorService.registerNew(res.user._id.toString(), d);
  });
};
const loadDummyMentees = async () => {
  const dummy = [
    {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      email: 'test123456543@notexistent.com',
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Emil",
      university: "King's College London",
      subject: "PPE",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test1234565rr43@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Nicole",
      subject: "International Relations",
      university: "London School of Economics",
      city: "Singapore",
      status: "notYetRequested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test1234565rf43@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Filip",
      subject: "Mathematics",
      university: "University of Oxford",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'tesrrrt123456543@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Business",
      firstName: "Raphael",
      subject: "Economics",
      university: "Imperial College London",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      firstGenStudent: "Yes",
      gender: "Male",
      email: 'test1234ge56543@notexistent.com',
      year: "2",
      area: "Social Sciences",
      firstName: "Anna",
      subject: "History",
      university: "University of Oxford",
      city: "Milano",
      status: "approved",
      emailAddress: "riccardo@broggi.co.uk",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    }, {
      interestedIn: ["Natural Sciences", "Technology", "Humanities"],
      school: "StLouisSchool OF Milan",
      subjects: ["Biology"],
      unisApplyingFor: ["London School of Economics", "University of Oxford"],
      level: "Masters",
      country: "Italy",
      email: 'test123456gg7643@notexistent.com',
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Alexander",
      subject: "PPE",
      university: "King's College London",
      city: "Milano",
      status: "approved",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    }
  ];
  dummy.forEach(async d => {
    const res = await AuthService.register(d.email, d.firstName, "mentee");
    await MenteeService.registerNew(res.user._id.toString(), d);
  });
};
const loadAdmin = async () => {
  const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
  const userProfile = {
    _id: id,
    firstName: "Riccardo",
    type: "mentee",
    email: "riccardo@broggi.co.uk",
    emailConfirmed: false,
    onboarded: true,
    admin: 'Italy',
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
    university: "University of Oxford",
    subject: "Computer Science",
    city: "Milano",
    status: "notYetRequested",
    maxNumberOfMentees: 3,
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"
  };
  const menteeProfile = {
    _id: id,
    city: "London",
    country: "Spain",
    firstGenStudent: "No",
    firstName: "Riccardo",
    gender: "Male",
    interestedIn: ["Natural Sciences", "Technology", "Humanities"],
    level: "Undergraduate",
    school: "StLouisSchool OF Milan",
    subjects: ["Biology"],
    unisApplyingFor: ["London School of Economics", "University of Oxford"],
    year: "Gap Year",
    status: "notYetRequested",
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