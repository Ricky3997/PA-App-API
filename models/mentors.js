var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mentor = mongoose.model('Mentor', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  university: String,
  subject: String,
  level: String,
  country: String,
  firstGenStudent: String,
  city: String,
  gender: String,
  year: String,
  area: String,
  pictureUrl: String,
  status: String,
  firstName: String,
  maxNumberOfMentees: Number,
  relationship: [{ type: Schema.Types.ObjectId, ref: 'Relationship' }],

  linkedinUrl: String,
  ethnicBackground: String,
  typeOfHighSchool: String,
  fromThreeLargestCity: Boolean,
  subjectsInSchool: [{
    type: String
  }],
  hobbiesAndInterests: [{
    type: String
  }],
  careerInterests: [{
    type: String
  }],
  offersFromUnis: [{
    type: String
  }],
  yearBorn: String,
  yearGraduation: String,
  referral: [{
    type: String
  }]
}));

module.exports = {Mentor};