const con = require('../config/db_config.js')


exports.get_emp_privileges = async () => {
    let sql = ` SELECT em.id,em.f_name,em.l_name  FROM employee em  
                where em.position_id = 2 and em.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_privileges_detail_by_id = async (input) => {
    let sql = ` SELECT ed.id,ed.privileges_id,ed.emp_id,ep.name FROM employee_privileges_detail ed , employee_privileges ep 
                where emp_id = ${input.id}  and ed.privileges_id = ep.id;`
    let result = await con.query(sql)
    return result;
};
exports.get_privileges= async (input) => {
    let sql = ` SELECT * FROM employee_privileges `
    let result = await con.query(sql)
    return result;
};

exports.delete_privaileges_by_id = async (input) => {
    let sql = ` DELETE FROM employee_privileges_detail WHERE emp_id = ${input.id}; `
    let result = await con.query(sql)
};
exports.insert_privaileges_by_id = async (input) => {
    let sql = ` INSERT INTO employee_privileges_detail(privileges_id, emp_id) VALUES ( ${input.privileges_id} ,${input.emp_id} ) `
    let result = await con.query(sql)
};
