var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Relationship = mongoose.model('Relationship', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  status: String,
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  mentee: { type: Schema.Types.ObjectId, ref: 'Mentee' },

}));

module.exports = {Relationship};