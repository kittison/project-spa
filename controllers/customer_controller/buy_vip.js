const model = require('../../models/course');
const createCharge = require('../../config/createCharge')

exports.Buy_vip = async (req, res) => {
    let data_course =  await model.get_course();
    res.render('template',{
        session_role:"customer",
        header:"Buy Vip",
        file:'customer_page/buy_vip',
        data_course: data_course
    });
};

exports.setBuyVip =async (req, res) => {
    if(req.params.action === "create_charge"){
        let result = await createCharge(req.body.course_price);
        console.log(result)
        if( result !== undefined ){  
            if (result.error){
                res.send({error:1,code:error});
            }
            else{
                res.send(result);
            }
        }
        else{
            res.send({error:1,code:'ไม่พบข้อมูล'});
        }
    }else{
        res.redirect("/buy_vip");
    }
}

exports.create_charge = async (req, res) => {
    let result = await createCharge(req.body);
    console.log(result) 
}