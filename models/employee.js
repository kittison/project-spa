const con = require('../config/db_config.js')
const formatDate = require('../config/formatDate.js')

exports.get_emp = async () => {
    let sql = ` SELECT em.id,em.f_name,em.l_name,em.n_name,em.address,em.tel,em.date_start,em.date_end,em.bank_account,em.wage,
                em.is_service,em.emp_type_id,em_type.name as emp_type,em.job_level_id,job_level.description, job_level.responsibilities  
                FROM employee em , employee_type em_type, job_level
                where em_type.id = em.emp_type_id and job_level.id = em.job_level_id and em.flag = 1`
    let result = await con.query(sql)
    return result;
};
exports.get_emp_service = async () => {
    let sql = ` SELECT em.id,em.f_name,em.l_name,em.n_name,em.address,em.tel,em.date_start,em.date_end,em.bank_account,em.wage,
                em.is_service,em.emp_type_id,em_type.name as emp_type,em.job_level_id,job_level.description, job_level.responsibilities  
                FROM employee em , employee_type em_type, job_level
                where em.job_level_id != 1 and em_type.id = em.emp_type_id and job_level.id = em.job_level_id and em.flag = 1`
    let result = await con.query(sql)
    return result;
};
exports.get_position = async () => {
    let sql = ` SELECT * FROM employee_type where flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.get_level = async () => {
    let sql = ` SELECT * FROM job_level where flag = 1`
    let result = await con.query(sql)
    return result;
};

exports.insert_emp = async (input) => {
    let sql = ` INSERT INTO employee( f_name, l_name, n_name, address, tel, username, password, date_start, date_end, bank_account, wage,
                emp_type_id, job_level_id, is_service,  flag_login, flag) 
                VALUES ("${input.f_name}", "${input.l_name}", "${input.n_name}", "${input.address}", "${input.tel}","${input.username}", "",
                "${input.date_start}", ${input.date_end!==''?`"${input.date_end}"`:'NULL'}, "${input.bank_account}", ${input.wage}, 
                ${input.position}, ${input.level}, 0, 0, 1);`
    let result = await con.query(sql)
};
exports.update_emp = async (input) => {
    let sql = ` UPDATE employee SET f_name="${input.Uf_name}", l_name="${input.Ul_name}", n_name="${input.Un_name}", 
                address="${input.Uaddress}", tel= "${input.Utel}", date_start="${input.Udate_start}", 
                ${input.Udate_end!=''?`date_end="${input.Udate_end},`:""} 
                bank_account="${input.Ubank_account}", wage=${input.Uwage}, emp_type_id=${input.Uposition}, job_level_id=${input.Ulevel}
                WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_emp = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE employee SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name = async (input) => {
    let sql = ` SELECT * FROM employee WHERE f_name = '${input.f_name}' and l_name = '${input.l_name}' or username = '${input.username}'  and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self = async (input) => {
    let sql = `SELECT * FROM employee WHERE id = ${input.id} and f_name = '${input.f_name}' and l_name = '${input.l_name}' or username = '${input.username}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

exports.insert_emp_type = async (input) => {
    let sql = ` INSERT INTO employee_type( name, flag) 
                VALUES ("${input.name}", 1);`
    let result = await con.query(sql)
};
exports.update_emp_type = async (input) => {
    let sql = ` UPDATE employee_type SET name="${input.Uname}" WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_emp_type = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE employee_type SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_type = async (input) => {
    let sql = ` SELECT * FROM employee_type WHERE name = '${input.name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_type = async (input) => {
    let sql = `SELECT * FROM employee_type WHERE id = ${input.id} and name = '${input.name}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

exports.insert_job_level = async (input) => {
    let sql = ` INSERT INTO job_level( description, responsibilities, flag) 
                VALUES ("${input.description}", "${input.responsibilities}", 1);`
    let result = await con.query(sql)
};
exports.update_job_level = async (input) => {
    let sql = ` UPDATE job_level SET description="${input.Udescription}" , responsibilities="${input.Uresponsibilities}" 
    WHERE id = ${input.id_update} `
    let result = await con.query(sql)
};
exports.delete_job_level = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE job_level SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};

exports.is_duplicate_name_level = async (input) => {
    let sql = ` SELECT * FROM job_level WHERE description = '${input.description}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};
exports.is_duplicate_name_self_level = async (input) => {
    let sql = `SELECT * FROM job_level WHERE id = ${input.id} and description = '${input.description}' and flag = 1 `
    let result = await con.query(sql)
    if( result.length > 0 ){
        return true;
    }else{
        return false;
    }
};

exports.get_emp_queue = async () => {
    let sql = ` SELECT em_q.id, em_q.number, em.id as emp_id, em.f_name, em.l_name, em.n_name, em_q.created_date, em_q.status
                FROM employee_queue em_q
                JOIN employee em ON em_q.emp_id = em.id
                where em.emp_type_id != 1 and em.flag = 1 and em_q.flag = 1 and em_q.status = 0
                ORDER BY em_q.number asc`
    let result = await con.query(sql)
    return result;
};

exports.get_emp_work = async () => {
    const now = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}))
    const format = formatDate(now)
    
    // console.log(format)
    let sql = ` SELECT
                    e.id, e.f_name, e.l_name, e.n_name, e.is_service,
                    SUM(CASE WHEN DATE(a.start_date) = CURDATE() AND a.status = 'Completed' THEN 1 ELSE 0 END) AS daily_completed_count,
                    SUM(CASE WHEN YEARWEEK(a.start_date) = YEARWEEK(CURDATE()) AND a.status = 'Completed' THEN 1 ELSE 0 END) AS weekly_completed_count,
                    SUM(CASE WHEN YEAR(a.start_date) = YEAR(CURDATE()) AND MONTH(a.start_date) = MONTH(CURDATE()) AND a.status = 'Completed' THEN 1 ELSE 0 END) AS monthly_completed_count,
                    MAX(onprocess_appointment.onprocess_id) as onprocess_id,
                    MAX(onprocess_appointment.onprocess_start_date) as onprocess_start_date,
                    MAX(onprocess_appointment.onprocess_end_date) as onprocess_end_date
                FROM
                    employee e
                LEFT JOIN appointment a ON
                    e.id = a.emp_id
                    AND a.flag = 1
                LEFT JOIN (
                    SELECT
                        appt.id as onprocess_id,
                        appt.start_date as onprocess_start_date,
                        appt.end_date as onprocess_end_date,
                        appt.emp_id
                    FROM
                        appointment appt
                    WHERE
                        appt.status = 'Onprocess'
                        AND "${format}" > appt.start_date 
                        AND appt.flag = 1
                    ORDER BY
                        appt.start_date DESC
                    LIMIT 1
                ) onprocess_appointment ON
                    e.id = onprocess_appointment.emp_id
                WHERE
                    e.emp_type_id != 1
                    AND e.flag = 1
                GROUP BY e.id`
                
    let result = await con.query(sql)
    result.now = format
    return result;
};
exports.insert_emp_queue = async (input) => {
    let date = formatDate(new Date())
    let queue = await con.query(`SELECT max(number) as max_number FROM employee_queue`)
    let sql = ` INSERT INTO employee_queue( emp_id, number, created_date, status, flag) 
                VALUES (${input.emp_id}, ${queue[0].max_number!=null?queue[0].max_number:1}, "${date}", 0, 1);`
    let result = await con.query(sql)
};
exports.update_emp_queue = async (input) => {
    let sql = ` UPDATE employee_queue SET emp_id=${input.emp_id}, number=${input.number} 
                WHERE id = ${input.id} `
    let result = await con.query(sql)
};
exports.delete_emp_queue = async (input) => {
    // Set flag to 0
    let sql = ` UPDATE employee_queue SET flag = 0 WHERE id = ${parseInt(input.id_del)}`
    let result = await con.query(sql)
};
exports.get_emp_no_queue = async () => {
    let sql = ` SELECT em.id,em.f_name,em.l_name,em.n_name,em_type.name as emp_type,em.job_level_id,
                    job_level.description, job_level.responsibilities
                    FROM employee em 
                    JOIN employee_type em_type ON em_type.id = em.emp_type_id
                    JOIN job_level ON job_level.id = em.job_level_id
                    LEFT JOIN employee_queue eq ON eq.emp_id = em.id
                    where em.flag = 1 and em.emp_type_id != 1 and ISNULL(eq.id) 
                UNION 
                SELECT em.id,em.f_name,em.l_name,em.n_name,em_type.name as emp_type,em.job_level_id,
                    job_level.description, job_level.responsibilities
                    FROM employee em 
                    JOIN employee_type em_type ON em_type.id = em.emp_type_id
                    JOIN job_level ON job_level.id = em.job_level_id
                    JOIN (
                        SELECT em.id, max(eq.flag) as flag
                        FROM employee em 
                        JOIN employee_queue eq ON eq.emp_id = em.id
                        where em.flag = 1 and em.emp_type_id != 1 
                        GROUP BY em.id
                    ) eq ON eq.id = em.id AND eq.flag = 0
                ORDER BY id  `
    let result = await con.query(sql)
    return result;
};