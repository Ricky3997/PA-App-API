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

editProfile = async (req, res) => {
    const {id} = req.decoded;


    const userFromDb = await ddbClient.get({TableName: 'users', Key: {'id': id}}).promise();
    const picToDelete = userFromDb.Item.pictureKey;

    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const buffer = fs.readFileSync(files.file[0].path);
            const type = fileType(buffer)
            const data = await s3.upload({
                ACL: 'public-read',
                Body: buffer,
                Bucket: config.s3.bucketName,
                ContentType: type.mime,
                Key: `${`${id}-${Date.now().toString()}`}.${type.ext}`
            }).promise();
            if(picToDelete){
                const deleted = await s3.deleteObject({Bucket: config.s3.bucketName, Key: picToDelete}).promise();
            }
            const updated = await ddbClient.update({
                TableName: 'users',
                Key: {id: id},
                UpdateExpression: "SET pictureKey = :pictureKey, pictureUrl = :pictureUrl",
                ExpressionAttributeValues: {
                    ':pictureUrl' : data.Location,
                    ':pictureKey' : data.key
                }}).promise();

            res.json({pictureUrl: data.Location});
        } catch (error) {
            res.sendStatus(400)
    ;    }
    });
};

module.exports = {editProfile, getProfile};