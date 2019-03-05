var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  emailConfirmed: Boolean,
  type: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  admin: String,
  onboarded: Boolean,
  status: String,
  mentorProfile: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  menteeProfile: { type: Schema.Types.ObjectId, ref: 'Mentee' },
}));

module.exports = {User}