const model = require('../../models/service');
const model_shop = require('../../models/shop');

exports.Manage_appointment = async (req, res) => {
    let data_service =  await model.get_service_and_func();
    let data_shop =  await model_shop.get_shop();
    res.render('template',{
        session_role:"customer",
        header:"Manage Appointment",
        file:'customer_page/manage_appointment',
        data_service: data_service,
        data_shop: data_shop,
        data_employee: [],
        data_room: [],
        datetime: null
    });
};