const express = require('express');
const router = express.Router();
const authService = require('../service/auth');

//TODO Make proper documentation
/**
 * @swagger
 * /users:
 *   put:
 *     summary: Creates a new user
 *     description:
 *       "Required roles: `admin`"
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: password
 *           example: {
 *             "username": "someUser",
 *             "password": "somePassword"
 *           }
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *         examples:
 *           application/json: {
 *             "id": 1,
 *             "username": "someuser"
 *           }
 *       409:
 *         description: When the username is already in use
 */

router.get('/login', async (req, res) => {
  const email = req.query.email;
  const result = await authService.generateLoginToken(email);
  if (result && result.success) res.json(result);
  else res.sendStatus(400);
});

router.get('/confirm', async (req, res) => {
  const { id, token } = req.query;
  const result = await authService.confirm(id, token);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.get('/sendConfirmation', async (req, res) => {
  const { id } = req.query;
  const result = await authService.sendConfirmation(id);
  if (result) res.json(result);
  else res.sendStatus(400);
});

router.post('/validate', (req, res) => {
  res.json({ valid: authService.validateToken(req.body.id, req.body.token) });
});

router.post('/register', async (req, res) => {
  const { email, firstName, type, lastName } = req.body;
  const result = await authService.register(email, firstName, lastName, type);
  if (result) res.json(result);
  else res.sendStatus(400);
});

module.exports = router;