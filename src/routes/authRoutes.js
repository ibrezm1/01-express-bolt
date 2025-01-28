const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validateRequest
  ],
  authController.login
);

module.exports = router;