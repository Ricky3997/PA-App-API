const express = require('express');
const router = express.Router();
const controller = require("../controller/auth");

router.get('/login', controller.login);

router.get('/confirm', controller.confirm);

router.post('/validate', controller.validate);

router.post('/register', controller.register);

module.exports = router;