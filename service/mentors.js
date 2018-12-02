require('dotenv').load();
const uuid = require('short-uuid')();
const _ = require("lodash");
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const mailService = require("./mail");

const dummy = [
    {
        id: 1,
        firstName: "Riccardo",
        lastName: "Broggi",
        university: "Bath",
        course: "Computer Science",
        from: "Milano",
        status: "toApprove",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"

    }, {
        id: 2,
        firstName: "Emil",
        lastName: "Bender Lassen",
        university: "KCL",
        course: "PPE",
        from: "Milano",
        status: "toApprove",
        pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
    }, {
        id: 3,
        firstName: "Nicole",
        lastName: "Lim",
        course: "International Relations",
        university: "LSE",
        from: "Singapore",
        status: "toMatch",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
    },{
        id: 4,
        firstName: "Filip",
        lastName: "Tokarski",
        course: "Mathematics",
        university: "Oxford",
        from: "Milano",
        status: "toMatch",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
    },{
        id: 5,
        firstName: "Raphael",
        lastName: "Eder",
        course: "Economics",
        university: "UCL",
        from: "Milano",
        status: "toMatch",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
    },
    {
        id: 6,
        firstName: "Anna",
        lastName: "Gross",
        course: "History",
        university: "Oxford",
        from: "Milano",
        status: "toMatch",
        emailAddress: "riccardo@broggi.co.uk",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
    },{
        id: 7,
        firstName: "Alexander",
        lastName: "Hutterer",
        course: "PPE",
        university: "KCL",
        from: "Milano",
        status: "toApprove",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
    },{
        id: 8,
        firstName: "Catriona",
        lastName: "Bell",
        course: "Chemical Engineering",
        university: "Brown",
        emailAddress: "riccardo@broggi.co.uk",
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
        from: "Milano",
        status: "toMatch",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
    },{
        id: 10,
        firstName: "Andreas",
        lastName: "Snekloth Kongsgaard",
        course: "PPE",
        university: "LSE",
        emailAddress: "riccardo@broggi.co.uk",
        from: "Milano",
        status: "toMatch",
        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb247c7e79c70440c674eec/1538667470758/14383474_1341206875897109_1207170910_n.jpg?format=500w"
    }
];

getAll = () => {
    /*const all = await dynamodb.query({
        TableName: "mentors",
        KeyConditionExpression: "#t = :t",
        ExpressionAttributeNames:{
            "#t": "type",
        },
        ExpressionAttributeValues: {
            ":t": "mentor"
        }
    }).promise();*/
    return dummy
};

const getById = (id) => {
    // return await dynamodb.getItem({'Table': 'mentors', 'Key': {'id': id}}).promise();
    return dummy.filter(m => m.id === parseInt(id))
}

module.exports = {getAll, getById};