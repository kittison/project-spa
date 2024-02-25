
const model = require('../../models/sale');

exports.Manage_sale = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_sale =  await model.get_sales();
        let db_payment_meth =  await model.get_payment_meth();
        let db_sale_rating =  await model.get_sale_rating();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_sale: db_sale,
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
        if(req.params.action === "pay"){
            await model.pay(req.body).then((data)=>{return data});
            res.redirect("../manage_sale");
        }else if(req.params.action === "vip_pay"){
            await model.vip_pay(req.body).then((data)=>{return data});
            res.redirect("../manage_sale");
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

