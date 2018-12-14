require('dotenv').load();
const _ = require("lodash");
const AWS = require('aws-sdk');
const config = require('../config.js');
AWS.config.update(config.dynamodb);
const ddbClient = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const ep = new AWS.Endpoint('s3.eu-west-2.amazonaws.com');
const s3 = new AWS.S3({endpoint: ep});
const mentorService = require("./mentors");
const mailService = require('./mail');
const authService = require('./auth');

getProfile = async (id) => {
    const userFromDb = await ddbClient.get({TableName: 'users', Key: {'id': id}}).promise();
    const toReturn = userFromDb.Item;
    toReturn.admin = true; //TODO
    if(userFromDb.Item.onboarded){
        if(userFromDb.Item.type === "mentor") {
            const profileType = await ddbClient.get({TableName: 'mentors', Key: {'id': id}}).promise();
            toReturn.mentorProfile = profileType.Item;
        }
        if(userFromDb.Item.type === "mentee") {
            const profileType = await ddbClient.get({TableName: 'mentee', Key: {'id': id}}).promise();
            toReturn.menteeProfile = profileType.Item;
        }
    }
    return toReturn;

};

editProfile = async (req, res) => {
    const {id} = req.decoded;


    const userFromDb = await ddbClient.get({TableName: 'users', Key: {'id': id}}).promise();
    const picToDelete = userFromDb.Item.pictureKey;

    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            let updatedUser;
            let updateExpression = "SET ";
            let updateValues = {};
            if(files.file){
                const buffer = fs.readFileSync(files.file[0].path);
                const type = fileType(buffer);
                const data = await s3.upload({
                    ACL: 'public-read',
                    Body: buffer,
                    Bucket: config.s3.bucketName,
                    ContentType: type.mime,
                    Key: `${`${id}-${Date.now().toString()}`}.${type.ext}`
                }).promise();
                if(picToDelete) await s3.deleteObject({Bucket: config.s3.bucketName, Key: picToDelete}).promise();
                updateExpression = updateExpression.concat("pictureKey = :pictureKey, pictureUrl = :pictureUrl");
                updateValues[":pictureUrl"] = data.Location;
                updateValues[":pictureKey"] = data.key;
            }
            const changedUserData = JSON.parse(fields.data);
            if(changedUserData.firstName !== userFromDb.Item.firstName){
                if(updateExpression !== "SET " && updateExpression[updateExpression.length-1] !== " " && updateExpression[updateExpression.length-2] !== ","){
                    updateExpression = updateExpression.concat(", ")
                }
                updateExpression =  updateExpression.concat("firstName = :firstName");
                updateValues[":firstName"] = changedUserData.firstName;
            }
            if(changedUserData.email !== userFromDb.Item.email){
                const existsAlready = await ddbClient.get({TableName: 'unique-email', Key: {'email': changedUserData.email}}).promise();
               if( _.isEmpty(existsAlready)){
                   if(updateExpression !== "SET " && updateExpression[updateExpression.length-1] !== " " && updateExpression[updateExpression.length-2] !== ","){
                       updateExpression = updateExpression.concat(", ")
                   }
                   updateExpression = updateExpression.concat("email = :email, emailConfirmed = :emailConfirmed");
                   updateValues[":email"] = changedUserData.email;
                   updateValues[":emailConfirmed"] = false;
                   const newToken = authService.createToken(changedUserData.email, id);
                   mailService.sendConfirmationToken(changedUserData.email, id, newToken);  //TODO Deal better and return updated token and remove existing email from tableC
               }
            }
            if(updateExpression !== "SET ") {
                const response = await ddbClient.update({
                    TableName: 'users',
                    Key: {id: id},
                    UpdateExpression: updateExpression,
                    ExpressionAttributeValues: updateValues,
                    ReturnValues: "ALL_NEW"
                }).promise();
                updatedUser = response.Attributes;
            } else updatedUser = userFromDb.Item;
            if(userFromDb.Item.type === "mentor" && userFromDb.Item.onboarded){
                const response =await mentorService.edit(id, JSON.parse(fields.data[0]));
                updatedUser.mentorProfile = response.Attributes;
            }
            if(userFromDb.Item.type === "mentor"){
                //TODO
            }
            res.json(updatedUser);
        } catch (error) {
            res.sendStatus(400)
    ;    }
    });
};

module.exports = {editProfile, getProfile};