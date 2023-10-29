const con = require('../config/db_config.js')
const sha = require('../config/encrypt')


exports.vertify_login = async (input) => {
    let sql = ` SELECT em.id ,em.f_name,em.l_name ,em.emp_type_id , em_type.name as type FROM employee em , employee_type em_type 
                where em_type.id = em.emp_type_id and em.username = '${input.user}' and em.password = '${sha.encrypt(input.pwd)}' and em.flag = ${1}`
    let result = await con.query(sql)
    // console.log(result);
    if( result.length > 0 ){
        return result[0];
    }else{
        return undefined;
    }
};
exports.vertify_username = async (input) => {
    let sql = `SELECT username FROM employee WHERE username = '${input.username}' and flag = 1 and flag_login = 0;`
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.update_password_by_username = async (input) => {
    let sql =   `   UPDATE employee SET password= '${sha.encrypt(input.pwd)}',flag_login=1
                    WHERE username = '${input.username}' and flag = 1 and flag_login = 0;
                `
    let result = await con.query(sql)
};


/**
 * 1.func ensure username
 * 2.func save password and change flag_login
 */
// vertify_ensure_password






/*
    ---- Pattern ---
    let sql = ` SELECT em.id ,em.f_name,em.l_name , em_pos.name as position FROM employee em , employee_position em_pos 
                    where em_pos.id = em.position_id and em.username = '${input.user}' and em.password = '${sha.encrypt(input.pwd)}' and em.flag = ${1}`
    let result = await con.query(sql)
    // console.log(result);
    if( result.length > 0 ){
        return result[0];
    }else{
        return undefined;
    }

    --- Pattern Get ---
    let result = await data_login.vertify_login(req.body);
*/

