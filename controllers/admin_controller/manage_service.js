
const model = require('../../models/service');
const model_product = require('../../models/product');

// ---------------------- Service group ----------------------
exports.Manage_service_group = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_serv_group =  await model.get_service_group();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_serv_group:db_serv_group,
            header:"Service Group",
            file:'admin_page/manage_service_group'
        });
    }else{
        res.redirect('/');
    }

};

exports.setServiceGroup =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_service_group(req.body).then((data)=>{return data});
            res.redirect("../manage_service_group");
        }else if(req.params.action === "delete"){
            await model.delete_service_group(req.body).then((data)=>{return data});
            res.redirect("../manage_service_group");
        }else if(req.params.action === "update"){
            await model.update_service_group(req.body).then((data)=>{return data});
            res.redirect("../manage_service_group");
        }
    }else{
        res.redirect("/");
    } 
};

// ---------------------- validate ----------------------
exports.check_can_add_service_group = async (req, res) => {
    let is_duplicate_name_service_group = await model.is_duplicate_name_service_group(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service_group? 0 : 1
    res.send({status:status});
};
exports.check_can_update_service_group = async (req, res) => {
    let is_duplicate_name_service_group = await model.is_duplicate_name_service_group(req.query).then((data)=>{return data})
    let is_duplicate_name_self_service_group = await model.is_duplicate_name_self_service_group(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service_group? (is_duplicate_name_self_service_group? 1 : 0) : 1
    res.send({status:status});
};

// ---------------------- Service type ----------------------

exports.Manage_service_type = async (req, res) => {
    if( req.session.role === "admin" && req.query.group_id){
        let db_serv_group =  await model.get_service_group_byID({id:req.query.group_id});
        let db_serv_type =  await model.get_service_type_by_groupID({id:req.query.group_id});
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_serv_group:db_serv_group,
            db_serv_type:db_serv_type,
            header:"Service Type",
            file:'admin_page/manage_service_type'
        });
    }else{
        res.redirect('/');
    }

};


exports.setServiceType =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_service_type(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_type?group_id=${req.body.group_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_service_type(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_type?group_id=${req.body.group_id}`);
        }else if(req.params.action === "update"){
            await model.update_service_type(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_type?group_id=${req.body.group_id}`);
        }
    }else{
        res.redirect("/");
    }
};

// ---------------------- validate ----------------------
exports.check_can_add_service_type = async (req, res) => {
    let is_duplicate_name_service_type = await model.is_duplicate_name_service_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service_type? 0 : 1
    res.send({status:status});
};
exports.check_can_update_service_type = async (req, res) => {
    let is_duplicate_name_service_type = await model.is_duplicate_name_service_type(req.query).then((data)=>{return data})
    let is_duplicate_name_self_service_type = await model.is_duplicate_name_self_service_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service_type? (is_duplicate_name_self_service_type? 1 : 0) : 1
    res.send({status:status});
};


// ---------------------- Service ----------------------
exports.manage_service = async (req, res) => {
    if( req.session.role === "admin" && req.query.group_id && req.query.type_id){
        let db_serv_group =  await model.get_service_group_byID({id:req.query.group_id});
        let db_serv_type =  await model.get_service_type_byID({id:req.query.type_id});
        let db_serv =  await model.get_service_by_typeID({id:req.query.type_id});
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_serv_group:db_serv_group,
            db_serv_type:db_serv_type,
            db_serv:db_serv,
            header:"Service",
            file:'admin_page/manage_service'
        });
        
    }else{
        res.redirect('/');
    }

};

exports.setService =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_service(req.body).then((data)=>{return data});
            res.redirect(`../manage_service?group_id=${req.body.group_id}&type_id=${req.body.type_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_service(req.body).then((data)=>{return data});
            res.redirect(`../manage_service?group_id=${req.body.group_id}&type_id=${req.body.type_id}`);
        }else if(req.params.action === "update"){
            await model.update_service(req.body).then((data)=>{return data});
            res.redirect(`../manage_service?group_id=${req.body.group_id}&type_id=${req.body.type_id}`);
        }
    }else{
        res.redirect("/");
    }
};

// ---------------------- validate ----------------------
exports.check_can_add_service = async (req, res) => {
    let is_duplicate_name_service = await model.is_duplicate_name_service(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service? 0 : 1
    res.send({status:status});
};
exports.check_can_update_service = async (req, res) => {
    let is_duplicate_name_service = await model.is_duplicate_name_service(req.query).then((data)=>{return data})
    let is_duplicate_name_self_service = await model.is_duplicate_name_self_service(req.query).then((data)=>{return data})
    const status = is_duplicate_name_service? (is_duplicate_name_self_service? 1 : 0) : 1
    res.send({status:status});
};


// ---------------------- Service function----------------------
exports.manage_service_function = async (req, res) => {
    if( req.session.role === "admin" && req.query.group_id && req.query.type_id && req.query.service_id){
        let db_serv_group =  await model.get_service_group_byID({id:req.query.group_id});
        let db_serv_type =  await model.get_service_type_byID({id:req.query.type_id});
        let db_serv =  await model.get_service_byID({id:req.query.service_id});
        let db_serv_func =  await model.get_serv_func_by_servID({id:req.query.service_id});
        let db_product = await model_product.get_product();
        for(let i of db_serv_func){
            i['list_prod'] = await model.get_serv_prod_by_servFuncID({id:i.id});
        }
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_serv_group:db_serv_group,
            db_serv_type:db_serv_type,
            db_serv:db_serv,
            db_serv_func:db_serv_func,
            db_product:db_product,
            header:"Service Function",
            file:'admin_page/manage_service_function'
        });
        
    }else{
        res.redirect('/');
    }

};

exports.setServiceFunction =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_service_function(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_service_function(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }else if(req.params.action === "update"){
            await model.update_service_function(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }else if(req.params.action === "add_product"){
            await model.insert_service_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }else if(req.params.action === "delete_product"){
            await model.delete_service_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }else if(req.params.action === "update_product"){
            await model.update_service_product(req.body).then((data)=>{return data});
            res.redirect(`../manage_service_function?group_id=${req.body.group_id}&type_id=${req.body.type_id}&service_id=${req.body.service_id}`);
        }
    }else{
        res.redirect("/");
    }
};

// ---------------------- validate ----------------------
exports.check_can_add_service_function = async (req, res) => {
    let is_duplicate_service_function = await model.is_duplicate_service_function(req.query).then((data)=>{return data})
    const status = is_duplicate_service_function? 0 : 1
    res.send({status:status});
};
exports.check_can_update_service_function = async (req, res) => {
    let is_duplicate_service_function = await model.is_duplicate_service_function(req.query).then((data)=>{return data})
    let is_duplicate_self_service_function = await model.is_duplicate_self_service_function(req.query).then((data)=>{return data})
    const status = is_duplicate_service_function? (is_duplicate_self_service_function? 1 : 0) : 1
    res.send({status:status});
};
exports.check_can_add_service_product = async (req, res) => {
    let is_duplicate_service_function = await model.is_duplicate_service_product(req.query).then((data)=>{return data})
    const status = is_duplicate_service_function? 0 : 1
    res.send({status:status});
};
