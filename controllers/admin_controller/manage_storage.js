
const model = require('../../models/storage');

exports.Manage_storage = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_prod =  await model.get_product();
        let db_prod_reuse =  await model.get_product_reuse();
        let db_prod_alert =  await model.get_product_alert();
        let db_prod_reuse_list =  await model.get_product_reuse_list();
        for(let i of db_prod){
            i['statistics'] = await model.get_product_statistic({id:i.id});
        }
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_prod:db_prod,
            db_prod_reuse:db_prod_reuse,
            db_prod_alert:db_prod_alert,
            db_prod_reuse_list:db_prod_reuse_list,
            header:"Storage",
            file:'admin_page/manage_storage'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setStorage =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add_stock"){
            let new_stock = parseInt(req.body.Istock) + parseInt(req.body.Iamount);
            await model.update_stock(req.body.Iid,new_stock).then((data)=>{return data});
            await model.record_history(req.body.Iid,req.body.Istock,new_stock,1);
            res.redirect("../manage_storage");
        }else if(req.params.action === "remove_stock"){
            let new_stock = parseInt(req.body.Dstock) - parseInt(req.body.Damount);
            await model.update_stock(req.body.Did,new_stock).then((data)=>{return data});
            await model.record_history(req.body.Did,req.body.Dstock,new_stock,2)
            res.redirect("../manage_storage");
        }else if(req.params.action === "add_reuse"){
            await model.insert_product_reuse(req.body).then((data)=>{return data});
            await model.update_stock(req.body.prod_id,req.body.stock-1).then((data)=>{return data});
            await model.record_history(req.body.prod_id,req.body.stock,req.body.stock-1,2)
            res.redirect("../manage_storage");
        }else if(req.params.action === "update_reuse"){
            await model.update_product_reuse(req.body).then((data)=>{return data});
            await model.record_history(req.body.Uid,req.body.Uremaining_backup,req.body.Uremaining,4)
            res.redirect("../manage_storage");
        }else if(req.params.action === "delete_reuse"){
            await model.delete_product_reuse(req.body).then((data)=>{return data});
            res.redirect("../manage_storage");
        }else{
            res.redirect("/admin");
        }
    }
};


// ---------------------- validate ----------------------
exports.check_can_add_stock = async (req, res) => {
    let is_same = await model.is_duplicate_name(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};
exports.check_can_remove_stock = async (req, res) => {
    let is_same = await model.compare_4_dec_stock(req.query).then((data)=>{return data})
    if(is_same === false){
        res.send({status:1});
    }else{
        res.send({status:-1});
    }
};

