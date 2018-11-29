const express = require('express');
const routes = express.Router();
const mentors = require('./mentors');
const users = require('./users');

routes.use('/mentors', mentors);
routes.use('/users', users);


module.exports = routes;