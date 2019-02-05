const express = require('express');
const routes = express.Router();
const mentors = require('./mentors');
const mentees = require('./mentees');
const admin = require('./admin');
const users = require('./users');
const authService = require('./../service/auth');
const relationships = require('./relationships');

routes.use('/mentors', mentors);
routes.use('/mentees', mentees);
routes.use('/relationships', relationships);
routes.use('/users', users);
routes.use('/admin', authService.checkAdmin, admin); //TODO ADD ADMIN CHECK IN MIDDLEWARE

module.exports = routes;