const model_shop = require('../../models/shop');

exports.Manage_vip = async (req, res) => {
    let data_shop =  await model_shop.get_shop();
    res.render('template',{
        session_role:"customer",
        header:"Manage Vip",
        file:'customer_page/manage_vip',
        data_shop: data_shop,
        data_service: [],
        data_employee: [],
        data_room: [],
        datetime: null
    });
};