require("dotenv").load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const multiparty = require("multiparty");
const mentorService = require("./mentors");
const menteeService = require("./mentees");
const mailService = require("./mail");
const authService = require("./auth");
const db = require("./db");

getProfile = async (id) => {
  const userFromDb = await ddbClient.get({ TableName: "users", Key: { "id": id } }).promise();
  const toReturn = userFromDb.Item;
  if (userFromDb.Item.onboarded) {
    if (userFromDb.Item.type === "mentor") {
      const profileType = await ddbClient.get({ TableName: "mentors", Key: { "id": id } }).promise();
      toReturn.mentorProfile = profileType.Item;
    }
    if (userFromDb.Item.type === "mentee") {
      const profileType = await ddbClient.get({ TableName: "mentee", Key: { "id": id } }).promise();
      toReturn.menteeProfile = profileType.Item;
    }
  }
  return toReturn;

};

editProfile = async (req, res) => {
  const { id } = req.decoded;
  const userFromDb = await ddbClient.get({ TableName: "users", Key: { "id": id } }).promise();
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      let updatedUser;
      let updateExpression = "SET ";
      let updateValues = {};
      const changedUserData = JSON.parse(fields.data);
      if (changedUserData.firstName !== userFromDb.Item.firstName) {
        if (updateExpression !== "SET " && updateExpression[updateExpression.length - 1] !== " " && updateExpression[updateExpression.length - 2] !== ",") {
          updateExpression = updateExpression.concat(", ");
        }
        updateExpression = updateExpression.concat("firstName = :firstName");
        updateValues[":firstName"] = changedUserData.firstName;
      }
      if (changedUserData.email !== userFromDb.Item.email) {
        const existsAlready = await ddbClient.get({
          TableName: "unique-email",
          Key: { "email": changedUserData.email }
        }).promise();
        if (_.isEmpty(existsAlready)) {
          if (updateExpression !== "SET " && updateExpression[updateExpression.length - 1] !== " " && updateExpression[updateExpression.length - 2] !== ",") {
            updateExpression = updateExpression.concat(", ");
          }
          updateExpression = updateExpression.concat("email = :email, emailConfirmed = :emailConfirmed");
          updateValues[":email"] = changedUserData.email;
          updateValues[":emailConfirmed"] = false;
          const newToken = authService.createToken(changedUserData.email, id);
          mailService.sendConfirmationToken(changedUserData.email, id, newToken);  //TODO Deal better and return updated token and remove existing email from tableC
        }
      }
      if (updateExpression !== "SET ") {
        const response = await ddbClient.update({
          TableName: "users",
          Key: { id: id },
          UpdateExpression: updateExpression,
          ExpressionAttributeValues: updateValues,
          ReturnValues: "ALL_NEW"
        }).promise();
        updatedUser = response.Attributes;
      } else updatedUser = userFromDb.Item;
      if (userFromDb.Item.type === "mentor" && userFromDb.Item.onboarded) {
        const response = await mentorService.edit(id, JSON.parse(fields.data[0]), files.file, userFromDb);
        updatedUser.mentorProfile = response.Attributes;
      }
      if (userFromDb.Item.type === "mentee" && userFromDb.Item.onboarded) {
        const response = await menteeService.edit(id, JSON.parse(fields.data[0]), files.file, userFromDb);
        updatedUser.menteeProfile = response.Attributes;
      }
      res.json(updatedUser);
    } catch (error) {
      res.sendStatus(400)
      ;
    }
  });
};

module.exports = { editProfile, getProfile };