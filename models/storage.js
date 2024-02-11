const con = require('../config/db_config.js')

// -------------------- Product Storage --------------------

exports.get_product = async () => {
    let sql = `SELECT p.id, p.type_id, pt.name as type, p.name, p.price, p.stock, p.min_stock, p.max_stock, p.can_used
                FROM product as p
                JOIN product_type as pt ON p.type_id = pt.id
                where p.flag = 1 and pt.flag = 1;`
    let result = await con.query(sql)
    return result;
};
exports.get_product_alert = async () => {
    let sql = ` SELECT p.id, p.type_id, pt.name as type, p.name, p.price, p.stock, p.min_stock, p.max_stock, p.can_used
                FROM product as p
                JOIN product_type as pt ON p.type_id = pt.id
                where (p.stock < p.min_stock or p.stock > max_stock) and p.flag = 1 and pt.flag = 1;`
    let result = await con.query(sql)
    return result;
};
exports.get_product_reuse = async () => {
    let sql = ` SELECT pr.id, pr.prod_id, p.name as prod_name, p.type_id, pt.name as type_name, p.can_used as max_used, pr.remaining
                FROM product as p
                JOIN product_type as pt ON p.type_id = pt.id
                JOIN product_reuse as pr ON p.id = pr.prod_id
                WHERE p.flag = 1 and pr.flag = 1 and pr.remaining > 0`
    let result = await con.query(sql)
    return result;
};
exports.get_product_reuse_list = async () => {
    let sql = ` SELECT p.id, p.type_id, pt.name as type, p.name, p.price, p.stock, p.min_stock, p.max_stock, p.can_used
                FROM product as p
                JOIN product_type as pt ON p.type_id = pt.id
                where p.flag = 1 and pt.flag = 1 and p.can_used > 1 and p.stock > 0  and p.flag = 1;`
    let result = await con.query(sql)
    return result;
};
exports.get_product_statistic = async (input) => {
    let sql = ` SELECT p.name AS product_name,
                SUM(CASE WHEN DATE(psh.date) = CURDATE() THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used_day,
                SUM(CASE WHEN YEARWEEK(psh.date, 1) = YEARWEEK(CURDATE(), 1) THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used_week,
                SUM(CASE WHEN YEAR(psh.date) = YEAR(CURDATE()) AND MONTH(psh.date) = MONTH(CURDATE()) THEN psh.old_qty - psh.new_qty ELSE 0 END) AS used_month
                FROM product p
                JOIN product_stock_history psh ON psh.prod_id = p.id
                WHERE (DATE(psh.date) = CURDATE() OR YEARWEEK(psh.date, 1) = YEARWEEK(CURDATE(), 1) OR (YEAR(psh.date) = YEAR(CURDATE()) AND MONTH(psh.date) = MONTH(CURDATE())))
                AND psh.prod_act_id IN (2, 4)
                AND psh.flag = 1
                AND p.flag = 1
                AND p.id = ${input.id}
                GROUP BY product_name;`
    let result = await con.query(sql)
    return result;
};

exports.update_stock = async (id,new_stock) => {
    let sql = ` UPDATE product SET stock= ${new_stock} WHERE id = ${id} `
    let result = await con.query(sql)
}

exports.record_history = async (prod_id, old_stock, new_stock, prod_act_id) => {
    let date = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
    const currentDate = new Date();
    // Format the Date object as a MySQL-compatible string
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    let sql = ` INSERT INTO product_stock_history( prod_id, date, old_qty, new_qty, prod_act_id, flag) 
                VALUES (${prod_id}, '${formattedDate}', ${old_stock}, ${new_stock},  ${prod_act_id}, 1);`
    let result = await con.query(sql)
}

exports.insert_product_reuse = async (input) => {
    let sql = ` INSERT INTO product_reuse( prod_id, remaining, flag) VALUES 
                (${input.prod_id}, ${input.can_used-1}, 1);`
    let result = await con.query(sql)
};
exports.update_product_reuse = async (input) => {
    let sql = ` UPDATE product_reuse SET remaining= "${input.Uremaining}" WHERE id = ${input.Uid} `
    let result = await con.query(sql)
};
exports.delete_product_reuse = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE product_reuse SET flag = 0 WHERE id = ${parseInt(input.id_del_reuse)}`
    let result = await con.query(sql)
};










