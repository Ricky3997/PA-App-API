require('dotenv').load();
module.exports = {
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PW,
    host: "smtp.office365.com",
    tls: { ciphers: "SSLv3" }
  },

  mongodb: process.env.NODE_ENV === "production" ? {
    URI: 'mongodb://mentordatabase:ccc@mentor-mongodb-cluster.cluster-can55q6gsba8.eu-west-1.docdb.amazonaws.com:27017/?ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0'
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
  JWT_SECRET: "AWorldWherePassionAndPotential2019",
  UI_URL: process.env.UI_URL,
  PROD_MODE: process.env.NODE_ENV === "production"
};