
const model = require('../../models/course');
const model_service = require('../../models/service');

// ---------------------- course ----------------------
exports.Manage_course = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_course =  await model.get_course();
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_course:db_course,
            header:"Course",
            file:'admin_page/manage_course'
        });
    }else{
        res.redirect('/admin');
    }

};

exports.setCourse =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_course(req.body).then((data)=>{return data});
            res.redirect("../manage_course");
        }else if(req.params.action === "delete"){
            await model.delete_course(req.body).then((data)=>{return data});
            res.redirect("../manage_course");
        }else if(req.params.action === "update"){
            await model.update_course(req.body).then((data)=>{return data});
            res.redirect("../manage_course");
        }
    }else{
        res.redirect("/admin");
    } 
};

exports.check_can_add = async (req, res) => {
    let is_duplicate_name_course = await model.is_duplicate_name_course(req.query).then((data)=>{return data})
    const status = is_duplicate_name_course? 0 : 1
    res.send({status:status});
};
exports.check_can_update = async (req, res) => {
    let is_duplicate_name_course = await model.is_duplicate_name_course(req.query).then((data)=>{return data})
    let is_duplicate_name_self_course = await model.is_duplicate_name_self_course(req.query).then((data)=>{return data})
    const status = is_duplicate_name_course? (is_duplicate_name_self_course? 1 : 0) : 1
    res.send({status:status});
};


// ---------------------- Course Service ----------------------
exports.manage_course_service = async (req, res) => {
    let db_course =  await model.get_course_byID({id:req.query.course_id});
    let db_course_service =  await model.get_course_service({id:req.query.course_id});
    let db_service = await model_service.get_service_and_func();
    if( req.session.role === "admin"){

        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            session_privileges:req.session.privileges,
            db_course:db_course,
            db_course_service:db_course_service,
            db_service:db_service,
            header:"Course Service",
            file:'admin_page/manage_course_service'
        });
        
    }else{
        res.redirect('/admin');
    }

};

exports.setCourseService =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_course_service(req.body).then((data)=>{return data});
            res.redirect(`../manage_course_service?course_id=${req.body.course_id}`);
        }else if(req.params.action === "delete"){
            await model.delete_course_service(req.body).then((data)=>{return data});
            res.redirect(`../manage_course_service?course_id=${req.body.course_id}`);
        }
    }else{
        res.redirect("/admin");
    }
};

exports.check_can_add_service = async (req, res) => {
    let is_duplicate_service = await model.is_duplicate_service(req.query).then((data)=>{return data})
    const status = is_duplicate_service ? 0 : 1;
    res.send({ status:status });
};

