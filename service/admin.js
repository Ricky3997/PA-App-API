require("dotenv").load();
const _ = require("lodash");
const { Mentor } = require("./../models/mentors");

changeMentorStatus = async (id, status) => {
  return await Mentor.findByIdAndUpdate(id, {status: status}, {new: true}).exec().then(p => {return p});
};

module.exports = { changeMentorStatus };