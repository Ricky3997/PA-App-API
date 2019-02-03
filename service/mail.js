const email   = require("emailjs");
const config = require("../config");

const smtpServer  = email.server.connect(config.email);

const send = (options) => {
    if(config.EMAIL_ON) smtpServer.send(options, (err, msg) => {
        if(err) console.log(err)
    });
};

const sendAuthToken = (to, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your login link",
        text: `http://${config.UI_URL}/login?token=${token}`
    })
};

const sendConfirmationToken = (to, id, token) => {
    send({
        to: to,
        from: "auth@projectaccess.org",
        subject: "Your confirmation link",
        text: `http://${config.UI_URL}/confirm?email=${to}&id=${id}&token=${token}`
    })
};

module.exports = {sendAuthToken, sendConfirmationToken};