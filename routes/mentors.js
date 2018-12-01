const express = require('express');
const router = express.Router();
const mentorsController = require("../controller/mentors");


router.get('/', mentorsController.getAll);

router.get('/:id', mentorsController.getById);

module.exports = router;