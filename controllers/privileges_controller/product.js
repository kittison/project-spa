
const model = require('../../models/product');


function is_have_right(session_privilege){
    // Check privileges
    let is_right = false;
    if( session_privilege){
        for(let i of session_privilege){
            if( i === 1){
                is_right = true;
                break;
            }
        }
    }
    return is_right;
}

// ---------------------- product-category ----------------------

exports.product = async (req, res) => {
    // Searche privileges...
    if( req.session.role === "admin" || is_have_right(req.session.privileges) === true ){
        // Query Data;

        let db_category =  await model.get_menu_category();
        // console.log(db_category);

        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_category:db_category,
            header:"Product",
            file:'privileges_page/product'
        });


    }else{
        res.redirect('/');
    }

};
exports.set_product =async (req, res) => {
    if(req.session.role == "admin" || is_have_right(req.session.privileges) === true ) {
        if(req.params.action === "add"){
            await model.insert_category(req.body).then((data)=>{return data});
            res.redirect("../manage_product");
        }else if(req.params.action === "delete"){
            await model.delete_category(req.body).then((data)=>{return data});
            res.redirect("../manage_product");
        }else if(req.params.action === "update"){
            await model.update_category(req.body).then((data)=>{return data});
            res.redirect("../manage_product");
        }
    }else{
        res.redirect("/");
    }
};

// ---------------------- validate ----------------------
exports.is_duplicate_name = async (req, res) => {
    let is_same = await model.is_duplicate_name_category(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};
exports.is_duplicate_name_id = async (req, res) => {
    let is_same = await model.is_duplicate_name_id_category(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};





// ---------------------- product-item ----------------------

exports.product_item = async (req, res) => {
    // Searche privileges...
    let db_category =  await model.get_menu_category_byID({id:req.query.id});
    if( (req.session.role === "admin" || is_have_right(req.session.privileges) === true ) && db_category.length > 0 ){
        
        let db_product_item =  await model.get_product_item_by_id({id:req.query.id});
        let db_product_cost;
        for(let i of db_product_item){
            i['cost'] =  await model.get_product_cost_by_id({id:i.id});
        }
        // Query Data;
            res.render('template',{
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                session_privileges:req.session.privileges,
                db_category:db_category,
                db_product_item:db_product_item,
                header:"Product Item",
                file:'privileges_page/product_item'
            });
        
    }else{
        res.redirect('/');
    }

};


exports.set_product_item =async (req, res) => {
    if( req.session.role == "admin" || is_have_right(req.session.privileges) === true ){
        if(req.params.action === "add"){
            await model.insert_product_item(req.body).then((data)=>{return data});
            res.redirect(`../product_item?id=${req.body.category_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_product_item(req.body).then((data)=>{return data});
            res.redirect(`../product_item?id=${req.body.category_id_del}`);
        }else if(req.params.action === "update"){
            await model.update_product_item(req.body).then((data)=>{return data});
            res.redirect(`../product_item?id=${req.body.Ucategory_id}`);
        }
    }else{
        res.redirect("/");
    }
};


// ========================================= Item : time,price =========================================

exports.set_item_cost =async (req, res) => {
    if( req.session.role == "admin" || is_have_right(req.session.privileges) === true ){
        if(req.params.action === "add"){
            await model.insert_product_cost(req.body).then((data)=>{return data});
            res.redirect(`../../product_item?id=${req.body.category_id}`);
        }else if(req.params.action === "del"){
          
            // console.log("itme del", typeof req.body.cost_del );
            if( typeof(req.body.cost_del) === 'string'){
                await model.delete_product_cost({id_cost:req.body.cost_del}).then((data)=>{return data});
            }else if( typeof(req.body.cost_del) === 'object'){
                for(let i of req.body.cost_del){
                    await model.delete_product_cost({id_cost:i}).then((data)=>{return data});
                }
            }
            res.redirect(`../../product_item?id=${req.body.category_id}`);
        }
    }else{
        res.redirect("/");
    }
};

// ========================================= Item : time,price =========================================







// ---------------------- validate ----------------------
exports.is_duplicate_name_product_item = async (req, res) => {
    let is_same = await model.is_duplicate_name_product_item(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};
exports.is_duplicate_name_id_product_item = async (req, res) => {
    let is_same = await model.is_duplicate_name_id_product_item(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};

