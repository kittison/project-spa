const model = require('../../models/vip');
const model_course = require('../../models/course');
const { createCharge, getCharge } = require('../../config/omiseHelp')

exports.Buy_vip = async (req, res) => {
    let data_course =  await model_course.get_course();
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
        // console.log(result)
        if( result !== undefined ){  
            if (result.error){
                res.send({error:result.error});
            }else if (result.amount/100 == req.body.course_price) {
                req.body.omise_id = result.id
                let pre_vip = await model.insert_pre_vip(req.body)
                // console.log(pre_vip)
                res.send({pre_vip_id:pre_vip});
            }
        }
        else{
            res.send({error:1,code:'ไม่พบข้อมูล'});
        }
    }else{
        res.redirect("/buy_vip");
    }
}

exports.Buy_vip_pending = async (req, res) => {
    if (!isNaN(parseInt(req.query.id))){
        let data_pre_vip =  await model.get_pre_vip({id: req.query.id});
        if (data_pre_vip.length > 0){
            let data_charge = await getCharge(data_pre_vip[0].omise_id)
            // console.log(data_charge)
            if (data_charge.error){
                res.redirect("/buy_vip");
            }else {
                if (data_charge.paid && data_pre_vip[0].vip_id != null){
                    res.redirect(`/activate_vip_password?id=${data_pre_vip[0].vip_id}`);
                }
                else{
                    res.render('template',{
                        session_role:"customer",
                        header:"Pending Buy Vip",
                        file:'customer_page/buy_vip_pending',
                        pre_vip_id:req.query.id,
                        qr_url:data_charge.source["scannable_code"]["image"]["download_uri"],
                        expired_date:data_charge.expires_at
                    });
                } 
            }
        }else{
            res.redirect("/buy_vip");
        }
    }else{
        res.redirect("/buy_vip");
    }
};

