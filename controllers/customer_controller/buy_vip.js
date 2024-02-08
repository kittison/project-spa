const model = require('../../models/course');

exports.Buy_vip = async (req, res) => {
    let data_course =  await model.get_course();
    res.render('template',{
        session_role:"customer",
        header:"Buy Vip",
        file:'customer_page/buy_vip',
        data_course: data_course
    });
};