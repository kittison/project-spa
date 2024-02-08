const con = require('../config/db_config.js')


// -------------------- Course --------------------
exports.get_course = async () => {
    let sql = `SELECT id, name, description, times, price FROM service_course where flag = 1;`
    let result = await con.query(sql)
    return result;
};

exports.get_course_byID = async (input) => {
    let sql = ` SELECT id, name, description FROM service_course WHERE id = ${input.id} and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_course = async (input) => {
    let sql = ` INSERT INTO service_course( name , flag) 
                VALUES ("${input.name}", 1);`
    let result = await con.query(sql)
};
exports.update_course = async (input) => {
    let sql = ` UPDATE service_course SET name=  "${input.Uname}"  WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_course = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service_course SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_course = async (input) => {
    let sql = ` SELECT * FROM service_course WHERE name = '${input.name}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_course = async (input) => {
    let sql = `SELECT * FROM service_course WHERE name = '${input.name}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Course service --------------------

exports.get_course_service = async (input) => {
    let sql = `SELECT sic.id, sic.serv_func_id, s.name , sf.time, sf.price
                FROM service_course AS sc
                JOIN service_in_course AS sic ON sc.id = sic.serv_course_id
                JOIN service_function AS sf ON sic.serv_func_id = sf.id
                JOIN service AS s ON sf.serv_id = s.id
                WHERE sc.id = '${input.id}' AND sc.flag = 1 and sic.flag = 1 and sf.flag = 1 and s.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};
exports.insert_course_service = async (input) => {
    let sql_add = ` INSERT INTO service_in_course( serv_course_id , serv_func_id, flag ) 
                VALUES ("${parseInt(input.course_id)}", ${parseInt(input.serv_func_id)}, 1);`
    let add = await con.query(sql_add)
    let sql_sum = ` SELECT SUM(sf.price) AS price FROM service_in_course sic  
                JOIN service_function sf on sic.serv_func_id = sf.id 
                WHERE sic.serv_course_id = ${parseInt(input.course_id)} and sic.flag = 1`
    let sum = await con.query(sql_sum)
    let sql = ` UPDATE service_course SET price = ${parseInt(sum[0].price)} WHERE id = ${parseInt(input.course_id)}`
    let result = await con.query(sql)
};
exports.delete_course_service = async (input) => {
    let sql_remove = ` UPDATE service_in_course SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let remove = await con.query(sql_remove)
    let sql_sum = ` SELECT SUM(sf.price) AS price FROM service_in_course sic  
                JOIN service_function sf on sic.serv_func_id = sf.id 
                WHERE sic.serv_course_id = ${parseInt(input.course_id)} and sic.flag = 1`
    let sum = await con.query(sql_sum)
    let sql = ` UPDATE service_course SET price = ${parseInt(sum[0].price)} WHERE id = ${parseInt(input.course_id)}`
    let result = await con.query(sql)
};

exports.is_duplicate_service = async (input) => {
    // console.log(input);
    let sql = `SELECT * FROM service_in_course WHERE serv_course_id = ${parseInt(input.course_id)} and serv_func_id = '${parseInt(input.serv_func_id)}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
