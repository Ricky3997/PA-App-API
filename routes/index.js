const express = require('express');
const routes = express.Router();
const mentors = require('./mentors');
const mentees = require('./mentees');
const users = require('./users');
const relationships = require('./relationships');

//TODO Filter routes based on admin

routes.use('/mentors', mentors);
routes.use('/mentees', mentees);
routes.use('/relationships', relationships);
routes.use('/users', users);


module.exports = routes;