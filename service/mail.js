const jwt = require('jsonwebtoken');
const email   = require("emailjs");

const smtpServer  = email.server.connect({
    user:    "auth@projectaccess.org",
    password: "WherePassion2018",
    host:    "smtp.office365.com",
    tls: {ciphers: "SSLv3"}
});

const send = (options) => {
    smtpServer.send(options, (err, msg) => console.log( err || msg));
};

const sendAuthToken = (to, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your login link",
        text: `http://localhost:3000/login?token=${token}` //TODO Inject ENV VAR for UI Link
    })
};

const sendConfirmationToken = (to, id, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your confirmation link",
        text: `http://localhost:3000/confirm?email=${to}&id=${id}&token=${token}` //TODO Inject ENV VAR for UI Link
    })
};

module.exports = {sendAuthToken, sendConfirmationToken};