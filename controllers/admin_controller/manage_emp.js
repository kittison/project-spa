
const model = require('../../models/employee');

exports.Manage_emp = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_employee =  await model.get_emp();
        let db_position =  await model.get_position();
        let db_level =  await model.get_level();
        // console.log("#",db_employee);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_employee:db_employee,
            db_position:db_position,
            db_level:db_level,
            header:"Manage Employee",
            file:'admin_page/manage_emp'
        });
    }else{
        res.redirect('/');
    }

};

exports.setEmployee =async (req, res) => {
    if(req.session.role == "admin"){
        // console.log(req.body)
        if(req.params.action === "add"){
            await model.insert_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp");
        }else if(req.params.action === "delete"){
            await model.delete_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp");
        }else if(req.params.action === "update"){
            await model.update_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp");
        }
    }else{
        res.redirect("/");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1;
    res.send({status:status});
};
exports.check_can_update = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1;
    res.send({status:status});
};


// ---------------------- Employee type ----------------------

exports.Manage_emp_type = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_emp_type =  await model.get_position();
        // console.log("#",db_employee);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_emp_type:db_emp_type,
            header:"Manage Employee",
            file:'admin_page/manage_emp_type'
        });
    }else{
        res.redirect('/');
    }

};

exports.setEmployeeType =async (req, res) => {
    if(req.session.role == "admin"){
        // console.log(req.body)
        if(req.params.action === "add"){
            await model.insert_emp_type(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_type");
        }else if(req.params.action === "delete"){
            await model.delete_emp_type(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_type");
        }else if(req.params.action === "update"){
            await model.update_emp_type(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_type");
        }
    }else{
        res.redirect("/");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add_type = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1;
    res.send({status:status});
};
exports.check_can_update_type = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_type(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self_type(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1;
    res.send({status:status});
};


// ---------------------- Job level ----------------------

exports.Manage_job_level = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_job_level =  await model.get_level();
        // console.log("#",db_employee);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_job_level:db_job_level,
            header:"Manage Employee",
            file:'admin_page/manage_job_level'
        });
    }else{
        res.redirect('/');
    }

};

exports.setJobLevel =async (req, res) => {
    if(req.session.role == "admin"){
        // console.log(req.body)
        if(req.params.action === "add"){
            await model.insert_job_level(req.body).then((data)=>{return data});
            res.redirect("../manage_job_level");
        }else if(req.params.action === "delete"){
            await model.delete_job_level(req.body).then((data)=>{return data});
            res.redirect("../manage_job_level");
        }else if(req.params.action === "update"){
            await model.update_job_level(req.body).then((data)=>{return data});
            res.redirect("../manage_job_level");
        }
    }else{
        res.redirect("/");
    }
};


// ---------------------- validate ----------------------
exports.check_can_add_level = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_level(req.query).then((data)=>{return data})
    const status = is_duplicate_name? 0 : 1;
    res.send({status:status});
};
exports.check_can_update_level = async (req, res) => {
    let is_duplicate_name = await model.is_duplicate_name_level(req.query).then((data)=>{return data})
    let is_duplicate_name_self = await model.is_duplicate_name_self_level(req.query).then((data)=>{return data})
    const status = is_duplicate_name? (is_duplicate_name_self? 1 : 0) : 1;
    res.send({status:status});
};


// ---------------------- Employee work ----------------------

exports.Manage_emp_work = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_emp_work =  await model.get_emp_work();
        let db_emp_queue =  await model.get_emp_queue();
        // console.log("#",db_employee);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_emp_queue:db_emp_queue,
            db_emp_work:db_emp_work,
            header:"Manage Employee Work",
            file:'admin_page/manage_emp_work'
        });
    }else{
        res.redirect('/');
    }

};


exports.setEmployeeWork =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            await model.insert_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_work");
        }else if(req.params.action === "delete"){
            await model.delete_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_work");
        }else if(req.params.action === "update"){
            await model.update_emp(req.body).then((data)=>{return data});
            res.redirect("../manage_emp_work");
        }
    }else{
        res.redirect("/");
    }
};


exports.Manage_emp_queue = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_emp_queue =  await model.get_emp_queue();
        // console.log("#",db_emp_queue);
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_emp_queue:db_emp_queue,
            header:"Manage Employee Queue",
            file:'admin_page/manage_emp_queue'
        });
    }else{
        res.redirect('/');
    }

};


exports.setEmployeeQueue =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "update_queue"){
            // console.log('req',req.body)
            for (let q of req.body.data){
                await model.update_emp_queue(q).then((data)=>{return data});
            }
            res.redirect("../manage_emp_queue");
        }
    }else{
        res.redirect("/");
    }
};


