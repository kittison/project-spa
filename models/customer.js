const con = require('../config/db_config.js')

exports.get_cust = async () => {
    let sql = ` SELECT * FROM customer where flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_cust_byID = async (input) => {
    let sql = ` SELECT * FROM customer where id = '${input.id}' and flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_cust = async (input) => {
    let sql = ` INSERT INTO customer( f_name, l_name, gender, address, tel, email, cus_type, member_point, is_member, is_walkin, flag) 
                VALUES ("${input.f_name}", "${input.l_name}", "${input.gender}", "${input.address}", "${input.tel}", "${input.email}",
                "${input.type}", ${parseInt(input.point)}, 0, 0, 1);`
    let result = await con.query(sql)
    return result.insertId
};
exports.insert_cust_vip = async (input) => {
    let sql = ` INSERT INTO customer( f_name, l_name, gender, address, tel, email, cus_type, member_point, is_member, is_walkin, flag) 
                VALUES ("${input.f_name}", "${input.l_name}", "${input.gender}", "${input.address}", "${input.tel}", "${input.email}",
                "${input.type}", ${parseInt(input.point)}, 1, 0, 1);`
    let result = await con.query(sql)
    return result.insertId
};
exports.update_cust = async (input) => {
    let sql = ` UPDATE customer SET f_name=  "${input.Uf_name}", l_name= "${input.Ul_name}", gender= "${input.Ugender}",
                address= "${input.Uaddress}", tel= "${input.Utel}", email= "${input.Uemail}", cus_type= "${input.Utype}", 
                member_point= ${parseInt(input.Upoint)} 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_cust = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE customer SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name = async (input) => {
    let sql = ` SELECT * FROM customer WHERE f_name = '${input.f_name}' and l_name = '${input.l_name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self = async (input) => {
    let sql = `SELECT * FROM customer WHERE f_name = '${input.f_name}' and l_name = '${input.l_name}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

exports.get_vip = async () => {
    let sql = ` SELECT c.*, v.id as vip_id, v.serv_course_id, v.join_date, v.expire_date, v.service_times, v.acc_val, v.remain_val
                FROM vip_member as v JOIN customer as c on v.cust_id = c.id 
                where v.flag = 1 and c.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_vip_byID = async (input) => {
    let sql = ` SELECT c.*, v.id as vip_id, v.serv_course_id, v.join_date, v.expire_date, v.service_times, v.acc_val, v.remain_val
                FROM vip_member as v JOIN customer as c on v.cust_id = c.id 
                where v.id = '${input.id}' and v.flag = 1 and c.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_cust_vip = async (input) => {
    let sql = ` SELECT v.*, sc.id as course_id, sc.name as course_name FROM vip_member as v 
                JOIN customer as c on v.cust_id = c.id 
                JOIN service_course as sc on v.serv_course_id = sc.id
                where c.id = '${input.id}' and v.flag = 1 and c.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.search_cust = async (input) => {
    let sql = ` SELECT * FROM customer where f_name = '${input.f_name}' and l_name = '${input.l_name}' and gender = '${input.gender}' and 
    address = '${input.address}' and tel = ${input.tel} and email = '${input.email}' and flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.setIsService = async (input) => {
    let sql = ` UPDATE customer SET is_service=  "${input.is_service}" WHERE id = ${input.cust_id} `
    let result = await con.query(sql)
};
