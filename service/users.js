require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const mailService = require("./mail");

getUserProfile = (email) => {
    //TODO Get from DB
    return {
        user: {
            firstName: "Riccardo Luca",
            emailAddress: email,
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w",
            admin: true
        },
        mentor: {
            id: 1,
            firstName: "Emil",
            course: "Philosophy",
            university: "Oxford",
            pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
        }};
}

module.exports = {getUserProfile};