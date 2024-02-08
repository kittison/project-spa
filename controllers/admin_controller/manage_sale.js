
const model = require('../../models/sale');
const model_appointment = require('../../models/appointment');

exports.Manage_sale = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_sale =  await model.get_sales();
        let db_appt_for_sale =  await model_appointment.get_appt_for_sale();
        let db_payment_meth =  await model.get_payment_meth();
        let db_sale_rating =  await model.get_sale_rating();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_sale: db_sale,
            db_appt_for_sale:db_appt_for_sale,
            db_payment_meth:db_payment_meth,
            db_sale_rating:db_sale_rating,
            header:"Manage Sale",
            file:'admin_page/manage_sale'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setSale =async (req, res) => {
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

