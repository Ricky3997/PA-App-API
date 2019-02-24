require("dotenv").load();
const request = require( "request");
const _ = require("lodash");
const AWS = require("aws-sdk");
const config = require("../config.js");
const fs = require("fs");
const fileType = require("file-type");
const ep = new AWS.Endpoint("s3.eu-west-1.amazonaws.com");
const s3 = new AWS.S3({ endpoint: ep });

const {Mentee} = require("./../models/mentees");
const {User} = require("./../models/users");

getAll = async () => {
  return await Mentee.find().populate("relationship").exec().then(p => {return p});
};

const edit = async (id, data, file) => {
  const picToDelete = (await Mentee.findById(id)).pictureUrl;
  if (file) {
    const buffer = fs.readFileSync(file[0].path);
    const type = fileType(buffer);
    const picData = await s3.upload({
      ACL: 'public-read',
      Body: buffer,
      Bucket: config.s3.bucketName,
      ContentType: type.mime,
      Key: `${`${id}-${Date.now().toString()}`}.${type.ext}`
    }).promise();
    if (picToDelete) await s3.deleteObject({ Bucket: config.s3.bucketName, Key: /[^/]*$/.exec(picToDelete)[0] }).promise();
    data.pictureUrl = picData.Location;
  }
  return await Mentee.findByIdAndUpdate(id, data, { new: true }).exec().then(p => { return p});
};

const registerNew = async (id, data) => {
  const user = await User.findById(id);
  await new Mentee({
    _id: id,
    unisApplyingFor: data.unisApplyingFor,
    interestedIn: data.interestedIn,
    subjects: data.subjects,
    school: data.school,
    level: data.level,
    country: data.country,
    firstGenStudent: data.firstGenStudent,
    city: data.city,
    gender: data.gender,
    year: data.year,
    status: "notYetRequested",
    firstName: user.firstName
  }).save();
  await request({
    method: 'post',
    body: {
      "user_id": id,
      "nickname": user.firstName,
      "profile_url": ""
    },
    json: true,
    url: "https://api.sendbird.com/v3/users",
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': config.sendbird.API_TOKEN
    }});
  return await User.findByIdAndUpdate(id, { onboarded: true, menteeProfile: id}, { new: true }).populate("menteeProfile").exec().then(p => { return p});

};


const changeStatus = async (id, data) => {
  try {
    await Mentee.findByIdAndUpdate(id, {status: data.status}).exec();
    return User.findById(id).populate("menteeProfile").exec().then(p => { return p});
  } catch (e) {
    return null;
  }
};

module.exports = { getAll, registerNew, edit, changeStatus };