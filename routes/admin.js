const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin')

router.post('/changeUserStatus', adminController.changeUserStatus);

module.exports = router;