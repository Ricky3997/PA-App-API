require('dotenv').load();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mailService = require('./mail');
const userService = require('./users');
const config = require('./../config');
const { User } = require('../models/users');
const { Mentor } = require('../models/mentors');
const _ = require('lodash');


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
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);
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
  const { id } = req.decoded;
  const user = await Mentor.findById(id);
  if (_.get(user, 'admin') || _.get(user, 'campusTeamAdmin')) {
    req.admin = user;
    next();
  } else return res.sendStatus(401);
};

const createToken = (email, id) => {
  return jwt.sign({ email: email, id: id }, config.JWT_SECRET, { expiresIn: '168h' });
};

module.exports = {
  extractIdFromToken,
  checkToken,
  checkAdmin,
  createToken,
  validateToken,
  sendConfirmation
};