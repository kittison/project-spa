
const model = require('../../models/vip');
const model_course = require('../../models/course');
const model_cust = require('../../models/customer');
const model_sale = require('../../models/sale');
const model_appt = require('../../models/appointment');

exports.Manage_vip = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_vip =  await model.get_vip();
        let db_course =  await model_course.get_course();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_vip:db_vip,
            db_course:db_course,
            header:"Manage Vip",
            file:'admin_page/manage_vip'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setVip =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_vip(req.body).then((data)=>{return data});
            res.redirect("../manage_vip");
        }else if(req.params.action === "delete"){
            await model.delete_vip(req.body).then((data)=>{return data});
            res.redirect("../manage_vip");
        }else if(req.params.action === "update"){
            await model.update_vip(req.body).then((data)=>{return data});
            res.redirect("../manage_vip");
        }
    }else{
        res.redirect("/admin");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add = async (req, res) => {
    let search_cust = await model_cust.get_cust_byID(req.query).then((data)=>{return data})
    const status = (search_cust.length>0)? 1 : 0
    res.send({status:status});
};

// ---------------------- Vip History ----------------------

exports.Manage_vip_history = async (req, res) => {
    if( req.session.role === "admin" ){
        if (req.query.vip_id) {
            let db_appt =  await model_appt.get_appt_vip_byID({id:req.query.vip_id});
            let db_sale =  await model_sale.get_sale_vip_byID({id:req.query.vip_id});
            res.render('template',{
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                vip_id:req.query.vip_id,
                db_appt:db_appt,
                db_sale:db_sale,
                header:"History Vip",
                file:'admin_page/history_vip'
            });
        }else{
            res.redirect('./manage_vip');
        }
    }else{
        res.redirect('/admin');
    }

};