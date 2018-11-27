const express = require('express');
const router = express.Router();
const controller = require("../controller/auth")


router.get('/login', controller.login);

router.get('/logout', controller.logout);

router.get('/validate', controller.validate);

module.exports = router;