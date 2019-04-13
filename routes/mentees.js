const authService = require("../service/auth");
const express = require('express');
const router = express.Router();
const menteesController = require('../controller/mentees')

router.get('/',  authService.checkAdmin, menteesController.getAll);

router.get('/:id', menteesController.getById);

router.post('/registerNew', menteesController.registerNew);

router.post('/changeStatus', menteesController.changeStatus);

module.exports = router;