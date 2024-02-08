
const model = require('../../models/appointment');
const model_shop = require('../../models/shop');
const model_service = require('../../models/service');
const model_customer = require('../../models/customer');

exports.Manage_appointment = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_appt_standard =  await model.get_appt_standard();
        let db_appt_vip =  await model.get_appt_vip();
        let db_shop =  await model_shop.get_shop();
        let db_service =  await model_service.get_service_and_func();
        let db_customer =  await model_customer.get_cust();
        let db_vip =  await model_customer.get_vip();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_shop: db_shop,
            db_appt_standard:db_appt_standard,
            db_appt_vip:db_appt_vip,
            db_service:db_service,
            db_customer:db_customer,
            db_vip:db_vip,
            datetime_appt:null,
            datetime_appt_vip:null,
            header:"Manage Appointment",
            file:'admin_page/manage_appointment'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setAppointment =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_cust(req.body).then((data)=>{return data});
            res.redirect("../manage_cust");
        }else if(req.params.action === "delete"){
            await model.delete_cust(req.body).then((data)=>{return data});
            res.redirect("../manage_cust");
        }else if(req.params.action === "update"){
            await model.update_cust(req.body).then((data)=>{return data});
            res.redirect("../manage_cust");
        }
    }else{
        res.redirect("/admin");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1
    res.send({status:status});
};
exports.check_can_update = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1
    res.send({status:status});
};

