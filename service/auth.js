require("dotenv").load();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const mailService = require("./mail");
const userService = require("./users");
const config = require("./../config");
const { User } = require("../models/users");


const confirm = async (id, token) => {
    if (id === extractIdFromToken(token)) {
    await User.update({ _id: id }, { emailConfirmed: true });
    return await userService.getProfile(id);
  } else return { error: "ID provided does not match authentication token" };
};

const register = async (email, firstName, lastName, type) => {
  try {
    const id = new mongoose.Types.ObjectId();
    const token = createToken(email, id);
    const user = await new User({
      _id: id,
      firstName: firstName,
      lastName: lastName,
      type: type,
      email: email,
      signedUpOn: new Date(),
      emailConfirmed: false,
      onboarded: false
    }).save();
    mailService.sendConfirmationToken(firstName, email, id, token);
    return { user, id, token };
  } catch (e) {
    if(e.code === 11000) return {error: 11000}
    else return null;
  }

};

const sendConfirmation = async (id) => {
  const user = await User.findById(id);
  const token = createToken(user.email, id);
  mailService.sendConfirmationToken(user.firstName, user.email, id, token);
  return true;
};

const validateToken = (id, token) => {
  return extractIdFromToken(token) === id;
};

const extractIdFromToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET).id;
  } catch (e) {
    return null;
  }
};

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) res.sendStatus(403);
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else return res.sendStatus(409);

};

const checkAdmin = async (req, res, next) => {
  const {id} = req.decoded;
  const user = await User.findById(id);
  if (user && user.admin) {
    req.admin = user;
    next();
  }
  else return res.sendStatus(401);
};

const generateLoginToken = async (email) => {
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    const token = createToken(email, user._id);
    mailService.sendAuthToken(user.firstName, email, token);
    return { success: true };
  } else return { success: false, error: "Email address does not exist" };
};

const createToken = (email, id) => {
  return jwt.sign({ email: email, id: id }, config.JWT_SECRET, { expiresIn: "168h" });
};

module.exports = { register, confirm, checkToken, checkAdmin, createToken, generateLoginToken, validateToken, sendConfirmation };