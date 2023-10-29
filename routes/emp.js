const express = require('express');

const router = express.Router();

const emp_Controller = require('../controllers/emp')
const product_controller = require('../controllers/privileges_controller/product');

router.get('/', emp_Controller.getEmp)


// ---------------  manage-product ---------------
router.get('/manage_product',product_controller.product);

router.get('/product_item',product_controller.product_item);
router.post('/product_item/:action', product_controller.set_product_item);
router.post('/product_item/cost/:action', product_controller.set_item_cost);

// --------------- validate manage-product ---------------
router.get('/manage_product/is_duplicate_name', product_controller.is_duplicate_name);
router.get('/manage_product/is_duplicate_name_id', product_controller.is_duplicate_name_id);

router.get('/product_item/is_duplicate_name_product_item', product_controller.is_duplicate_name_product_item);
router.get('/product_item/is_duplicate_name_id_product_item', product_controller.is_duplicate_name_id_product_item);


module.exports = router;
