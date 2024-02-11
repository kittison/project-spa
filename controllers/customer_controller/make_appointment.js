const model = require('../../models/service');
const model_shop = require('../../models/shop');

exports.Make_appointment = async (req, res) => {
    let data_service =  await model.get_service_and_func();
    let data_shop =  await model_shop.get_shop();
    res.render('template',{
        session_role:"customer",
        header:"Make Appointment",
        file:'customer_page/make_appointment',
        data_service: data_service,
        data_shop: data_shop,
        data_employee: [],
        data_room: [],
        datetime: null
    });
};

exports.check_can_remove_stock = async (req, res) => {
    let is_same = await model.compare_4_dec_stock(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};