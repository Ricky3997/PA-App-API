const express = require('express');
const router = express.Router();
const menteesController = require('../controller/mentees')

router.get('/', menteesController.getAll);

module.exports = router;