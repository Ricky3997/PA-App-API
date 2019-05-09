var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
}));

module.exports = {User}