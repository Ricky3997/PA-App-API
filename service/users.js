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
    if (user.type === "mentor") user = await User.findById(id).populate("mentorProfile").exec().then(p => {return p});
    // if (user.type === "mentee") user = await User.findById(id).populate("menteeProfile").exec().then(p => {return p}); TODO
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

      // if (userFromDb.Item.type === "mentee" && userFromDb.Item.onboarded) {
      //   const response = await menteeService.edit(id, JSON.parse(fields.data[0]), files.file, userFromDb);
      //   updatedUser.menteeProfile = response.Attributes;
      // }

      user = await User.findByIdAndUpdate(id, fieldsToUpdate, { new: true }).populate("mentorProfile").exec().then(p => {return p});
      res.json(user);
    } catch (error) {
      res.sendStatus(400)
      ;
    }
  });
};

module.exports = { editProfile, getProfile };