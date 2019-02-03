var mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  _id: String,
  firstName: String,
  emailConfirmed: Boolean,
  type: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  onboarded: Boolean
}));

module.exports = {User}