const jwt = require('jsonwebtoken');
const exprjwt = require('express-jwt');

const generate = (account) => jwt.sign({ id: account.id }, "Random placeholder JWT secret");

const validate = exprjwt({
    secret: "Random placeholder JWT secret",
    credentialsRequired: false,
    getToken: (req) => {
        if (req.query) return req.query.token;
        return null;
    },
});

module.exports = { generate,validate };