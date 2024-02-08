
const model = require('../../models/shop');
const model_emp = require('../../models/employee');

exports.Manage_shop = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_shop =  await model.get_shop();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_shop:db_shop,
            header:"Manage Shop",
            file:'admin_page/manage_shop'
        });
    }else{
        res.redirect('/admin');
    }
};


exports.setShop =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_shop(req.body).then((data)=>{return data});
            res.redirect("../manage_shop");
        }else if(req.params.action === "delete"){
            await model.delete_shop(req.body).then((data)=>{return data});
            res.redirect("../manage_shop");
        }else if(req.params.action === "update"){
            await model.update_shop(req.body).then((data)=>{return data});
            res.redirect("../manage_shop",{});
        }
    }else{
        res.redirect("/admin");
    }
};

exports.check_can_add = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    const status = is_duplicate_name ? 0 : 1;
    res.send({ status:status });
};

exports.check_can_update = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self(req.query).then((data)=>{return data})
    const status = is_duplicate_name ? (is_duplicate_name_self ? 1 : 0) : 1;
    res.send({ status:status });
};


// ---------------------- shop-employee ----------------------
exports.manage_shop_employee = async (req, res) => {
    let db_shop =  await model.get_shop_by_ID({id:req.query.shop_id});
    let db_shop_emp =  await model.get_shop_employee({id:req.query.shop_id});
    let db_emp = await model_emp.get_emp();
    if( req.session.role === "admin"){

        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_shop:db_shop,
            db_shop_emp:db_shop_emp,
            db_emp:db_emp,
            header:"Shop Employee",
            file:'admin_page/manage_shop_emp'
        });
        
    }else{
        res.redirect('/admin');
    }

};

exports.setShopEmployee =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            console.log(req.body)
            await model.insert_shop_employee(req.body).then((data)=>{return data});
            res.redirect(`../manage_shop_emp?shop_id=${req.body.shop_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_shop_employee(req.body).then((data)=>{return data});
            res.redirect(`../manage_shop_emp?shop_id=${req.body.shop_id}`);
        }
    }else{
        res.redirect("/admin");
    }
};

exports.check_can_add_emp = async (req, res) => {
    let is_duplicate_emp = await model.is_duplicate_emp(req.query).then((data)=>{return data})
    const status = is_duplicate_emp ? 0 : 1;
    res.send({ status:status });
};

// ---------------------- shop-room ----------------------
exports.manage_shop_room = async (req, res) => {
    let db_shop =  await model.get_shop_by_ID({id:req.query.shop_id});
    let db_shop_room =  await model.get_shop_room({id:req.query.shop_id});
    if( req.session.role === "admin"){

        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_shop:db_shop,
            db_shop_room:db_shop_room,
            header:"Shop Room",
            file:'admin_page/manage_shop_room'
        });
        
    }else{
        res.redirect('/admin');
    }

};

exports.setShopRoom =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            console.log(req.body)
            await model.insert_shop_room(req.body).then((data)=>{return data});
            res.redirect(`../manage_shop_room?shop_id=${req.body.shop_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_shop_room(req.body).then((data)=>{return data});
            res.redirect(`../manage_shop_room?shop_id=${req.body.shop_id}`);
        }else if(req.params.action === "update"){
            await model.update_shop_room(req.body).then((data)=>{return data});
            res.redirect(`../manage_shop_room?shop_id=${req.body.shop_id}`);
        }
    }else{
        res.redirect("/admin");
    }
};

// ---------------------- validate ----------------------
exports.check_can_add_room = async (req, res) => {
    let is_duplicate_name_room = await model.is_duplicate_name_room(req.query).then((data)=>{return data})
    const status = is_duplicate_name_room? 0 : 1
    res.send({status:status});
};
exports.check_can_update_room = async (req, res) => {
    let is_duplicate_name_room = await model.is_duplicate_name_room(req.query).then((data)=>{return data})
    let is_duplicate_name_self_room = await model.is_duplicate_name_self_room(req.query).then((data)=>{return data})
    const status = is_duplicate_name_room? (is_duplicate_name_self_room? 1 : 0) : 1
    res.send({status:status});
};



