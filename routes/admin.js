const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin')

router.post('/changeUserStatus', adminController.changeUserStatus);

router.get('/matchingMentorRecommendations/:id', adminController.matchingMentorRecommendations);

router.post('/createMatch', adminController.createMatch);

router.post('/cancelRelationship', adminController.cancelRelationship);

router.post('/removeMentorFromBlacklist', adminController.removeMentorFromBlacklist);

router.post('/toggleMentorAdmin', adminController.toggleMentorAdmin);

module.exports = router;