const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middleware/auth');

const csrfProtection = csrf({ cookie: false });

router.get('/login', csrfProtection, isNotAuthenticated, authController.showLogin);
router.get('/register', csrfProtection, isNotAuthenticated, authController.showRegister);
router.post('/register', csrfProtection, authController.register);
router.post('/login', csrfProtection, authController.login);
router.post('/logout', authController.logout);

module.exports = router;
