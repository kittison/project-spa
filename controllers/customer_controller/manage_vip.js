const model = require('../../models/vip');
const model_shop = require('../../models/shop');
const model_course = require('../../models/course');
const model_appt = require('../../models/appointment');

exports.Manage_vip = async (req, res) => {
    let data_shop =  await model_shop.get_shop();
    let data_service =  [];
    let data_appt =  [];
    let data_vip
    if (req.session.vip_id) {
        data_vip = await model.get_vip_data({id:req.session.vip_id});
        data_service = await model_course.get_course_service({id:data_vip.course_id});
        data_appt = await model_appt.get_appt_vip_byID({id:data_vip.id});
    }
    res.render('template',{
        session_vip_id:req.session.vip_id,
        session_role:"customer",
        header:"Manage Vip",
        file:'customer_page/manage_vip',
        data_shop: data_shop,
        data_service: data_service,
        data_employee: [],
        data_room: [],
        datetime: null,
        data_vip: data_vip,
        data_appt: data_appt,
    });
};

exports.vertify = async (req, res) => {
    if(req.body.id && req.body.pwd ){
        let result = await model.vertify_vip(req.body);
        if( result !== undefined ){  
            req.session.vip_id = result.id;
            res.send(result);
        }else{
            res.send({error:1,code:'ไม่พบข้อมูล'});
        }
    }else{
        res.send({error:1,code:'ข้อมูลไม่ครบ'});
    }
        
};

exports.closeCard = async (req, res) => {
    req.session.destroy(function(err){
        res.send(err);
    });
};

exports.setManageVip =async (req, res) => {
    if(req.params.action === "vertify"){
        if(req.body.id && req.body.pwd ){
            let result = await model.vertify_vip(req.body);
            if( result !== undefined ){  
                req.session.vip_id = result.id;
                res.send(result);
            }else{
                res.send({error:1,code:'ไม่พบข้อมูล'});
            }
        }
    }else if(req.params.action === "close_card"){
        req.session.destroy(function(err){
            res.send(err);
        });
    }else if(req.params.action === "add_appointment"){
        let serv_split = req.body.serv_data.split('_')
        let serv_time = serv_split[1];
        req.body.serv_id = serv_split[0];
        const date = new Date(req.body.start_date);
        date.setMinutes(date.getMinutes() + parseInt(serv_time));
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        req.body.end_date = formattedDate
        await model_appt.insert_appt_vip(req.body).then((data)=>{return data});
        res.redirect(`../manage_vip`);
    }else if(req.params.action === "update_appointment"){
        let serv_split = req.body.Userv_data.split('_')
        let serv_time = serv_split[1];
        req.body.Userv_id = serv_split[0];
        const date = new Date(req.body.Ustart_date);
        date.setMinutes(date.getMinutes() + parseInt(serv_time));
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        req.body.Uend_date = formattedDate
        await model_appt.update_appt(req.body).then((data)=>{return data});
        res.redirect(`../manage_vip`);
    }else if(req.params.action === "cancel_appointment"){
        await model_appt.cancel_appt(req.body).then((data)=>{return data});
        res.redirect("../manage_vip");
    }else{
        res.redirect("/customer");
    }
};