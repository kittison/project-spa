const express = require('express');
const router = express.Router();


const customer_controller = require('../controllers/customer');
const make_appointment_controller = require('../controllers/customer_controller/make_appointment');
const manage_appointment_controller = require('../controllers/customer_controller/manage_appointment');
const buy_vip_controller = require('../controllers/customer_controller/buy_vip');
const manage_vip_controller = require('../controllers/customer_controller/manage_vip');
const rating_controller = require('../controllers/customer_controller/rating');

router.get('/', customer_controller.getMain);

router.get('/make_appointment', make_appointment_controller.Make_appointment);
router.get('/manage_appointment', manage_appointment_controller.Manage_appointment);
router.get('/buy_vip', buy_vip_controller.Buy_vip);
router.get('/manage_vip', manage_vip_controller.Manage_vip);
router.get('/rating', rating_controller.Rating);

module.exports = router;
