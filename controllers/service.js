const model = require('../models/appointment');

exports.get_employee_room_available = async (req, res) => {
    let db_employee =  await model.get_employee_available({shop_id:req.query.shop_id});
    let db_room =  await model.get_room_available({shop_id:req.query.shop_id});
    res.send({
        employees:db_employee,
        rooms:db_room
    });
};

