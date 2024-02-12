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
    let sql = ` INSERT INTO appointment( start_date, end_date, cust_id, serv_id, emp_id, room_id, shop_id, vip_id, status, is_vip,
                is_confirmed, flag) 
                VALUES ("${input.start_date}", "${input.end_date}", ${input.cust_id}, ${input.serv_id}, ${input.emp_id}, 
                ${input.room_id}, ${input.shop_id}, NULL, "Scheduled", 0, 0, 1);`
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
    let sql = ` SELECT e.* FROM employee e
                LEFT JOIN shop_employee s on e.id = s.emp_id 
                LEFT JOIN appointment a ON e.id = a.emp_id
                AND a.start_date <= '${input.datetime}'
                AND a.end_date >= '${input.datetime}'
                AND a.status not in ('Cancelled','Complete')
                WHERE a.start_date IS NULL and s.shop_id = ${input.shop_id} and e.emp_type_id != 1 and e.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};

exports.get_room_available = async (input) => {
    let sql = ` SELECT r.* FROM room r
                LEFT JOIN appointment a ON r.id = a.room_id
                AND a.start_date <= '${input.datetime}'
                AND a.end_date >= '${input.datetime}'
                AND a.status not in ('Cancelled','Complete')
                WHERE a.start_date IS NULL and r.shop_id = ${input.shop_id} and r.flag = 1`
    let result = await con.query(sql)
    // console.log('!',result)
    return result;
};
