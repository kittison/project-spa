
const model = require('../../models/vip');
const model_course = require('../../models/course');

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

// ---------------------- Vip History ----------------------

// exports.Manage_vip_history = async (req, res) => {
//     if( req.session.role === "admin" ){
//         let db_cust =  await model.get_cust_byID({id:req.query.cust_id});
//         let db_cust_vip =  await model.get_cust_vip({id:req.query.cust_id});
//         let db_course =  await model_course.get_course();
//         // console.log("#",db_employee);
//         res.render('template',{
//             session_user_id:req.session.user_id,
//             session_user:req.session.user,
//             session_role:req.session.role,
//             db_cust:db_cust,
//             db_cust_vip:db_cust_vip,
//             db_course:db_course,
//             header:"Manage Customer",
//             file:'admin_page/manage_cust_vip'
//         });
//     }else{
//         res.redirect('/admin');
//     }

// };