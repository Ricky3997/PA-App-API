var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mentee = mongoose.model('Mentee', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  type: {type: 'String', default: 'mentee'},

  emailConfirmed: {type: 'Boolean', default: false},
  onboarded: {type: 'Boolean', default: false},
  status: {type: 'String', default: 'notYetRequested'},
  signedUpOn: Date,


  unisApplyingFor: [{
    type: String
  }],
  interestedIn: [{ //mentee unis apply for
    type: String
  }],
  coursesApplyingFor: [{ // course  applying for
    type: String
  }],
  subjects: [{ // subjects study school
    type: String
  }],
  school: String, // current school
  level: String,
  country: String,
  firstGenStudent: String,
  city: String,
  gender: String,
  year: String, // year  of study in school
  pictureUrl: String,
  firstName: String,
  lastName: String,
  journey: [{
    title: String,
    description: String,
    progress: Number,
    date: String,
    completed: Date,
    ready: Boolean,
    typeformID: String
  }],
  relationship: { type: Schema.Types.ObjectId, ref: 'Relationship' },
  rejectionReason: String,
  latestStatusChange: Date,
  fromThreeLargestCity: Boolean,
  examType: String,
  ethnicBackground: String, // ethnicity
  typeOfHighSchool: String,
  careerInterests: [{
    type: String
  }],
  hobbiesAndInterests: [{
    type: String
  }],
  yearBorn: Number,
  yearApply: Number, // start uni
  referral: [{
    type: String
  }],
  notes: String,
  personalityType: String,
  mentorBlackList: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }]
}));

module.exports = {Mentee};