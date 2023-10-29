
const model_emp_role = require('../../models/privileges');



exports.Manage_privileges = async (req, res) => {

    if( req.session.role === "admin" ){
        let db_emp_role =  await model_emp_role.get_emp_privileges();
        let db_privileges =  await model_emp_role.get_privileges();
        for(let i of db_emp_role){
            i['privileges'] = await model_emp_role.get_privileges_detail_by_id({id:i.id});
        }
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_emp_role:db_emp_role,
            db_privileges:db_privileges,
            header:"Manage Privileges",
            file:'admin_page/manage_privileges'
        });
    }else{
        res.redirect('/');
    }

};

exports.Manage_privileges_update = async (req, res) => {

    if( req.session.role === "admin" ){
        if( req.body.privileges === undefined ){
             await model_emp_role.delete_privaileges_by_id({id:req.body.id_update});
            }else{
                await model_emp_role.delete_privaileges_by_id({
                    id:req.body.id_update
                });
                for(let index of req.body.privileges)
                await model_emp_role.insert_privaileges_by_id({
                    privileges_id: index ,
                    emp_id:req.body.id_update
                });
        }
        res.redirect("../manage_privileges");
    }else{
        res.redirect('/');
    }

};