
const express = require('express');

const serviceController = require('../controllers/service')

const router = express.Router();

router.get('/get_employee_room_available',serviceController.get_employee_room_available);

module.exports = router;
