
const data_login = require('../models/login');
const model_emp_role = require('../models/privileges');



exports.getLogin = (req, res) => {
    // TEST
    // req.session.user_id = 1;
    // req.session.user = "hello hello";
    // req.session.role = 'admin';
    // TEST
    if( req.session.user_id ){
        res.redirect(`/${req.session.role}`)
    }else{
        res.render('login', {status_login:[],error_code:0});
    } 

};

// ----------------------- Return Status -----------------------
exports.vertify_login = async (req, res) => {
    // console.log(req.body);
    if(req.body.user && req.body.pwd ){
        let result = await data_login.vertify_login(req.body);
        // console.log("#",result);
        /**
         * Add Privileges -> ## req.session.privileges  []
         * 1 : จัดการสินค้า
         * n : ??
         */
        
        if( result !== undefined ){  
            req.session.user_id = result.id;
            req.session.user = result.f_name + " " + result.l_name;
            if( result.emp_type_id === 1){
                req.session.role = 'admin';
            }else if( result.emp_type_id === 2){
                req.session.role = 'emp';
                req.session.privileges =[];
                // Find privileges...
                let pvg  = await model_emp_role.get_privileges_detail_by_id({id:req.session.user_id});
                for(let i of pvg){
                    req.session.privileges.push(i.privileges_id)
                }
            }

            // console.log(req.session.role);
            res.send({
                success:1,
                path:`/${req.session.role}`,
                code:"Successful"
            });

            
        }else{
            res.send({error:1,code:'รหัสไม่ถูกต้อง'});
        }

    }
        
};
exports.vertify_ensure_password = async (req, res) => {
    /**
     * 1.check if username not found
     * 2. IF !=1 : save fassword
     * { user: '123', pwd1: '123123', pwd2: '123' }
     */
    // console.log("debug",req.body);
    let result = await data_login.vertify_username({username:req.body.user});
    if(result){
        await data_login.update_password_by_username({
            username:req.body.user,
            pwd:req.body.pwd1
        });
        res.send({status:1,code:"Successful"});
    }else{
        res.send({status:-1,code:"ไม่เจอ username นี้ในระบบ"});     
    }
    
};
// ----------------------- Return Status -----------------------


exports.logout = (req, res) => {
    req.session.destroy(function(err){});
    res.redirect('/admin');
};
