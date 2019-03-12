const express = require('express');
const router = express.Router();
const relationshipsController = require('../controller/relationships')

router.get('/', relationshipsController.getAll);

router.post('/mentorDecision/:relationshipId', relationshipsController.mentorDecision);

module.exports = router;