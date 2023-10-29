const con = require('../config/db_config.js')

exports.get_cust = async () => {
    let sql = ` SELECT * FROM customer where flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_cust = async (input) => {
    let sql = ` INSERT INTO customer( f_name, l_name, gender, address, tel, email, cus_type, member_point, is_member, is_walkin, flag) 
                VALUES ("${input.f_name}", "${input.l_name}", "${input.gender}", "${input.address}", "${input.tel}", "${input.email}",
                "${input.type}", ${parseInt(input.point)}, 0, 0, 1);`
    let result = await con.query(sql)
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
