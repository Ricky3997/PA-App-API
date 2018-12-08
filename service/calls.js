require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
const config = require('../config.js');
AWS.config.update(config.dynamodb);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const mailService = require("./mail");



module.exports = {};