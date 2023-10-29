
const model = require('../../models/customer');

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
        res.redirect('/');
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
        res.redirect("/");
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

