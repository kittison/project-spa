// const model = require('../../models/customer');

exports.Rating = async (req, res) => {
    res.render('template',{
        session_role:"customer",
        header:"Rating",
        file:'customer_page/rating'
    });
};