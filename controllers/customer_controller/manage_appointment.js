const model = require('../../models/appointment');
const model_service = require('../../models/service');
const model_shop = require('../../models/shop');

exports.Manage_appointment = async (req, res) => {
    let data_service =  await model_service.get_service_and_func();
    let data_shop =  await model_shop.get_shop();
    let search_appt = req.query.id;
    let data_appt = [];
    if (!isNaN(req.query.id)){
        data_appt = await model.get_appt_byID({id:req.query.id})
    }
    res.render('template',{
        session_role:"customer",
        header:"Manage Appointment",
        file:'customer_page/manage_appointment',
        data_service: data_service,
        data_shop: data_shop,
        datetime: null,
        search_appt: search_appt,
        data_appt: data_appt,
    });
};

exports.setAppointment =async (req, res) => {
    if(req.params.action === "update"){
        let serv_split = req.body.Userv_data.split('_')
        let serv_time = serv_split[1];
        req.body.Userv_id = serv_split[0];
        const date = new Date(req.body.Ustart_date);
        date.setMinutes(date.getMinutes() + parseInt(serv_time));
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        req.body.Uend_date = formattedDate
        await model.update_appt(req.body).then((data)=>{return data});
        res.redirect(`../manage_appointment?id=${req.body.id_update}`);
    }else if(req.params.action === "cancel"){
        await model.cancel_appt(req.body).then((data)=>{return data});
        res.redirect("../manage_appointment");
    }else{
        res.redirect("/customer");
    }
};