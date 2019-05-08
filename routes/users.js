const express = require('express');
const router = express.Router();
const userService = require('../service/users');

router.get('/profile', async (req, res) => {
  const { id } = req.decoded;
  const result = await userService.getProfile(id);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/edit', async (req, res) => {
  userService.editProfile(req, res);
});

module.exports = router;