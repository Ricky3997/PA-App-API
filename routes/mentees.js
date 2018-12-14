const express = require('express');
const router = express.Router();
const menteesController = require('../controller/mentees')

router.get('/', menteesController.getAll);

router.post('/registerNew', menteesController.registerNew);

module.exports = router;