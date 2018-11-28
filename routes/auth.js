const express = require('express');
const router = express.Router();
const controller = require("../controller/auth")
const service = require("../service/auth")


router.get('/login', controller.login);

router.get('/generateToken', service.generateToken);

module.exports = router;