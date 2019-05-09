const config = require('../config');
const sgMail = require('@sendgrid/mail');
if (config.EMAIL_ON) sgMail.setApiKey(config.SENDGRID_API_KEY);

const pug = require('pug');
const loginTemplate = pug.compileFile('assets/login_email.pug', {});
const confirmationTemplate = pug.compileFile('assets/confirmation_email.pug', {});

const send = (message) => {
  if (config.EMAIL_ON) sgMail.send(message);
};

const sendAuthToken = (firstName, email, token) => {
  send({
    to: email,
    from: { email: 'tech@projectaccess.org', name: 'Anna from Project Access' },
    subject: 'Magic sign-in link for Project Access Mentor',
    text: 'Sign in link',
    html: loginTemplate({ userFirstName: firstName, signInLink: `http://${config.UI_URL}/login?token=${token}` })
  });
};

const sendConfirmationToken = (firstName, email, id, token) => {
  send({
    to: email,
    from: { email: 'tech@projectaccess.org', name: 'Anna from Project Access' },
    subject: 'Your confirmation link',
    html: confirmationTemplate({
      userFirstName: firstName,
      confirmationLink: `http://${config.UI_URL}/confirm?id=${id}&token=${token}`
    })
  });
};

module.exports = { sendAuthToken, sendConfirmationToken };