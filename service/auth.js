require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const config = require('../config.js');

const register = async (email, firstName, type) => {
    const uniqueness = await dynamodb.get(checkUniqueDDBObj(email)).promise();
    if (_.isEmpty(uniqueness)) { //Email address is unique
        const output = await dynamodb.batchWrite(registerNewUserDDBObj(uuid.new(), email, firstName, type)).promise();
        return {result: "success"};
    } else return {result: "failure"}
};

const checkUniqueDDBObj = (email) => {
    return {TableName: 'unique-email', Key: {'email': email}};
};
const registerNewUserDDBObj = (userId, email, firstName, type) => {
    return {RequestItems: {
            'users': [{PutRequest: {Item: {
                        'id': userId, 'firstName': firstName, 'type': type, 'email': email}}}],
            'unique-email': [{PutRequest: {Item: {
                        'email': email, 'id': userId}}}]}};
};

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
const generateToken = (req, res) =>{
    let username = req.body.username || "temp";
    let password = req.body.password || "temp";

    if (username && password) {
        if (username === "temp" && password === "temp") {
            let token = jwt.sign({username: username}, config.JWT_SECRET, { expiresIn: '24h'});
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};

module.exports = {register, checkToken, generateToken};