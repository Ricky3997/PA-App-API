require('dotenv').load();
module.exports = {
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PW,
    host: "smtp.office365.com",
    tls: { ciphers: "SSLv3" }
  },
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  mongodb: process.env.NODE_ENV === "production" ? {
    URI: process.env.MONGODB_URI
  } : {
    URI: 'mongodb://localhost/mentor-mongodb'
  },
  s3: {
    bucketName: "mentor-app-assets"
  },
  AWS: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
  },
  sendbird: {
    API_ID: process.env.SENDBIRD_ID,
    API_TOKEN:process.env.SENDBIRD_TOKEN,
  },
  JWT_SECRET: "AWorldWherePassionAndPotential2019",
  UI_URL: process.env.UI_URL,
  PROD_MODE: process.env.NODE_ENV === "production",
  EMAIL_ON: true
};