const con = require('../config/db_config.js')

exports.get_sales = async () => {
    let sql = ` SELECT sale.*, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.vip_id, v.acc_val, v.remain_val, 
                a.serv_id, s.name as serv_name, sf.time as serv_time, sf.price as serv_price, 
                a.room_id, r.name as room_name, a.shop_id, sh.shop_name as shop_name,
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
                LEFT JOIN vip_member as v on a.vip_id = v.id
                LEFT JOIN payment_method as pm on p.payment_meth_id = pm.id
                where sale.flag = 1 and a.flag = 1 OR p.payment_meth_id IS NULL OR a.vip_id IS NULL`
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
                where sale.id = ${input.id} and sale.flag = 1 and a.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_sales_save = async (input) => {
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
                where sale.id = ${input.id} and sale.flag = 1`
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

exports.get_sale_rating_byId = async (input) => {
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
                LEFT JOIN satisfaction_rating as sr on sale.id = sr.sale_id
                where sale.id = ${input.id} and sale.flag = 1 and a.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_payment_meth = async () => {
    let sql = ` SELECT * FROM payment_method as pm where pm.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_sale = async (input) => {
    let sql_emp = `UPDATE employee SET is_service= 0 WHERE id = ${input.emp_id}`
    await con.query(sql_emp)
    let sql_appt = ` UPDATE appointment SET status= "Completed"
                WHERE id = ${input.appt_id} `
    await con.query(sql_appt)
    let sql_sale = `INSERT INTO sale( appt_id, cust_id, shop_id, emp_id, serv_id, prod_id, prom_id, quantity, 
                    datetime, total_price, flag) 
                    VALUES (${input.appt_id}, null, null, null, null, null,
                    null, null, "${input.datetime}", ${input.price}, 1);`
    let result_sale = await con.query(sql_sale)
    let sql_payment = ` INSERT INTO payment( sale_id, payment_meth_id, amount, status, flag) 
                        VALUES (${result_sale.insertId}, null, null, "PENDING", 1);`
    let result_payment = await con.query(sql_payment)
};
exports.update_sale = async (input) => {
    let sql = ` UPDATE sale SET f_name=  "${input.Uf_name}", l_name= "${input.Ul_name}", gender= "${input.Ugender}",
                address= "${input.Uaddress}", tel= "${input.Utel}", email= "${input.Uemail}", cus_type= "${input.Utype}", 
                member_point= ${parseInt(input.Upoint)} 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_sale = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE sale SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.insert_sale_rating = async (input) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    let sql = ` INSERT INTO satisfaction_rating( sale_id, serv_rating, emp_rating, room_rating, comment, datetime, flag) 
                VALUES (${input.sale_id}, ${input.rate_serv}, ${input.rate_emp}, ${input.rate_room}, "${input.comment}",
                "${formattedDate}", 1);`
    let result = await con.query(sql)
};

exports.get_sale_vip_byID = async (input) => {
    let sql = ` SELECT sale.*, a.start_date, a.end_date, a.cust_id, c.f_name as cust_fname, c.l_name as cust_lname,
                a.emp_id, e.f_name as emp_fname, e.l_name as emp_lname, a.serv_id, s.name as serv_name, 
                sf.time as serv_time, sf.price as serv_price, a.room_id, r.name as room_name, a.shop_id, 
                sh.shop_name as shop_name, sh.location as shop_location, sh.contact as shop_contact,
                a.status, a.is_confirmed, p.id as payment_id, p.payment_meth_id, p.amount, p.datetime as pay_datetime, p.status, 
                pm.name as pay_meth
                FROM sale
                JOIN appointment as a on sale.appt_id = a.id
                JOIN customer AS c on a.cust_id = c.id
                JOIN vip_member As v on a.vip_id = v.id
                JOIN service_function AS sf on a.serv_id = sf.id
                JOIN service AS s on sf.serv_id = s.id
                JOIN employee AS e on a.emp_id = e.id
                JOIN room AS r on a.room_id = r.id
                JOIN shop AS sh on a.shop_id = sh.id
                JOIN payment as p on sale.id = p.sale_id
                LEFT JOIN payment_method as pm on p.payment_meth_id = pm.id
                where a.vip_id = ${input.id} and a.is_vip = 1 and sale.flag = 1 and a.flag = 1 OR p.payment_meth_id IS NULL`
    let result = await con.query(sql)
    return result;
};
exports.pay = async (input) => {
    let sql = ` UPDATE payment SET payment_meth_id=  "${input.payment_meth}", amount= "${input.amount}", 
                datetime= "${input.datetime}", status= "PAID" 
                WHERE sale_id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.vip_pay = async (input) => {
    let sql_vip = ` UPDATE vip_member SET acc_val= ${input.acc_val+input.use_val}, remain_val= ${input.remain_val-input.use_val} 
                    WHERE id = ${input.vip_id} and acc_val= ${input.acc_val} and remain_val= ${input.remain_val} `
    let result_vip = await con.query(sql_vip)
    if (result_vip.changedRows>0){
        let sql = ` UPDATE payment SET payment_meth_id=  "${input.payment_meth}", amount= "${input.vip_amount+input.use_val}", 
                    datetime= "${input.vip_datetime}", status= "PAID" 
                    WHERE sale_id = ${input.id_update} `
        let result = await con.query(sql)
    }
};