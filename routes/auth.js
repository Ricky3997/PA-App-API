const express = require('express');
const router = express.Router();
const controller = require("../controller/auth");

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

router.get('/login', controller.login);

router.get('/confirm', controller.confirm);

router.get('/sendConfirmation', controller.sendConfirmation);

router.post('/validate', controller.validate);

router.post('/register', controller.register);

module.exports = router;