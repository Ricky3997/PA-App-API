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
  status: String
}));

module.exports = {Mentor};