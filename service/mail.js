const config = require("../config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_API_KEY);
const msg = {
  to: "test@example.com",
  from: "test@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
sgMail.send(msg);


const pug = require("pug");

const loginTemplate = pug.compileFile("util/login_email.pug", {});
const confirmationTemplate = pug.compileFile("util/confirmation_email.pug", {});


const send = (message) => {
  if (config.EMAIL_ON) sgMail.send(message);
};

const sendAuthToken = (to, token) => {
  send({
    to: to,
    from: "Anna from Project Access <tech@projectaccess.org>",
    subject: "Magic sign-in link for Project Access Mentor",
    text: "Sign in link",
    html: loginTemplate({ userFirstName: "Riccardo", signInLink: `http://${config.UI_URL}/login?token=${token}` })
  });
};

const sendConfirmationToken = (to, id, token) => {
  send({
    to: to,
    from: { email: "tech@projectaccess.org", name: "Anna from Project Access" },
    subject: "Your confirmation link",
    html: confirmationTemplate({
      userFirstName: "Riccardo",
      confirmationLink: `http://${config.UI_URL}/confirm?email=${to}&id=${id}&token=${token}`
    })
  });
};

module.exports = { sendAuthToken, sendConfirmationToken };