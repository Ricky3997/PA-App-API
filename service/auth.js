require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();

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

module.exports = {register};