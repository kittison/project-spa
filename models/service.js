const con = require('../config/db_config.js')

// -------------------- Service groups--------------------
exports.get_service_group = async () => {
    let sql = `SELECT id, name FROM service_group where flag = 1;`
    let result = await con.query(sql)
    return result;
};

exports.get_service_group_byID = async (input) => {
    let sql = ` SELECT id, name FROM service_group WHERE id = ${input.id} and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_service_group = async (input) => {
    let sql = ` INSERT INTO service_group( name , flag) 
                VALUES ("${input.name}", 1);`
    let result = await con.query(sql)
};
exports.update_service_group = async (input) => {
    let sql = ` UPDATE service_group SET name=  "${input.Uname}"  WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_service_group = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service_group SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_service_group = async (input) => {
    let sql = ` SELECT * FROM service_group WHERE name = '${input.name}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_service_group = async (input) => {
    let sql = `SELECT * FROM service_group WHERE name = '${input.name}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Service types--------------------
exports.get_service_type = async () => {
    let sql = `SELECT id, name FROM service_type where flag = 1;`
    let result = await con.query(sql)
    return result;
};

exports.get_service_type_by_groupID = async (input) => {
    let sql = ` SELECT id, name FROM service_type WHERE group_id = ${input.id} and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.get_service_type_byID = async (input) => {
    let sql = ` SELECT id, name FROM service_type WHERE id = ${input.id}  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_service_type = async (input) => {
    let sql = ` INSERT INTO service_type( group_id, name, flag) 
                VALUES ("${input.group_id}", "${input.name}", 1);`
    let result = await con.query(sql)
};
exports.update_service_type = async (input) => {
    let sql = ` UPDATE service_type SET name=  "${input.Uname}" WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_service_type = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service_type SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_service_type = async (input) => {
    let sql = ` SELECT * FROM service_type WHERE name = '${input.name}' and group_id = '${input.group_id}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_service_type = async (input) => {
    let sql = `SELECT * FROM service_type WHERE name = '${input.name}' and id =${input.id} and group_id = '${input.group_id}' 
    and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Service --------------------

exports.get_service = async () => {
    let sql = `SELECT id, type_id, name, shop_ratio, emp_ratio FROM service where flag = 1;`
    let result = await con.query(sql)
    return result;
};
exports.get_service_byID = async (input) => {
    let sql = ` SELECT id, type_id, name, shop_ratio, emp_ratio FROM service WHERE id = ${input.id}  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.get_service_by_typeID = async (input) => {
    let sql = ` SELECT id, type_id, name, shop_ratio, emp_ratio FROM service WHERE type_id = ${input.id}  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_service = async (input) => {
    let sql = ` INSERT INTO service( type_id, name, shop_ratio, emp_ratio, flag) 
                VALUES ("${input.type_id}", "${input.name}", "${input.shop_ratio}", "${input.emp_ratio}", 1);`
    let result = await con.query(sql)
};
exports.update_service = async (input) => {
    let sql = ` UPDATE service SET name= "${input.Uname}", shop_ratio= "${input.Ushop_ratio}", emp_ratio= "${input.Uemp_ratio}" 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_service = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_service = async (input) => {
    let sql = ` SELECT * FROM service WHERE type_id = '${input.type_id}' and name = '${input.name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_service = async (input) => {
    let sql = `SELECT * FROM service WHERE type_id = '${input.type_id}' and name= '${input.name}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};


// -------------------- Service function --------------------

exports.get_serv_func_by_servID = async (input) => {
    let sql = ` SELECT sf.id, sf.serv_id, s.name, sf.time, sf.price
                FROM service as s
                JOIN service_function as sf ON s.id = sf.serv_id
                WHERE s.id = ${input.id} and sf.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_service_function = async (input) => {
    let sql = ` INSERT INTO service_function( serv_id, time, price, flag) 
                VALUES ("${input.serv_id}", "${input.time}", "${input.price}", 1);`
    let result = await con.query(sql)
};
exports.update_service_function = async (input) => {
    let sql = ` UPDATE service_function SET time= "${input.Utime}", price= "${input.Uprice}" 
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_service_function = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service_function SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_service_function = async (input) => {
    let sql = ` SELECT * FROM service_function WHERE serv_id = '${input.serv_id}' and 
                time = '${input.time}' and price = '${input.price}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_self_service_function = async (input) => {
    let sql = ` SELECT * FROM service_function WHERE serv_id = '${input.serv_id}' and 
                time = '${input.time}' and price = '${input.price}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};


// -------------------- Service product --------------------

exports.get_serv_prod_by_servFuncID = async (input) => {
    let sql = ` SELECT sp.id, p.id as prod_id, p.name as prod_name, sp.qty
                FROM service_product as sp
                JOIN product as p ON p.id = sp.prod_id
                WHERE sp.sv_func_id = ${input.id} and sp.flag = 1 and p.flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_service_product = async (input) => {
    let sql = ` INSERT INTO service_product( sv_func_id, prod_id, qty, flag) 
                VALUES ("${input.sv_func_id}", "${input.prod_id}", "${input.qty}", 1);`
    let result = await con.query(sql)
};
exports.update_service_product = async (input) => {
    let sql = ` UPDATE service_product SET qty= "${input.Uqty}" WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_service_product = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE service_product SET flag = 0 WHERE id = ${parseInt(input.id_del_product)}`
    let result = await con.query(sql)
};

exports.is_duplicate_service_product = async (input) => {
    let sql = ` SELECT * FROM service_product WHERE sv_func_id = ${input.sv_func_id} and prod_id = ${input.prod_id} and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};