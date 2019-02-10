require("dotenv").load();
const _ = require("lodash");
const { Mentor } = require("./../models/mentors");
const { Mentee } = require("./../models/mentees");

const changeUserStatus = async (id, status, type) => {
  if(type === "mentor") return await Mentor.findByIdAndUpdate(id, {status: status}, {new: true}).exec().then(p => {return p});
  else return await Mentee.findByIdAndUpdate(id, {status: status}, {new: true}).exec().then(p => {return p});
};

module.exports = { changeUserStatus };