const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin')

router.post('/changeUserStatus', adminController.changeUserStatus);

router.get('/matchingMentorRecommendations/:id', adminController.matchingMentorRecommendations);

router.post('/createMatch', adminController.createMatch);

module.exports = router;