const con = require('../config/db_config.js')

exports.get_shop = async () => {
    let sql = ` SELECT s.id,s.shop_name,s.location,s.contact,s.opening_time,s.closing_time FROM shop s where s.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_shop_by_ID = async (input) => {
    let sql = ` SELECT s.id,s.shop_name,s.location,s.contact,s.opening_time,s.closing_time FROM shop s 
                where s.id = '${input.id}' and s.flag = 1`
    let result = await con.query(sql)
    return result;
};


exports.insert_shop = async (input) => {
    let sql = ` INSERT INTO shop( shop_name, location, contact, opening_time, closing_time, flag) 
                VALUES ("${input.name}", "${input.location}", "${input.contact}", "${input.o_time}", "${input.c_time}", 1);`
    let result = await con.query(sql)
};
exports.update_shop = async (input) => {
    let sql = ` UPDATE shop SET shop_name= "${input.Uname}", location="${input.Ulocation}", contact="${input.Ucontact}", 
                opening_time="${input.Uo_time}", closing_time="${input.Uc_time}" 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_shop = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE shop SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name = async (input) => {
    // console.log(input);
    let sql = ` SELECT * FROM shop WHERE shop_name = '${input.name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self = async (input) => {
    // console.log(input);
    let sql = `SELECT * FROM shop WHERE id = ${parseInt(input.id)} and shop_name = '${input.name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Shop Employee --------------------

exports.get_shop_employee = async (input) => {
    let sql = `SELECT semp.id, emp.id as emp_id, emp.f_name, emp.l_name, emp.n_name, em_type.name as emp_type,job_level.description, job_level.responsibilities
                FROM shop AS s
                JOIN shop_employee AS semp ON s.id = semp.shop_id
                JOIN employee AS emp ON semp.emp_id = emp.id
                JOIN employee_type AS em_type ON emp.emp_type_id = em_type.id
                JOIN job_level ON emp.job_level_id = job_level.id
                WHERE s.id = '${input.id}' AND emp.flag = 1 and semp.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};
exports.insert_shop_employee = async (input) => {
    let sql = ` INSERT INTO shop_employee( shop_id , emp_id, flag ) 
                VALUES ("${parseInt(input.shop_id)}", ${parseInt(input.emp_id)}, 1);`
    let result = await con.query(sql)
};
exports.delete_shop_employee = async (input) => {
    // console.log(input);
    let sql = ` UPDATE shop_employee SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_emp = async (input) => {
    // console.log(input);
    let sql = `SELECT * FROM shop_employee WHERE shop_id = ${parseInt(input.shop_id)} and emp_id = '${parseInt(input.emp_id)}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
