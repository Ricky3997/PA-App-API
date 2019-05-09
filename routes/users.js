const express = require('express');
const router = express.Router();
const userService = require('../service/users');
const { Mentor } = require('../models/mentors');
const { Mentee } = require('../models/mentees');
const { User } = require('../models/users');

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Gets the profile of the logged in user
 *     description:
 *       Grabs the user id from the JWT in the request header and fetches that user's profile
 *     parameters:
 *      - in: header
 *        name: id
 *        description: ID of the user decoded from the JWT in previous middleware
 *        schema:
 *          type: String
 *          example: '4edd40c86762e0fb12000003'
 *
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *         examples:
 *           application/json: {
 *              _id: '4edd40c86762e0fb12000003',
 *              emailConfirmed: false,
 *              onboarded: false,
 *              status: 'notYetRequested',
 *              signedUpOn: 2019-05-09T11:51:56,
 *              firstName: 'Riccardo',
 *              lastName: 'Broggi'
 *            }
 *
 *       439:
 *         description: No user with that email address found
 *
 */

router.get('/profile', async (req, res) => {
  const { id } = req.decoded;

  const user = await User.findById(id).exec();
  if (user) {
    if (user.type === 'mentor') {
      const profile = await Mentor.findById(id).populate({ path: 'relationship', populate: { path: 'mentee' } })
        .exec(); //Maybe .then(p => return p)
      res.json(profile);
    } else {
      const profile = await Mentee.findById(id)
        .populate({ path: 'relationship', populate: { path: 'mentor' } })
        .populate({ path: 'mentorBlackList', populate: { path: 'mentor' } }).exec();
      res.json(profile);
    }
  } else res.status(404).json({ 'error': 'User with that ID not found' });


});

router.post('/edit', async (req, res) => {
  userService.editProfile(req, res);
});

module.exports = router;