require('dotenv').load();
const _ = require("lodash");
const AWS = require('aws-sdk');
const config = require('../config.js');
AWS.config.update(config.dynamodb);
const ddbClient = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB();
const fs = require("fs");
const fileType = require("file-type");
const ep = new AWS.Endpoint("s3.eu-west-2.amazonaws.com");
const s3 = new AWS.S3({ endpoint: ep });
AWS.config.update(config.dynamodb);



ddb.describeTable({ TableName: "mentees" }, (err, data) => {
  if (err) ddb.createTable({
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: "mentees",
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S"
      }
    ]
  }, (err, data) => {
    if (err) console.error(err);
  });
});

getAll = () => {
    //TODO Get from DB
    return [
        {
            id: 1,
            firstName: "Riccardo",
            lastName: "Broggi",
            university: "Bath",
            course: "Computer Science",
            school: "Liceo Scientifico Einstein",
            from: "Milano",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            status: "toApprove",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"

        }, {
            id: 2,
            firstName: "Emil",
            lastName: "Bender Lassen",
            university: "KCL",
            course: "PPE",
            from: "Milano",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            status: "toApprove",
            pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
        }, {
            id: 3,
            firstName: "Nicole",
            lastName: "Lim",
            course: "International Relations",
            university: "LSE",
            from: "Singapore",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            status: "toMatch",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
        },{
            id: 4,
            firstName: "Filip",
            lastName: "Tokarski",
            course: "Mathematics",
            university: "Oxford",
            from: "Milano",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            status: "toMatch",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
        },{
            id: 5,
            firstName: "Raphael",
            lastName: "Eder",
            course: "Economics",
            university: "UCL",
            from: "Milano",
            school: "Liceo Scientifico Einstein",
            status: "toMatch",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
        },
        {
            id: 6,
            firstName: "Anna",
            lastName: "Gross",
            course: "History",
            university: "Oxford",
            from: "Milano",
            school: "Liceo Scientifico Einstein",
            status: "toMatch",
            emailAddress: "riccardo@broggi.co.uk",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
        },{
            id: 7,
            firstName: "Alexander",
            lastName: "Hutterer",
            course: "PPE",
            university: "KCL",
            from: "Milano",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            status: "toApprove",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
        },{
            id: 8,
            firstName: "Catriona",
            lastName: "Bell",
            course: "Chemical Engineering",
            university: "Brown",
            emailAddress: "riccardo@broggi.co.uk",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            from: "Milano",
            status: "toMatch",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
        },{
            id: 9,
            firstName: "Henning",
            lastName: "Zschietzschmann",
            course: "Economics & Management",
            university: "Oxford",
            emailAddress: "riccardo@broggi.co.uk",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            from: "Milano",
            status: "toMatch",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
        },{
            id: 10,
            firstName: "Andreas",
            lastName: "Snekloth Kongsgaard",
            course: "PPE",
            university: "LSE",
            school: "Liceo Scientifico Einstein",
            subjectsInSchool: ["Italian", "Spanish", "Maths", "Physics", "Philosophy", "Biology", "Economics"],
            emailAddress: "riccardo@broggi.co.uk",
            from: "Milano",
            status: "toMatch",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb247c7e79c70440c674eec/1538667470758/14383474_1341206875897109_1207170910_n.jpg?format=500w"
        }
    ];
};


const edit = async (id, data, file, userFromDb) => {


  let updateExpression = "SET ";
  let updateValues = {};


  const picToDelete = userFromDb.Item.pictureKey;

  if(file){
    const buffer = fs.readFileSync(file[0].path);
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

  if(updateExpression !== "SET " && updateExpression[updateExpression.length-1] !== " " && updateExpression[updateExpression.length-2] !== ","){
    updateExpression = updateExpression.concat(", ")
  }

  updateExpression = updateExpression.concat("unisApplyingFor = :unisApplyingFor, school = :school, subjects = :subjects, #l = :level, country = :country, " +
    "firstGenStudent = :firstGenStudent, city = :city, gender = :gender, #y = :year, interestedIn = :interestedIn");
  updateValues[":unisApplyingFor"] = data.unisApplyingFor;
  updateValues[":school"] = data.school;
  updateValues[":subjects"] = data.subjects;
  updateValues[":level"] = data.level;
  updateValues[":firstGenStudent"] = data.firstGenStudent;
  updateValues[":city"] = data.city;
  updateValues[":gender"] = data.gender;
  updateValues[":year"] = data.year;
  updateValues[":interestedIn"] = data.interestedIn;
  updateValues[":country"] = data.country;

  return await ddbClient.update({
    TableName: "mentees",
    Key: { id: id },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: {
      "#l": "level",
      "#y": "year"
    },
    ExpressionAttributeValues: updateValues,
    ReturnValues: "ALL_NEW"
  }).promise();
};

const registerNew = async (id, data) => {
  try {
    const menteeProfile = {
      id: id,
      unisApplyingFor: data.unisApplyingFor,
      interestedIn: data.interestedIn,
      subjects: data.subjects,
      school: data.school,
      level: data.level,
      country: data.country,
      firstGenStudent: data.firstGenStudent,
      city: data.city,
      gender: data.gender,
      year: data.year
    };
    await ddbClient.put({
      TableName: "mentees",
      Item: menteeProfile,
      ReturnValues: "ALL_OLD"
    }).promise();

    const onboardedUser = (await ddbClient.update({
      TableName: "users",
      Key: { id: id },
      UpdateExpression: "SET onboarded = :onboarded",
      ExpressionAttributeValues: {
        ":onboarded": true
      },
      ReturnValues: "ALL_NEW"
    }).promise()).Attributes;
    onboardedUser.menteeProfile = menteeProfile;
    return onboardedUser;
  } catch (e) {
    return null;
  }
};

module.exports = {getAll, registerNew, edit};