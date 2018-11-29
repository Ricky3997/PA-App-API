require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const mailService = require("./mail");

const register = async (email, firstName, type) => {
    const uniqueness = await dynamodb.get(getEmailFromUniqueness(email)).promise();
    if (_.isEmpty(uniqueness)) { //Email address is unique
        await dynamodb.batchWrite(registerNewUserDDBObj(uuid.new(), email, firstName, type)).promise();
        return {result: "success"};
    } else return {result: "failure"}
};

const getEmailFromUniqueness = (email) => {
    return {TableName: 'unique-email', Key: {'email': email}};
};
const registerNewUserDDBObj = (userId, email, firstName, type) => {
    return {RequestItems: {
            'users': [{PutRequest: {Item: {
                        'id': userId, 'firstName': firstName, 'type': type, 'email': email}}}],
            'unique-email': [{PutRequest: {Item: {
                        'email': email, 'id': userId}}}]}};
};

const validateToken = (email, token) => {
    return extractEmailFromToken(token) === email;
};

const extractEmailFromToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET).email
};

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) res.json({success: false, message: 'Token is not valid'});
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else return res.json({success: false, message: 'Auth token is not supplied'});

};
const generateToken = async (email) =>{
    const uniqueness = await dynamodb.get(getEmailFromUniqueness(email)).promise();
    if(!_.isEmpty(uniqueness)){
        const token = jwt.sign({email: email}, config.JWT_SECRET, { expiresIn: '24h'});
        mailService.sendAuthToken(email, token);
        return {success: true}
    } else return {success: false, error: "Email address does not exist"}
};

module.exports = {register, checkToken, generateToken, validateToken, extractEmailFromToken};