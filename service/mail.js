const email   = require("emailjs");
const config = require("../config");

const smtpServer  = email.server.connect(config.email);

const send = (options) => {
    smtpServer.send(options, (err, msg) => console.log( err || msg));
};

const sendAuthToken = (to, id, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your login link",
        text: `http://${config.UI_URL}/login?id=${id}&token=${token}` //TODO Inject ENV VAR for UI Link
    })
};

const sendConfirmationToken = (to, id, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your confirmation link",
        text: `http://${config.UI_URL}/confirm?email=${to}&id=${id}&token=${token}` //TODO Inject ENV VAR for UI Link
    })
};

module.exports = {sendAuthToken, sendConfirmationToken};