require("dotenv").load();
const { Mentor } = require("./../models/mentors");
const { User } = require("./../models/users");
const config = require("../config.js");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const ep = new AWS.Endpoint("s3.eu-west-2.amazonaws.com");
const s3 = new AWS.S3({ endpoint: ep });

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
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
  }, {
    id: 3,
    firstName: "Nicole",
    lastName: "Lim",
    course: "International Relations",
    university: "LSE",
    from: "Singapore",
    status: "toMatch",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
  }, {
    id: 4,
    firstName: "Filip",
    lastName: "Tokarski",
    course: "Mathematics",
    university: "Oxford",
    from: "Milano",
    status: "toMatch",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
  }, {
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
  }, {
    id: 7,
    firstName: "Alexander",
    lastName: "Hutterer",
    course: "PPE",
    university: "KCL",
    from: "Milano",
    status: "toApprove",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
  }, {
    id: 8,
    firstName: "Catriona",
    lastName: "Bell",
    course: "Chemical Engineering",
    university: "Brown",
    emailAddress: "riccardo@broggi.co.uk",
    from: "Milano",
    status: "toMatch",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
  }, {
    id: 9,
    firstName: "Henning",
    lastName: "Zschietzschmann",
    course: "Economics & Management",
    university: "Oxford",
    emailAddress: "riccardo@broggi.co.uk",
    from: "Milano",
    status: "toMatch",
    pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
  }, {
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
  const picToDelete = (await User.findById(id)).pictureUrl;
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
