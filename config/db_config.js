const mysql = require('mysql2');
const util = require('util');


const pool = mysql.createPool({
    connectionLimit:10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "spashop"
})
pool.getConnection((err,connection)=>{
    console.log(err)
    if(err) throw err
    if(connection)connection.release()
    return
})

pool.query = util.promisify(pool.query);

module.exports = pool












/*

const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/SpaShop');
}
main().catch(err => console.log(err));
mongoose.set('strictQuery', false);


const employee = new mongoose.Schema({
    _id:Number,
    Emp_FName : String ,
    Emp_LName : String ,
    Emp_Address : String ,
    Emp_Email : String ,
    Emp_Tel : String ,
    Emp_Username : String ,
    Emp_Password : String ,
    Emp_Flag_login : Number ,
    Emp_Flag : Number ,
    Position_id : Number ,
});

const employee_position = new mongoose.Schema({
    _id:Number,
    name : String ,
});



module.exports.Emp_Model = mongoose.model('Employee', employee);
module.exports.Emp_posiiton_Model = mongoose.model('Employee_position', employee_position);
// module.exports.mongoose =  mongoose;
// exports.connection = connection;

*/