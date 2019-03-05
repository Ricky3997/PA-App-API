const authService = require("../service/auth");
const express = require('express');
const router = express.Router();
const mentorsController = require("../controller/mentors");

router.get('/', authService.checkAdmin, mentorsController.getAll);

router.get('/:id', mentorsController.getById);

router.post('/registerNew', mentorsController.registerNew);

router.post('/changeStatus', mentorsController.changeStatus);

module.exports = router;