const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de cadastro
router.post('/signup', authController.signup);

// Rota de login
router.post('/login', authController.login);

module.exports = router;
