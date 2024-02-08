const con = require('../config/db_config.js')

exports.get_vip = async () => {
    let sql = ` SELECT v.*, c.f_name, c.l_name, sc.name as course_name FROM vip_member as v 
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
