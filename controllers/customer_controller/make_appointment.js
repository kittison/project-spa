const model = require('../../models/appointment');
const model_serv = require('../../models/service');
const model_cust = require('../../models/customer');
const model_shop = require('../../models/shop');

exports.Make_appointment = async (req, res) => {
    let data_service =  await model_serv.get_service_and_func();
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

exports.setMakeAppointment = async (req, res) => {
    if(req.params.action === "add"){
        let serv_split = req.body.serv_data.split('_')
        let serv_time = serv_split[1];
        req.body.serv_id = serv_split[0];
        const date = new Date(req.body.start_date);
        date.setMinutes(date.getMinutes() + parseInt(serv_time));
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        req.body.end_date = formattedDate
        let search = await model_cust.search_cust(req.body);
        if (search.length == 0){
            req.body.type = "ทั่วไป";
            req.body.point = 0;
            // console.log(req.body)
            let new_cust_id = await model_cust.insert_cust(req.body);
            req.body.cust_id = new_cust_id
            let appt_id = await model.insert_appt(req.body).then((data)=>{return data});
            res.redirect(`../manage_appointment?id=${appt_id}`);
        }
        else{
            req.body.cust_id = search[0].id
            let appt_id = await model.insert_appt(req.body).then((data)=>{return data});
            res.redirect(`../manage_appointment?id=${appt_id}`);
        }
    }
};