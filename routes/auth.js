const express = require('express');
const router = express.Router();
const authService = require('../service/auth');
const mongoose = require('mongoose');
const mailService = require('../service/mail');
const { User } = require('../models/users');
const { Mentor } = require('../models/mentors');
const { Mentee } = require('../models/mentees');
const _ = require('lodash');

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Sends an email with a login link
 *     description:
 *       "Sends the authentication token "
 *
 *     parameters:
 *      - in: query
 *        name: email
 *        description: Email address of the user to login.
 *        schema:
 *          type: String
 *          example: 'riccardo@broggi.co.uk'
 *
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: String
 *         examples:
 *           application/json: {
 *             "success": "Email with link sent",
 *           }
 *       439:
 *         description: No user with that email address found
 *
 */

router.get('/login', async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    const token = authService.createToken(email, user._id);
    mailService.sendAuthToken(user.firstName, email, token);
    res.status(200).json({ success: 'Link sent via email' });
  } else res.status(439).json({ error: 'Email address does not exist' });

});

/**
 * @swagger
 * /auth/confirm:
 *   get:
 *     summary: Confirms the email address of a user
 *     description:
 *       "Takes a confirmation code and uses it to confirm the email address of a user"
 *
 *     parameters:
 *      - in: query
 *        name: token
 *        description: Confirmation token.
 *        schema:
 *          type: String
 *          example: ''
 *      - in: query
 *        name: id
 *        description: ID of the user whose email to confirm.
 *        schema:
 *          type: String
 *          example: '"5cd438e9a9efa21cd9d7ae38"'
 *
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             "emailConfirmed":
 *                type: Boolean,
 *             "email":
 *                type: String
 *           examples:
 *             application/json: {
 *               "user": {
 *                 email: 'riccardo@broggi.co.uk',
 *                 emailConfirmed: true
 *               }
 *             }
 *       439:
 *         description: No user with that email address found
 *
 */

router.get('/confirm', async (req, res) => {
  const { id, token } = req.query;
  if (id === authService.extractIdFromToken(token)) {
    const user = await User.findById(id).exec();
    if (user) {
      if (user.type === 'mentor') {
        const mentor = await Mentor.findByIdAndUpdate( id , { emailConfirmed: true }, { new: true }); //TODO Populate relationship
        res.json(mentor);
      } else {
        const mentee = await Mentee.findByIdAndUpdate( id , { emailConfirmed: true }, { new: true }); //TODO Populate relationship
        res.json(mentee);
      }
    } else res.status(404).json({ error: 'Cannot find user with that ID' });
  } else res.status(432).json({ error: 'ID provided does not match Authentication Token' });

});


/**
 * @swagger
 * /auth/confirm:
 *   get:
 *     summary: Sends an email confirmation link
 *     description:
 *       "Takes a user id and sends that user an email confirmation link"
 *
 *     parameters:
 *      - in: query
 *        name: id
 *        description: ID of the user whose email to confirm.
 *        schema:
 *          type: String
 *          example: '"5cd438e9a9efa21cd9d7ae38"'
 *
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             "success":
 *                type: String,
 *           examples:
 *             application/json: {
 *               success: 'Email confirmation sent'
 *             }
 *       404:
 *         description: No user with that ID found
 *
 */

router.get('/sendConfirmation', async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);
  if(user){
    const token = authService.createToken(user.email, id);
    mailService.sendConfirmationToken(user.firstName, user.email, id, token);
    res.json({success: 'Email confirmation sent'});
  } else res.status(404).json({error: 'User with that id not found'});
});



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Creates a new user
 *     description:
 *       "Creates a new user and initialises their mentor/mentee profile to the bare minimum"
 *
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to register.
 *        schema:
 *          type: object
 *          required:
 *            - firstName
 *            - lastName
 *            - email
 *            - type
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            type:
 *              type: string,
 *              enum: ['mentor', 'mentee']
 *          example: {
 *            "firstName": "Riccardo",
 *            "lastName": "Broggi",
 *            "type": "mentor",
 *            "email": "riccardo@broggi.co.uk"
 *          }
 *
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: String
 *             profile:
 *               type: object
 *             token:
 *               type: String
 *         examples:
 *           application/json: {
 *             "profile": "{
 *                 _id: '4edd40c86762e0fb12000003',
 *                 emailConfirmed: false,
 *                 onboarded: false,
 *                 status: 'notYetRequested',
 *                 signedUpOn: 2019-05-09T11:51:56,
 *                 firstName: 'Riccardo',
 *                 lastName: 'Broggi'
 *             }",
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFFCJ9.eyJfaWQiOiI1YzdmZThmYTYxZjJmODBhOGFmOTY0MGMiLCJpYXQiOjE1NTI0MTA0MDksImV4cCI6MTU1NTAwMjQwOX0.25aW5YRayayAjSHGtXNl8YbWqG1lOgzw2jNe-L0fhyc"
 *           }
 *       431:
 *         description: A user with that email exists already
 *
 */

router.post('/register', async (req, res) => {
  const { email, firstName, lastName, type } = req.body;
  let id;
  try {
    id = new mongoose.Types.ObjectId();
    await new User({
      _id: id,
      type: type,
      email: email
    }).save();
  } catch (e) {
    if (e.code === 11000) {
      res.status(431).json({ 'error': 'User with that email exists already' });
      return;
    } else throw e;
  }
  let profile;
  if (type === 'mentor') profile = await new Mentor({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    signedUpOn: new Date(),
    latestStatusChange: new Date()
  }).save();
  else profile = await new Mentee({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    signedUpOn: new Date(),
    latestStatusChange: new Date()
  }).save();

  const token = authService.createToken(email, id);
  mailService.sendConfirmationToken(firstName, email, id, token);
  res.json({ profile, token });

});

module.exports = router;