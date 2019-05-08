const authService = require('../service/auth');
const express = require('express');
const router = express.Router();
const menteesService = require('../service/mentees');

router.get('/', authService.checkAdmin, async (req, res) => {
  const result = await menteesService.getAll(req.admin.admin);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.get('/:id', async (req, res) => {
  const result = await menteesService.getById(req.params.id);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/registerNew', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const result = await menteesService.registerNew(id, data);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/changeStatus', async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const result = await menteesService.changeStatus(id, data);
  if (result) res.json(result);
  else res.sendStatus(400);
});

module.exports = router;