const express = require('express');
const routes = express.Router();
const mentors = require('./mentors');
const auth = require('./auth');


routes.use('/mentors', mentors);
routes.use("/auth", auth);


module.exports = routes;