const con = require('../config/db_config.js')

exports.get_appt_standard = async () => {
    let sql = ` SELECT a.id, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.serv_id, s.name as serv_name, 
                sf.time as serv_time, sf.price as serv_price, a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name,
                a.status, a.is_confirmed 
                FROM appointment as a
                JOIN customer AS c on a.cust_id = c.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                where a.is_vip = 0 and a.flag = 1`
    let result = await con.query(sql)
    return result;
};
exports.get_appt_vip = async () => {
    let sql = ` SELECT a.id, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, v.serv_course_id as course_id, sc.name as course_name, 
                sc.price as course_price, s.name as serv_name, sf.time as serv_time, sf.price as serv_price,
                a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name, a.status, a.is_confirmed 
                FROM appointment as a
                JOIN customer AS c on a.cust_id = c.id
                JOIN vip_member As v on a.vip_id = v.id
                JOIN service_course AS sc on v.serv_course_id = sc.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                where a.is_vip = 1 and a.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_appt = async (input) => {
    let sql = ` INSERT INTO customer( f_name, l_name, gender, address, tel, email, cus_type, member_point, is_member, is_walkin, flag) 
                VALUES ("${input.f_name}", "${input.l_name}", "${input.gender}", "${input.address}", "${input.tel}", "${input.email}",
                "${input.type}", ${parseInt(input.point)}, 0, 0, 1);`
    let result = await con.query(sql)
};
exports.update_appt = async (input) => {
    let sql = ` UPDATE customer SET f_name=  "${input.Uf_name}", l_name= "${input.Ul_name}", gender= "${input.Ugender}",
                address= "${input.Uaddress}", tel= "${input.Utel}", email= "${input.Uemail}", cus_type= "${input.Utype}", 
                member_point= ${parseInt(input.Upoint)} 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_appt = async (input) => {
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

exports.get_appt_for_sale = async () => {
    let sql = ` SELECT a.id, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, v.serv_course_id as course_id, sc.name as course_name, 
                sc.price as course_price, s.name as serv_name, sf.time as serv_time, sf.price as serv_price,
                a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name, a.status, a.is_confirmed 
                FROM appointment as a
                JOIN customer AS c on a.cust_id = c.id
                JOIN vip_member As v on a.vip_id = v.id
                JOIN service_course AS sc on v.serv_course_id = sc.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                where a.is_vip != 'Cancelled' and a.is_vip != 'Completed' and a.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_employee_available = async (input) => {
    let sql = `SELECT e.*
                FROM shop_employee AS se
                JOIN employee AS e ON e.id = se.emp_id
                WHERE se.shop_id = '${input.shop_id}' and e.emp_type_id != 1 and se.flag = 1 and e.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};

exports.get_room_available = async (input) => {
    let sql = `SELECT * 
                FROM room AS r
                WHERE r.shop_id = '${input.shop_id}' AND r.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};
