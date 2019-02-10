require("dotenv").load();
const { Mentor } = require("./../models/mentors");
const { User } = require("./../models/users");
const config = require("../config.js");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const ep = new AWS.Endpoint("s3.eu-west-1.amazonaws.com");
const s3 = new AWS.S3({ endpoint: ep });

getAll = async () => {
  return await Mentor.find();
};

const getById = async (id) => {
  return await Mentor.findById(id);
};

const registerNew = async (id, data) => {
  const user = await User.findById(id);
  await new Mentor({
    _id: id,
    university: data.university,
    subject: data.subject,
    level: data.level,
    country: data.country,
    firstGenStudent: data.firstGenStudent,
    city: data.city,
    gender: data.gender,
    year: data.year,
    area: data.area,
    status: "notYetRequested",
    firstName: user.firstName
  }).save();
  return await User.findByIdAndUpdate(id, { onboarded: true, mentorProfile: id}, { new: true }).populate("mentorProfile").exec().then(p => { return p});
};

const edit = async (id, data, file) => {
  const picToDelete = (await Mentor.findById(id)).pictureUrl;
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
  return await Mentor.findByIdAndUpdate(id, data, { new: true }).exec().then(p => { return p});
};

const changeStatus = async (id, data) => {
  try {
    await Mentor.findByIdAndUpdate(id, {status: data.status}).exec();
    return User.findById(id).populate("mentorProfile").exec().then(p => { return p});
  } catch (e) {
    return null;
  }
};

module.exports = { getAll, getById, registerNew, edit, changeStatus };
