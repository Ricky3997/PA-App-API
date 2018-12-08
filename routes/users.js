const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

router.get('/profile', usersController.profile);

router.post('/edit', usersController.edit);

module.exports = router;