const con = require('../config/db_config.js')

exports.get_sales = async () => {
    let sql = ` SELECT sale.*, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.serv_id, s.name as serv_name, 
                sf.time as serv_time, sf.price as serv_price, a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name,
                a.status, a.is_confirmed, p.id as payment_id, p.payment_meth_id, p.amount, p.datetime as pay_datetime, p.status, 
                pm.name as pay_meth
                FROM sale
                JOIN appointment as a on sale.appt_id = a.id
                JOIN customer AS c on a.cust_id = c.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                JOIN payment as p on sale.id = p.sale_id
                LEFT JOIN payment_method as pm on p.payment_meth_id = pm.id
                where sale.flag = 1 and a.flag = 1 OR p.payment_meth_id IS NULL`
    let result = await con.query(sql)
    return result;
};

exports.get_sales_byID = async (input) => {
    let sql = ` SELECT sale.*, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.serv_id, s.name as serv_name, 
                sf.time as serv_time, sf.price as serv_price, a.room_id, r.name as room_name, a.shop_id, 
                sh.shop_name as shop_name, sh.location as shop_location, sh.contact as shop_contact,
                a.status, a.is_confirmed, p.id as payment_id, p.payment_meth_id, p.amount, p.datetime as pay_datetime, p.status, 
                pm.name as pay_meth
                FROM sale
                JOIN appointment as a on sale.appt_id = a.id
                JOIN customer AS c on a.cust_id = c.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                JOIN payment as p on sale.id = p.sale_id
                LEFT JOIN payment_method as pm on p.payment_meth_id = pm.id
                where sale.id = ${input.id} and sale.flag = 1 and a.flag = 1 OR p.payment_meth_id IS NULL`
    let result = await con.query(sql)
    return result;
};

exports.get_sale_rating = async () => {
    let sql = ` SELECT sale.*, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.serv_id, s.name as serv_name, 
                sf.time as serv_time, sf.price as serv_price, a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name,
                a.status, a.is_confirmed, p.id as payment_id, p.payment_meth_id, p.amount, p.datetime as pay_datetime, p.status, 
                sr.serv_rating, sr.emp_rating, sr.room_rating, sr.comment, sr.datetime as rate_datetime
                FROM sale
                JOIN appointment as a on sale.appt_id = a.id
                JOIN customer AS c on a.cust_id = c.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                JOIN payment as p on sale.id = p.sale_id
                JOIN satisfaction_rating as sr on sale.id = sr.sale_id
                where sale.flag = 1 and a.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_payment_meth = async () => {
    let sql = ` SELECT * FROM payment_method as pm where pm.flag = 1`
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
