
const express = require('express');

const loginController = require('../controllers/login')

const router = express.Router();


router.get('/', loginController.getLogin);
router.get('/logout', loginController.logout);
router.post('/vertify_login', loginController.vertify_login);
router.post('/vertify_ensure_password', loginController.vertify_ensure_password);

module.exports = router;
