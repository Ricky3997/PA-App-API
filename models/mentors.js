var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mentor = mongoose.model('Mentor', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  type: {type: 'String', default: 'mentor'},

  emailConfirmed: {type: 'Boolean', default: false},
  onboarded: {type: 'Boolean', default: false},
  status: {type: 'String', default: 'notYetRequested'},
  signedUpOn: Date,
  admin: String,
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
  firstName: String,
  lastName: String,

  maxNumberOfMentees: {type: 'Number', default: 3},
  relationship: [{ type: Schema.Types.ObjectId, ref: 'Relationship' }],
  latestStatusChange: Date,
  linkedinUrl: String,
  fromThreeLargestCity: Boolean,
  ethnicBackground: String,
  typeOfHighSchool: String,
  rejectionReason: String,
  subjectsInSchool: [{
    type: String
  }],
  offersFromUnis: [{
    type: String
  }],
  yearGraduation: Number,
  careerInterests: [{
    type: String
  }],
  hobbiesAndInterests: [{
    type: String
  }],
  yearBorn: Number,
  referral: [{
    type: String
  }],
  notes: String,

  personalityType: String
}));

module.exports = {Mentor};