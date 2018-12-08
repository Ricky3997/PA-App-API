require('dotenv').load();
module.exports = {
    email: {
        user:    process.env.EMAIL_USER,
        password: process.env.EMAIL_PW,
        host:    "smtp.office365.com",
        tls: {ciphers: "SSLv3"}
    },
    dynamodb: process.env.NODE_ENV === "production"  ? {
        region: 'eu-west-2'
    } : {
        region: 'eu-west-2',
        endpoint: "http://localhost:8000"
    },
    AWS: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY
    },
    JWT_SECRET: "AWorldWherePassionAndPotential2019",
    UI_URL: process.env.UI_URL
};