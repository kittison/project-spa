const model = require('../models/appointment');

exports.get_employee_room_available = async (req, res) => {
    let param = {
        datetime:req.query.datetime,
        shop_id:req.query.shop_id
    }
    let db_employee =  await model.get_employee_available(param);
    let db_room =  await model.get_room_available(param);
    res.send({
        employees:db_employee,
        rooms:db_room
    });
};

