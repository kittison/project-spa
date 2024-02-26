const con = require('../config/db_config.js')
const sha = require('../config/encrypt');
const formatDate = require('../config/formatDate.js');

exports.vertify_vip = async (input) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    let sql = ` SELECT v.id, v.cust_id, v.serv_course_id, v.join_date, v.expire_date, v.acc_val, v.remain_val FROM vip_member as v 
                where v.id = ${input.id} and v.password = '${sha.encrypt(input.pwd)}' and
                v.join_date <= '${formattedDate}' and v.expire_date >= '${formattedDate}' and v.flag = 1 `
    let result = await con.query(sql)
    // console.log(result);
    if( result.length > 0 ){
        return result[0];
    }else{
        return undefined;
    }
};

exports.get_vip = async () => {
    let sql = ` SELECT v.id, v.cust_id, v.serv_course_id, v.join_date, v.expire_date, v.acc_val, v.remain_val, 
                c.f_name, c.l_name, c.gender, c.address, c.tel, c.email, sc.name as course_name FROM vip_member as v 
                JOIN customer as c on v.cust_id = c.id 
                JOIN service_course as sc on v.serv_course_id = sc.id
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

exports.get_vip_data = async (input) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    let sql = ` SELECT v.id, v.cust_id, v.serv_course_id, v.join_date, v.expire_date, v.acc_val, v.remain_val, 
                c.f_name, c.l_name, c.gender, c.address, c.tel, c.email, 
                v.serv_course_id as course_id, sc.name as course_name, sc.price as course_price
                FROM vip_member as v 
                JOIN customer as c on v.cust_id = c.id 
                JOIN service_course as sc on v.serv_course_id = sc.id
                where v.id = ${input.id} and v.join_date <= '${formattedDate}' and v.expire_date >= '${formattedDate}' 
                and v.flag = 1 and c.flag = 1 and sc.flag = 1`
    let result = await con.query(sql)
    if (result.length > 0){
        return result[0]
    }
    else{
        return null
    }
};

exports.insert_vip = async (input) => {
    let sql = ` INSERT INTO vip_member( cust_id, serv_course_id, join_date, expire_date, service_times, acc_val, remain_val, password, flag) 
                VALUES (${input.cust_id}, ${input.course_id}, "${input.join_date}", "${input.expire_date}", 0, ${input.acc_val}, 
                ${input.remain_val}, "", 1);`
    let result = await con.query(sql)
    let sql2 = ` UPDATE customer SET is_member = 1 WHERE id = ${input.cust_id} `
    await con.query(sql2)
    return result.insertId
};
exports.update_vip = async (input) => {
    let sql = ` UPDATE vip_member SET serv_course_id= ${input.Ucourse_id}, join_date= "${input.Ujoin_date}", 
                expire_date= "${input.Uexpire_date}", acc_val= ${input.Uacc_val}, remain_val= ${input.Uremain_val} 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_vip = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE vip_member SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.get_vip_appointment = async (input) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    let sql = ` SELECT v.id, v.cust_id, v.serv_course_id, v.join_date, v.expire_date, v.acc_val, v.remain_val, 
                c.f_name, c.l_name, c.gender, c.address, c.tel, c.email, 
                v.serv_course_id as course_id, sc.name as course_name, sc.price as course_price
                FROM vip_member as v 
                JOIN customer as c on v.cust_id = c.id 
                JOIN service_course as sc on v.serv_course_id = sc.id
                where v.id = ${input.id} and v.join_date <= '${formattedDate}' and v.expire_date >= '${formattedDate}' 
                and v.flag = 1 and c.flag = 1 and sc.flag = 1`
    let result = await con.query(sql)
    if (result.length > 0){
        return result[0]
    }
    else{
        return null
    }
};

exports.get_pre_vip = async (input) => {
    let sql = ` SELECT * FROM pre_vip_member where id = ${input.id} and flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_pre_vip_by_omise = async (input) => {
    let sql = ` SELECT * FROM pre_vip_member where omise_id = "${input.id}" and price = ${input.amount} and flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_pre_vip = async (input) => {
    let now = formatDate(new Date())
    let sql = ` INSERT INTO pre_vip_member( vip_id, created_date, serv_course_id, f_name, l_name, gender, address, tel, email, 
                price, omise_id, flag) 
                VALUES (NULL, "${now}", ${input.course_id}, "${input.f_name}", "${input.l_name}", "${input.gender}", 
                "${input.address}", "${input.tel}", "${input.email}", "${input.course_price}", "${input.omise_id}", 1);`
    let result = await con.query(sql)
    return result.insertId
};

exports.update_pre_vip = async (input) => {
    let sql = ` UPDATE pre_vip_member SET vip_id= ${input.vip_id} WHERE id = ${input.id} `
    let result = await con.query(sql)
};
exports.update_vip_password = async (input) => {
    let sql = ` UPDATE vip_member SET password= '${sha.encrypt(input.pwd)}' WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};

exports.check_activate_pwd = async (input) => {
    let sql = ` SELECT * from vip_member where id= ${input.id} and password = '' and flag = 1`
    let result = await con.query(sql)
    return result.length > 0;
}