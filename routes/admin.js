const express = require('express');
const router = express.Router();


const admin_controller = require('../controllers/admin');
const manage_shop_controller = require('../controllers/admin_controller/manage_shop');
const manage_emp_controller = require('../controllers/admin_controller/manage_emp');
const manage_cust_controller = require('../controllers/admin_controller/manage_cust');
const manage_prod_controller = require('../controllers/admin_controller/manage_product');
const manage_stor_controller = require('../controllers/admin_controller/manage_storage');
const manage_serv_controller = require('../controllers/admin_controller/manage_service');
const create_invoice_receipt_controller = require('../controllers/admin_controller/create_invoice_receipt');
const manage_course_controller = require('../controllers/admin_controller/manage_course');
const manage_appointment_controller = require('../controllers/admin_controller/manage_appointment');
const manage_vip_controller = require('../controllers/admin_controller/manage_vip');
const manage_sale_controller = require('../controllers/admin_controller/manage_sale');

const manage_role_controller = require('../controllers/admin_controller/manage_privileges');

const product_controller = require('../controllers/privileges_controller/product');

router.get('/', admin_controller.getAdmin);

// ---------------  manage-shop ---------------
router.get('/manage_shop', manage_shop_controller.Manage_shop);
router.post('/manage_shop/:action', manage_shop_controller.setShop);

router.get('/manage_shop_emp', manage_shop_controller.manage_shop_employee);
router.post('/manage_shop_emp/:action', manage_shop_controller.setShopEmployee);

router.get('/manage_shop/check_can_add', manage_shop_controller.check_can_add);
router.get('/manage_shop/check_can_update', manage_shop_controller.check_can_update);

router.get('/manage_shop_emp/check_can_add_emp', manage_shop_controller.check_can_add_emp);

router.get('/manage_shop_room', manage_shop_controller.manage_shop_room);
router.post('/manage_shop_room/:action', manage_shop_controller.setShopRoom);

router.get('/manage_shop_room/check_can_add', manage_shop_controller.check_can_add_room);
router.get('/manage_shop_room/check_can_update', manage_shop_controller.check_can_update_room);

// ---------------  manage-emp ---------------
router.get('/manage_emp', manage_emp_controller.Manage_emp);
router.post('/manage_emp/:action', manage_emp_controller.setEmployee);

router.get('/manage_emp/check_can_add', manage_emp_controller.check_can_add);
router.get('/manage_emp/check_can_update', manage_emp_controller.check_can_update);

router.get('/manage_emp_type', manage_emp_controller.Manage_emp_type);
router.post('/manage_emp_type/:action', manage_emp_controller.setEmployeeType);

router.get('/manage_emp_type/check_can_add', manage_emp_controller.check_can_add_type);
router.get('/manage_emp_type/check_can_update', manage_emp_controller.check_can_update_type);

router.get('/manage_job_level', manage_emp_controller.Manage_job_level);
router.post('/manage_job_level/:action', manage_emp_controller.setJobLevel);

router.get('/manage_job_level/check_can_add', manage_emp_controller.check_can_add_level);
router.get('/manage_job_level/check_can_update', manage_emp_controller.check_can_update_level);

// ---------------  manage-customer ---------------
router.get('/manage_cust', manage_cust_controller.Manage_customer);
router.post('/manage_cust/:action', manage_cust_controller.setCustomer);

router.get('/manage_cust/check_can_add', manage_cust_controller.check_can_add);
router.get('/manage_cust/check_can_update', manage_cust_controller.check_can_update);

router.get('/manage_cust_vip', manage_cust_controller.Manage_customer_vip);

// ---------------  manage-product ---------------
router.get('/manage_product_type', manage_prod_controller.Manage_product_type);
router.post('/manage_product_type/:action', manage_prod_controller.setProductType);

router.get('/manage_product_type/check_can_add', manage_prod_controller.check_can_add_type);
router.get('/manage_product_type/check_can_update', manage_prod_controller.check_can_update_type);

router.get('/manage_product', manage_prod_controller.manage_product);
router.post('/manage_product/:action', manage_prod_controller.setProduct);

router.get('/manage_product/check_can_add', manage_prod_controller.check_can_add);
router.get('/manage_product/check_can_update', manage_prod_controller.check_can_update);

// ---------------  manage-storage ---------------
router.get('/manage_storage', manage_stor_controller.Manage_storage);
router.post('/manage_storage/:action', manage_stor_controller.setStorage);

// ---------------  manage-service ---------------
router.get('/manage_service_group', manage_serv_controller.Manage_service_group);
router.post('/manage_service_group/:action', manage_serv_controller.setServiceGroup);

router.get('/manage_service_group/check_can_add', manage_serv_controller.check_can_add_service_group);
router.get('/manage_service_group/check_can_update', manage_serv_controller.check_can_update_service_group);

router.get('/manage_service_type', manage_serv_controller.Manage_service_type);
router.post('/manage_service_type/:action', manage_serv_controller.setServiceType);

router.get('/manage_service_type/check_can_add', manage_serv_controller.check_can_add_service_type);
router.get('/manage_service_type/check_can_update', manage_serv_controller.check_can_update_service_type);

router.get('/manage_service', manage_serv_controller.manage_service);
router.post('/manage_service/:action', manage_serv_controller.setService);

router.get('/manage_service/check_can_add', manage_serv_controller.check_can_add_service);
router.get('/manage_service/check_can_update', manage_serv_controller.check_can_update_service);

router.get('/manage_service_function', manage_serv_controller.manage_service_function);
router.post('/manage_service_function/:action', manage_serv_controller.setServiceFunction);

router.get('/manage_service_function/check_can_add', manage_serv_controller.check_can_add_service_function);
router.get('/manage_service_function/check_can_update', manage_serv_controller.check_can_update_service_function);
router.get('/manage_service_function/check_can_add_product', manage_serv_controller.check_can_add_service_product);

// ---------------  manage-employee-work ---------------
router.get('/manage_emp_work', manage_emp_controller.Manage_emp_work);
router.post('/manage_emp_work/:action', manage_emp_controller.setEmployeeWork);

// ---------------  manage-employee-queue ---------------
router.get('/manage_emp_queue', manage_emp_controller.Manage_emp_queue);
router.post('/manage_emp_queue/:action', manage_emp_controller.setEmployeeQueue);

// ---------------  invoice-receipt ---------------
router.get('/invoice', create_invoice_receipt_controller.Create_invoice);
router.get('/invoice_save', create_invoice_receipt_controller.Save_invoice);
router.get('/receipt', create_invoice_receipt_controller.Create_receipt);
router.get('/receipt_save', create_invoice_receipt_controller.Save_receipt);

// ---------------  manage-course ---------------
router.get('/manage_course', manage_course_controller.Manage_course);
router.post('/manage_course/:action', manage_course_controller.setCourse);

router.get('/manage_course_service', manage_course_controller.manage_course_service);
router.post('/manage_course_service/:action', manage_course_controller.setCourseService);

router.get('/manage_course/check_can_add', manage_course_controller.check_can_add);
router.get('/manage_course/check_can_update', manage_course_controller.check_can_update);

router.get('/manage_course_service/check_can_add_service', manage_course_controller.check_can_add_service);


// ---------------  manage-appointment ---------------
router.get('/manage_appointment', manage_appointment_controller.Manage_appointment);




// ---------------  manage-vip ---------------
router.get('/manage_vip', manage_vip_controller.Manage_vip);



// ---------------  manage-sale ---------------
router.get('/manage_sale', manage_sale_controller.Manage_sale);




// ---------------  manage-privileges ---------------
router.get('/manage_privileges', manage_role_controller.Manage_privileges);
router.post('/manage_privileges/update', manage_role_controller.Manage_privileges_update);



// ---------------  manage-product ---------------
router.get('/manage_product_old',product_controller.product);
router.post('/manage_product_old/:action', product_controller.set_product);

router.get('/product_item',product_controller.product_item);
router.post('/product_item/:action', product_controller.set_product_item);
router.post('/product_item/cost/:action', product_controller.set_item_cost);

// --------------- validate manage-product ---------------
router.get('/manage_product_old/is_duplicate_name', product_controller.is_duplicate_name);
router.get('/manage_product_old/is_duplicate_name_id', product_controller.is_duplicate_name_id);

router.get('/product_item/is_duplicate_name_product_item', product_controller.is_duplicate_name_product_item);
router.get('/product_item/is_duplicate_name_id_product_item', product_controller.is_duplicate_name_id_product_item);





module.exports = router;
