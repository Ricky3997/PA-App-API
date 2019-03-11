var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mentee = mongoose.model('Mentee', new mongoose.Schema({
  _id: Schema.Types.ObjectId,

  unisApplyingFor: [{
    type: String
  }],
  interestedIn: [{
    type: String
  }],
  subjects: [{
    type: String
  }],
  school: String,
  level: String,
  country: String,
  firstGenStudent: String,
  city: String,
  gender: String,
  year: String,
  pictureUrl: String,
  status: String,
  firstName: String,
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

  latestStatusChange: Date,
  fromThreeLargestCity: Boolean,
  ethnicBackground: String,
  typeOfHighSchool: String,
  careerInterests: [{
    type: String
  }],
  hobbiesAndInterests: [{
    type: String
  }],
  yearBorn: String,
  referral: [{
    type: String
  }]
}));

module.exports = {Mentee};