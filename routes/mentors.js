const authService = require('../service/auth');
const express = require('express');
const router = express.Router();
const mentorsService = require('../service/mentors');


//TODO Make proper documentation

router.get('/', authService.checkAdmin, async (req, res) => {
  const result = await mentorsService.getAll(req.admin);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.get('/:id', async (req, res) => {
  const result = await mentorsService.getById(req.params.id);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/registerNew', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const result = await mentorsService.registerNew(id, data);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/changeStatus', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const result = await mentorsService.changeStatus(id, data);
  if (result) res.json(result);
  else res.sendStatus(400);
});

module.exports = router;