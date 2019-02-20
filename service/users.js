require("dotenv").load();
const _ = require("lodash");
const multiparty = require("multiparty");
const mentorService = require("./mentors");
const menteeService = require("./mentees");
const mailService = require("./mail");
const authService = require("./auth");
const { User } = require("./../models/users");

getProfile = async (id) => {
  let user = await User.findById(id);
  if (user.onboarded) {
    user = await User.findById(id)
      .populate({
        path: user.type === "mentor" ? "mentorProfile" : "menteeProfile",
        populate: {
          path: 'relationship',
          populate: {
            path: user.type === "mentor" ? 'mentee' : 'mentor' } }
      })
      .exec().then(p => {
          return p
      });
  }
  return user;
};

editProfile = async (req, res) => {
  const { id } = req.decoded;
  let user = await User.findById(id);
  new multiparty.Form().parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const fieldsToUpdate = {};
      const changedUserData = JSON.parse(fields.data);

      if (changedUserData.firstName !== user.firstName) fieldsToUpdate.firstName = changedUserData.firstName;
      if (changedUserData.email !== user.email) {
        fieldsToUpdate.email = changedUserData.email;
        fieldsToUpdate.emailConfirmed = false;
        const newToken = authService.createToken(changedUserData.email, id);
        mailService.sendConfirmationToken(changedUserData.email, id, newToken);  //TODO Return updated token and check unique
      }

      if (user.type === "mentor" && user.onboarded) await mentorService.edit(id, changedUserData, files.file);
      if (user.type === "mentee" && user.onboarded) await menteeService.edit(id, changedUserData, files.file);

      user = await User.findByIdAndUpdate(id, fieldsToUpdate, { new: true })
        .populate(user.type === "mentor" ? "mentorProfile" : "menteeProfile")
        .exec().then(p => {
          return p
        });
      res.json(user);
    } catch (error) {
      res.sendStatus(400)
      ;
    }
  });
};

module.exports = { editProfile, getProfile };