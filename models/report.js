const con = require('../config/db_config.js')
const formatDate = require('../config/formatDate.js')

exports.get_used_service = async () => {
    let sql = ` SELECT serv.id, serv.type_id, serv.name, serv.shop_ratio, serv.emp_ratio, 
                    SUM(CASE WHEN DATE(a.start_date) = CURDATE() AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_std,
                    SUM(CASE WHEN DATE(a.start_date) = CURDATE() AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_std,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK(CURDATE()) AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_vip,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK(CURDATE()) AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_vip,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR(CURDATE()) AND MONTH(a.start_date) = MONTH(CURDATE()) AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_all,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR(CURDATE()) AND MONTH(a.start_date) = MONTH(CURDATE()) AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_all
                FROM service serv 
                LEFT JOIN service_function sf ON sf.serv_id  = serv.id 
                LEFT JOIN appointment a ON sf.id  = a.serv_id  
                LEFT JOIN sale s ON a.id = s.appt_id  
                WHERE serv.flag = 1 
                GROUP BY serv.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_service_daily = async (daily) => {
    let sql = ` SELECT serv.id, serv.type_id, serv.name, serv.shop_ratio, serv.emp_ratio, 
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' and a.is_vip = 0 THEN 1 ELSE 0 END) AS count_std,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' and a.is_vip = 0 THEN s.total_price ELSE 0 END) AS amount_std,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' and a.is_vip = 1 THEN 1 ELSE 0 END) AS count_vip,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' and a.is_vip = 1 THEN s.total_price ELSE 0 END) AS amount_vip,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_all,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_all
                FROM service serv 
                LEFT JOIN service_function sf ON sf.serv_id  = serv.id 
                LEFT JOIN appointment a ON sf.id  = a.serv_id  
                LEFT JOIN sale s ON a.id = s.appt_id  
                WHERE serv.flag = 1 
                GROUP BY serv.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_service_weekly = async (weekly) => {
    let [year, week] = weekly.split('-W');
    let days = ((week - 1) * 7) + 1;
    let new_weekly = new Date(year, 0, days);
    let format_weekly = new_weekly.toISOString().split('T')[0];
    let sql = ` SELECT serv.id, serv.type_id, serv.name, serv.shop_ratio, serv.emp_ratio, 
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' and a.is_vip = 0 THEN 1 ELSE 0 END) AS count_std,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' and a.is_vip = 0 THEN s.total_price ELSE 0 END) AS amount_std,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' and a.is_vip = 1 THEN 1 ELSE 0 END) AS count_vip,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' and a.is_vip = 1 THEN s.total_price ELSE 0 END) AS amount_vip,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_all,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_all
                FROM service serv 
                LEFT JOIN service_function sf ON sf.serv_id  = serv.id 
                LEFT JOIN appointment a ON sf.id  = a.serv_id  
                LEFT JOIN sale s ON a.id = s.appt_id  
                WHERE serv.flag = 1 
                GROUP BY serv.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_service_monthly = async (monthly) => {
    let sql = ` SELECT serv.id, serv.type_id, serv.name, serv.shop_ratio, serv.emp_ratio, 
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' and a.is_vip = 0 THEN 1 ELSE 0 END) AS count_std,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' and a.is_vip = 0 THEN s.total_price ELSE 0 END) AS amount_std,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' and a.is_vip = 1 THEN 1 ELSE 0 END) AS count_vip,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' and a.is_vip = 1 THEN s.total_price ELSE 0 END) AS amount_vip,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count_all,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' THEN s.total_price ELSE 0 END) AS amount_all
                FROM service serv 
                LEFT JOIN service_function sf ON sf.serv_id  = serv.id 
                LEFT JOIN appointment a ON sf.id  = a.serv_id  
                LEFT JOIN sale s ON a.id = s.appt_id  
                WHERE serv.flag = 1 
                GROUP BY serv.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_daily = async (daily) => {
    let sql = ` SELECT p.id, p.name, p.price,
                    SUM(CASE WHEN DATE(psh.date) = "${daily}" AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN DATE(psh.date) = "${daily}" AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END)*p.price as expenses 
                FROM product p 
                LEFT JOIN product_stock_history psh ON psh.prod_id = p.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used = 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_weekly = async (weekly) => {
    let [year, week] = weekly.split('-W');
    let days = ((week - 1) * 7) + 1;
    let new_weekly = new Date(year, 0, days);
    let format_weekly = new_weekly.toISOString().split('T')[0];
    let sql = ` SELECT p.id, p.name, p.price, 
                    SUM(CASE WHEN YEARWEEK(psh.date) = YEARWEEK('${format_weekly}') AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN YEARWEEK(psh.date) = YEARWEEK('${format_weekly}') AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END)*p.price as expenses 
                FROM product p 
                LEFT JOIN product_stock_history psh ON psh.prod_id = p.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used = 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_monthly = async (monthly) => {
    let sql = ` SELECT p.id, p.name, p.price,
                    SUM(CASE WHEN YEAR(psh.date) = YEAR('${monthly}-01') AND MONTH(psh.date) = MONTH('${monthly}-01') AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN YEAR(psh.date) = YEAR('${monthly}-01') AND MONTH(psh.date) = MONTH('${monthly}-01') AND psh.prod_act_id = 2 THEN psh.old_qty - psh.new_qty ELSE 0 END)*p.price as expenses 
                FROM product p 
                LEFT JOIN product_stock_history psh ON psh.prod_id = p.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used = 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_reuse_daily = async (daily) => {
    let sql = ` SELECT p.id, p.name, p.price, p.can_used, 
                    SUM(CASE WHEN DATE(psh.date) = "${daily}" AND psh.prod_act_id = 4 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN DATE(psh.date) = "${daily}" AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END) AS outed,
                    SUM(CASE WHEN DATE(psh.date) = "${daily}" AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END)*p.price AS expenses
                FROM product p 
                JOIN product_reuse pr ON pr.prod_id = p.id
                LEFT JOIN product_stock_history psh ON psh.prod_id = pr.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used > 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_reuse_weekly = async (weekly) => {
    let [year, week] = weekly.split('-W');
    let days = ((week - 1) * 7) + 1;
    let new_weekly = new Date(year, 0, days);
    let format_weekly = new_weekly.toISOString().split('T')[0];
    let sql = ` SELECT p.id, p.name, p.price, p.can_used, 
                    SUM(CASE WHEN YEARWEEK(psh.date) = YEARWEEK('${format_weekly}') AND psh.prod_act_id = 4 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN YEARWEEK(psh.date) = YEARWEEK('${format_weekly}') AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END) AS outed,
                    SUM(CASE WHEN YEARWEEK(psh.date) = YEARWEEK('${format_weekly}') AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END)*p.price AS expenses
                FROM product p 
                JOIN product_reuse pr ON pr.prod_id = p.id
                LEFT JOIN product_stock_history psh ON psh.prod_id = pr.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used > 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_used_product_reuse_monthly = async (monthly) => {
    let sql = ` SELECT p.id, p.name, p.price, p.can_used, 
                    SUM(CASE WHEN YEAR(psh.date) = YEAR('${monthly}-01') AND MONTH(psh.date) = MONTH('${monthly}-01') AND psh.prod_act_id = 4 THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used,
                    SUM(CASE WHEN YEAR(psh.date) = YEAR('${monthly}-01') AND MONTH(psh.date) = MONTH('${monthly}-01') AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END) AS outed,
                    SUM(CASE WHEN YEAR(psh.date) = YEAR('${monthly}-01') AND MONTH(psh.date) = MONTH('${monthly}-01') AND psh.prod_act_id = 4 and psh.new_qty = 0 THEN 1 ELSE 0 END)*p.price AS expenses
                FROM product p 
                JOIN product_reuse pr ON pr.prod_id = p.id
                LEFT JOIN product_stock_history psh ON psh.prod_id = pr.id
                WHERE psh.flag = 1
                AND p.flag = 1
                AND p.can_used > 1
                GROUP BY p.id`
    let result = await con.query(sql)
    return result;
};

exports.get_work_employee_daily = async (daily) => {
    let sql = ` SELECT e.id, e.f_name, e.l_name, e.n_name, 
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count,
                    SUM(CASE WHEN DATE(a.start_date) = "${daily}" AND a.status = 'Completed' THEN s.total_price*s2.shop_ratio/100 ELSE 0 END) AS amount
                FROM employee e 
                LEFT JOIN appointment a ON e.id  = a.emp_id  
                LEFT JOIN sale s ON a.id = s.appt_id 
                LEFT JOIN service_function sf ON a.serv_id = sf.id 
                LEFT JOIN service s2 ON sf.serv_id = s2.id 
                WHERE e.flag = 1 and e.emp_type_id > 1
                GROUP BY e.id`
    let result = await con.query(sql)
    return result;
};

exports.get_work_employee_weekly = async (weekly) => {
    let [year, week] = weekly.split('-W');
    let days = ((week - 1) * 7) + 1;
    let new_weekly = new Date(year, 0, days);
    let format_weekly = new_weekly.toISOString().split('T')[0];
    let sql = ` SELECT e.id, e.f_name, e.l_name, e.n_name, 
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK('${format_weekly}') AND a.status = 'Completed' THEN s.total_price*s2.shop_ratio/100 ELSE 0 END) AS amount
                FROM employee e 
                LEFT JOIN appointment a ON e.id  = a.emp_id  
                LEFT JOIN sale s ON a.id = s.appt_id 
                LEFT JOIN service_function sf ON a.serv_id = sf.id 
                LEFT JOIN service s2 ON sf.serv_id = s2.id 
                WHERE e.flag = 1 and e.emp_type_id > 1
                GROUP BY e.id`
    let result = await con.query(sql)
    return result;
};

exports.get_work_employee_monthly = async (monthly) => {
    let sql = ` SELECT e.id, e.f_name, e.l_name, e.n_name, 
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' THEN 1 ELSE 0 END) AS count,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR('${monthly}-01') AND MONTH(a.start_date) = MONTH('${monthly}-01') AND a.status = 'Completed' THEN s.total_price*s2.shop_ratio/100 ELSE 0 END) AS amount
                FROM employee e 
                LEFT JOIN appointment a ON e.id  = a.emp_id  
                LEFT JOIN sale s ON a.id = s.appt_id 
                LEFT JOIN service_function sf ON a.serv_id = sf.id 
                LEFT JOIN service s2 ON sf.serv_id = s2.id 
                WHERE e.flag = 1 and e.emp_type_id > 1
                GROUP BY e.id`
    let result = await con.query(sql)
    return result;
};

exports.get_summary_sale = async (start_date,end_date) => {
    let sql = ` SELECT DATE(s.datetime) AS date, COUNT(s.id) as count_sale,
                    SUM(s.total_price) AS total_sale,
                    SUM(sf.price*s2.shop_ratio/100) as total_employee_wage,
                    SUM(sp.qty*(p.price/p.can_used)) as total_product_price
                FROM sale s 
                JOIN appointment a ON a.id = s.appt_id 
                JOIN service_function sf ON sf.id = a.serv_id 
                JOIN service s2 ON s2.id = sf.serv_id 
                JOIN employee e ON e.id = a.emp_id 
                LEFT JOIN service_product sp ON sp.sv_func_id = sf.id 
                LEFT JOIN product p ON p.id = sp.prod_id 
                WHERE s.datetime BETWEEN '${start_date}' AND '${end_date}' AND s.flag = 1 AND sp.flag = 1
                GROUP BY DATE(s.datetime)
                ORDER BY date`
    let result = await con.query(sql)
    return result;
};

