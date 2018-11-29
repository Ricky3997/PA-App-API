require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const mailService = require("./mail");

const confirm = async (email, id, token) => {
    const idFromJWT = extractIdFromToken(token);
    if(id === idFromJWT){
        await dynamodb.update({
            TableName: 'users',
            Key: {id: id},
            UpdateExpression: "SET emailConfirmed = :confirmed, lastLogin = :lastLogin",
            ExpressionAttributeValues: {
                ':lastLogin' : new Date().toDateString(),
                ':emailConfirmed' : true
            }}).promise();
        return {success: true}
    } else return {};
};

const register = async (email, firstName, type) => {
    const uniqueness = await dynamodb.get(getEmailFromUniqueness(email)).promise();
    if (_.isEmpty(uniqueness)) { //Email address is unique
        const id = uuid.new();
        const token = createToken(email, id);
        mailService.sendConfirmationToken(email, id, token);
        await dynamodb.batchWrite(registerNewUserDDBObj(id, email, firstName, type)).promise();
        return {result: "success"};
    } else return {result: "failure"}
};

const getEmailFromUniqueness = (email) => {
    return {TableName: 'unique-email', Key: {'email': email}};
};
const registerNewUserDDBObj = (userId, email, firstName, type) => {
    return {RequestItems: {
            'users': [{PutRequest: {Item: {
                        'id': userId, 'firstName': firstName, 'type': type, 'email': email, emailConfirmed: false}}}],
            'unique-email': [{PutRequest: {Item: {
                        'email': email, 'id': userId}}}]}};
};

const validateToken = (id, token) => {
    const valid = extractIdFromToken(token) === id;
    //dynamodb.put({TableName: 'users', Item: {'id': id, lastLogin: new Date().toDateString()}});
    return valid;
};

const extractIdFromToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET).id
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
const generateLoginToken = async (email) =>{
    const user = await dynamodb.get(getEmailFromUniqueness(email)).promise();
    if(!_.isEmpty(user)){
        const token = createToken(email, user.Item.id);
        mailService.sendAuthToken(email, token);
        return {success: true}
    } else return {success: false, error: "Email address does not exist"}
};

const createToken = (email, id) => {
    return jwt.sign({email: email, id: id}, config.JWT_SECRET, { expiresIn: '24h'});
}

module.exports = {register, confirm, checkToken, generateLoginToken, validateToken};