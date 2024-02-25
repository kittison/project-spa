
const model = require('../../models/customer');
const model_course = require('../../models/course');
const model_vip = require('../../models/vip');

exports.Manage_customer = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_cust =  await model.get_cust();
        // console.log("#",db_employee);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_cust:db_cust,
            header:"Manage Customer",
            file:'admin_page/manage_cust'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setCustomer =async (req, res) => {
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

// ---------------------- Customer Vip ----------------------

exports.Manage_customer_vip = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_cust =  await model.get_cust_byID({id:req.query.cust_id});
        let db_cust_vip =  await model.get_cust_vip({id:req.query.cust_id});
        let db_course =  await model_course.get_course();
        if (db_cust.length > 0) {
            res.render('template',{
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                db_cust:db_cust,
                db_cust_vip:db_cust_vip,
                db_course:db_course,
                header:"Manage Customer",
                file:'admin_page/manage_cust_vip'
            });
        }else{
            res.redirect('./manage_cust');
        }
    }else{
        res.redirect('/admin');
    }

};

exports.setCustomerVip =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model_vip.insert_vip(req.body).then((data)=>{return data});
            res.redirect(`../manage_cust_vip?cust_id=${req.body.cust_id}`);
        }else if(req.params.action === "delete"){
            await model_vip.delete_vip(req.body).then((data)=>{return data});
            res.redirect(`../manage_cust_vip?cust_id=${req.body.cust_id}`);
        }else if(req.params.action === "update"){
            await model_vip.update_vip(req.body).then((data)=>{return data});
            res.redirect(`../manage_cust_vip?cust_id=${req.body.cust_id}`);
        }
    }else{
        res.redirect("/admin");
    }
};