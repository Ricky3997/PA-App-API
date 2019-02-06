const { Mentor } = require("../models/mentors");
const { User } = require("../models/users");
const assert = require("assert");
const mongoose = require("mongoose");
const config = require("./../config");

let _db;

const initDb = (callback) => {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }

  mongoose.connect(config.mongodb.URI).then(async () => {
    _db = mongoose.connection;
    if (!config.PROD_MODE) {
      await clearDb();
      await loadDummyMentors();
      await loadDevUser();
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
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Emil",
      university: "KCL",
      subject: "PPE",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Nicole",
      subject: "International Relations",
      university: "LSE",
      city: "Singapore",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Filip",
      subject: "Mathematics",
      university: "Oxford",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Business",
      firstName: "Raphael",
      subject: "Economics",
      university: "UCL",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Anna",
      subject: "History",
      university: "Oxford",
      city: "Milano",
      status: "approved",
      emailAddress: "riccardo@broggi.co.uk",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Alexander",
      subject: "PPE",
      university: "KCL",
      city: "Milano",
      status: "approved",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Engineering",
      firstName: "Catriona",
      subject: "Chemical Engineering",
      university: "Brown",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Business",
      firstName: "Henning",
      subject: "Economics & Management",
      university: "Oxford",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Andreas",
      subject: "PPE",
      university: "LSE",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb247c7e79c70440c674eec/1538667470758/14383474_1341206875897109_1207170910_n.jpg?format=500w"
    },{
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Emil",
      university: "KCL",
      subject: "PPE",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Nicole",
      subject: "International Relations",
      university: "LSE",
      city: "Singapore",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Filip",
      subject: "Mathematics",
      university: "Oxford",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Business",
      firstName: "Raphael",
      subject: "Economics",
      university: "UCL",
      city: "Milano",
      status: "requested",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Social Sciences",
      firstName: "Anna",
      subject: "History",
      university: "Oxford",
      city: "Milano",
      status: "approved",
      emailAddress: "riccardo@broggi.co.uk",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Alexander",
      subject: "PPE",
      university: "KCL",
      city: "Milano",
      status: "approved",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Engineering",
      firstName: "Catriona",
      subject: "Chemical Engineering",
      university: "Brown",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "rejected",
      pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Natural Sciences",
      firstName: "Johan",
      subject: "Biology",
      university: "Oxford",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "notYetRequested"
    }, {
      level: "Masters",
      country: "",
      firstGenStudent: "Yes",
      gender: "Male",
      year: "2",
      area: "Humanities",
      firstName: "Andreas",
      subject: "Philosophy",
      university: "Harvard",
      emailAddress: "riccardo@broggi.co.uk",
      city: "Milano",
      status: "rejected"
  }
  ];
  await Mentor.insertMany(dummy);
};
const loadDevUser = async () => {
  const id = new mongoose.Types.ObjectId();
  const mentorProfile = {
    _id: id,
    level: "Masters",
    country: "",
    firstGenStudent: "Yes",
    gender: "Male",
    year: "2",
    area: "Natural Sciences",
    firstName: "Riccardo",
    university: "Bath",
    subject: "Computer Science",
    city: "Milano",
    status: "requested",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"

  };
  await new Mentor(mentorProfile).save();
  const userProfile = {
    _id: id,
    firstName: "Riccardo",
    type: "mentor",
    email: "riccardo@broggi.co.uk",
    emailConfirmed: true,
    onboarded: true,
    admin: true,
    mentorProfile: id
  };
  const user = await new User(userProfile).save();

};

const clearDb = async () => {
  await Mentor.deleteMany({});
  await User.deleteMany({});
};


module.exports = { getDb, initDb };