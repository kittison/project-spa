
const model = require('../../models/product');

exports.Manage_product_type = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_prod_type =  await model.get_product_type();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_prod_type:db_prod_type,
            header:"Product Group",
            file:'admin_page/manage_product_type'
        });
    }else{
        res.redirect('/');
    }

};


exports.setProductType =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_product_type(req.body).then((data)=>{return data});
            res.redirect("../manage_product_type");
        }else if(req.params.action === "delete"){
            await model.delete_product_type(req.body).then((data)=>{return data});
            res.redirect("../manage_product_type");
        }else if(req.params.action === "update"){
            await model.update_product_type(req.body).then((data)=>{return data});
            res.redirect("../manage_product_type");
        }
    }else{
        res.redirect("/");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add_type = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_product_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1
    res.send({status:status});
};
exports.check_can_update_type = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_product_type(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self_product_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1
    res.send({status:status});
};


// ---------------------- product ----------------------
exports.manage_product = async (req, res) => {
    if( req.session.role === "admin"){
        let db_prod_type =  await model.get_product_type_byID({id:req.query.type_id});
        let db_prod =  await model.get_product_by_typeID({id:req.query.type_id});
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_prod_type:db_prod_type,
            db_prod:db_prod,
            header:"Product",
            file:'admin_page/manage_product'
        });
        
    }else{
        res.redirect('/');
    }

};

exports.setProduct =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_product?type_id=${req.body.type_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_product?type_id=${req.body.type_id}`);
        }else if(req.params.action === "update"){
            await model.update_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_product?type_id=${req.body.type_id}`);
        }
    }else{
        res.redirect("/");  
    }
};

exports.check_can_add = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_product(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1
    res.send({status:status});
};
exports.check_can_update = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_product(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self_product(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1
    res.send({status:status});
};


