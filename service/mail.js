const email   = require("emailjs");
const config = require("../config");
const pug = require('pug');

const loginTemplate = pug.compileFile('util/login_email.pug', {});

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
        subject: "Magic sign-in link for Project Access Mentor",
        text: 'Text of the email',
        attachment: [
            {
                data: loginTemplate({
                    userFirstName: 'Riccardo',
                    signInLink: `http://${config.UI_URL}/login?token=${token}`
                }),
                alternative: true
            },
        ],
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