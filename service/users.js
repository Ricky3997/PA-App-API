require('dotenv').load();
const _ = require("lodash");
const AWS = require('aws-sdk');
const config = require('../config.js');
AWS.config.update(config.dynamodb);
const ddbClient = new AWS.DynamoDB.DocumentClient();

getProfile = async (id) => {
    const userFromDb = await ddbClient.get({TableName: 'users', Key: {'id': id}}).promise();
    const toReturn = {
        user: {
            firstName: userFromDb.Item.firstName,
            email: userFromDb.Item.email,
            type: userFromDb.Item.type,
            pictureUrl: userFromDb.Item.pictureUrl,
            admin: true
        }
    };
    return toReturn;

};

module.exports = {getProfile};