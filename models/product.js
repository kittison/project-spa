const con = require('../config/db_config.js')

// -------------------- Product groups--------------------
exports.get_product_type = async () => {
    let sql = `SELECT id, name, refill_by FROM product_type where flag = 1;`
    let result = await con.query(sql)
    return result;
};

exports.get_product_type_byID = async (input) => {

    let sql = ` SELECT id, name, refill_by FROM product_type WHERE id = '${input.id}'  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_product_type = async (input) => {
    let sql = ` INSERT INTO product_type( name, refill_by, flag) 
                VALUES ("${input.name}", "${input.name}", 1);`
    let result = await con.query(sql)
};
exports.update_product_type = async (input) => {
    let sql = ` UPDATE product_type SET name=  "${input.Uname}", refill_by= "${input.Urefill_by}"  WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_product_type = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE product_type SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_product_type = async (input) => {
    let sql = ` SELECT * FROM product_type WHERE name = '${input.name}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_product_type = async (input) => {
    let sql = `SELECT * FROM product_type WHERE name = '${input.name}' and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Product --------------------

exports.get_product = async () => {
    let sql = `SELECT id, type_id, name, price, stock, min_stock, max_stock, can_used FROM product where flag = 1;`
    let result = await con.query(sql)
    return result;
};
exports.get_product_by_typeID = async (input) => {
    let sql = ` SELECT id, type_id, name, price, stock, min_stock, max_stock, can_used FROM product WHERE type_id = '${input.id}'  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_product = async (input) => {
    let sql = ` INSERT INTO product( type_id, name, price, stock, min_stock, max_stock, can_used, flag) 
                VALUES ("${input.type_id}", "${input.name}", ${input.price}, 0, ${input.min_stock}, ${input.max_stock}, 
                ${input.can_used}, 1);`
    let result = await con.query(sql)
};
exports.update_product = async (input) => {
    let sql = ` UPDATE product SET name=  "${input.Uname}", price= ${input.Uprice}, 
                min_stock= ${input.Umin_stock}, max_stock= ${input.Umax_stock}, can_used= ${input.Ucan_used}  
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_product = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE product SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_product = async (input) => {
   
    let sql = ` SELECT * FROM product WHERE name = '${input.name}' and type_id= ${input.type_id} and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_product = async (input) => {
    let sql = `SELECT * FROM product WHERE name = '${input.name}' and type_id= ${input.type_id} and id =${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};





// -------------------- Product category --------------------
exports.get_menu_category = async () => {
    let sql = `SELECT * FROM menu_category where flag = 1;`
    let result = await con.query(sql)
    return result;
};

exports.get_menu_category_byID = async (input) => {

    let sql = ` SELECT * FROM menu_category WHERE id = '${input.id}'  and flag = 1 `
    let result = await con.query(sql)
    return result;
};
exports.insert_category = async (input) => {
    let sql = ` INSERT INTO menu_category( category_name , flag) 
                VALUES ("${input.type_name}", 1);`
    let result = await con.query(sql)
};
exports.update_category = async (input) => {
    let sql = ` UPDATE menu_category SET category_name=  "${input.Utype_name}"   WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_category = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE menu_category SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_category = async (input) => {
   
    let sql = ` SELECT * FROM menu_category WHERE category_name = '${input.type_name}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_id_category = async (input) => {
  

    let sql = `SELECT * FROM menu_category WHERE category_name = '${input.Utype_name}' and id !=${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

// -------------------- Product Item --------------------

exports.get_product_item_by_id = async (input) => {
    let sql = `SELECT * FROM menu_list WHERE menu_category_id = '${input.id}' and  flag = 1  `
    let result = await con.query(sql)
    return result;
};
exports.insert_product_item = async (input) => {
    let sql = ` INSERT INTO menu_list( menu_name , menu_category_id , flag) 
                VALUES ("${input.product_name}",${parseInt(input.category_id)}, 1);`
    let result = await con.query(sql)
};
exports.update_product_item = async (input) => {
    let sql = ` UPDATE menu_list SET menu_name=  "${input.Uproduct_name}"   WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_product_item = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE menu_list SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};


// ========================================= Itme : time/price =========================================
exports.get_product_cost_by_id = async (input) => {
    // id : menu_list_id
    let sql = `SELECT * FROM menu_cost WHERE menu_list_id = ${input.id} and  flag = 1  `
    let result = await con.query(sql)
    return result;
};
exports.insert_product_cost = async (input) => {
    // menuID , time , price , flag

    let sql = ` INSERT INTO menu_cost( menu_list_id, time, price, flag) 
                VALUES (${input.cost_id} , "${input.cost_time}" , ${input.cost_price} , 1);`

    let result = await con.query(sql)
};
exports.delete_product_cost = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE menu_cost SET flag = 0 WHERE id = ${parseInt(input.id_cost)}`
    let result = await con.query(sql)
};
// ========================================= Itme : time/price =========================================





exports.is_duplicate_name_product_item = async (input) => {
    let sql = ` SELECT * FROM menu_list WHERE menu_name = '${input.product_name}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_id_product_item = async (input) => {
  

    let sql = `SELECT * FROM menu_list WHERE menu_name = '${input.Uproduct_name}' and id !=${input.id}  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};









