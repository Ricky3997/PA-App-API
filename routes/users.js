const multiparty = require('multiparty');
const express = require('express');
const router = express.Router();
const { Mentor } = require('../models/mentors');
const { Mentee } = require('../models/mentees');
const { User } = require('../models/users');
const fs = require('fs');
const config = require('../config.js');
const AWS = require('aws-sdk');
const fileType = require('file-type');
const ep = new AWS.Endpoint('s3.eu-west-1.amazonaws.com');
const s3 = new AWS.S3({ endpoint: ep });

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


router.post('/profilePicture', async (req, res) => {
  const { id } = req.decoded;
  const user = await User.findById(id).exec();
  if (user) {
    let profile = user.type === 'mentor' ? await Mentor.findById(id).exec() : await Mentee.findById(id).exec();
    new multiparty.Form().parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
      if (files.file) {
        const buffer = fs.readFileSync(files.file[0].path);
        const type = fileType(buffer);
        const picData = await s3.upload({
          ACL: 'public-read',
          Body: buffer,
          Bucket: config.s3.bucketName,
          ContentType: type.mime,
          Key: `${`${id}-${Date.now().toString()}`}.${type.ext}`
        }).promise();
        const picToDelete = profile.pictureUrl;
        const newPictureUrl = {pictureUrl: picData.Location};
        profile = user.type === 'mentor' ? await Mentor.findByIdAndUpdate(id, newPictureUrl, {new: true}).exec() : await Mentee.findByIdAndUpdate(id, newPictureUrl, {new: true}).exec();
        if (picToDelete) await s3.deleteObject({
          Bucket: config.s3.bucketName,
          Key: /[^/]*$/.exec(picToDelete)[0]
        }).promise();
        res.json(profile);
      }
    });
  } else res.status(404).json({ 'error': 'User with that ID not found' });
});

module.exports = router;