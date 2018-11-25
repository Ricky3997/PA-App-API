const express = require('express');
const routes = express.Router();
const mentors = require('./mentors')


routes.use('/mentors', mentors);


module.exports = routes;