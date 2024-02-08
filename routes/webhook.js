
const express = require('express');

const webhookController = require('../controllers/webhook')

const router = express.Router();


router.post('/omise', webhookController.omise_webhook);

module.exports = router;
