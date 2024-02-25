
const model = require('../../models/appointment');
const model_shop = require('../../models/shop');
const model_serv= require('../../models/service');
const model_cust = require('../../models/customer');
const model_vip = require('../../models/vip');
const model_course = require('../../models/course');
const model_sale = require('../../models/sale');
const model_storage = require('../../models/storage');


exports.Manage_appointment = async (req, res) => {
    if( req.session.role === "admin" ){
        let db_appt_standard =  await model.get_appt_standard();
        let db_appt_vip =  await model.get_appt_vip();
        let db_shop =  await model_shop.get_shop();
        let db_service =  await model_serv.get_service_and_func();
        for (i of db_appt_standard) {
            i.product = await model_serv.get_serv_prod_by_servFuncID({id:i.serv_id});
        }
        for (i of db_appt_vip) {
            i.product = await model_serv.get_serv_prod_by_servFuncID({id:i.serv_id});
        }
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            db_shop: db_shop,
            db_appt_standard:db_appt_standard,
            db_appt_vip:db_appt_vip,
            db_service:db_service,
            db_employee: [],
            db_room: [],
            datetime_appt:null,
            datetime_appt_vip:null,
            header:"Manage Appointment",
            file:'admin_page/manage_appointment'
        });
    }else{
        res.redirect('/admin');
    }

};


exports.setAppointment =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "vip_add"){
            let serv_split = req.body.serv_data_vip.split('_')
            let serv_time = serv_split[1];
            const date = new Date(req.body.start_date_vip);
            date.setMinutes(date.getMinutes() + parseInt(serv_time));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const data = {
                vip_id: req.body.vip_id,
                cust_id: req.body.cust_id_vip,
                start_date: req.body.start_date_vip,
                end_date: formattedDate,
                serv_id: serv_split[0],
                shop_id: req.body.shop_id_vip,
                emp_id: req.body.emp_id_vip,
                room_id: req.body.room_id_vip
            }
            await model.insert_appt_vip(data).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "vip_update"){
            let serv_split = req.body.Userv_data_vip.split('_')
            let serv_time = serv_split[1];
            const date = new Date(req.body.Ustart_date_vip);
            date.setMinutes(date.getMinutes() + parseInt(serv_time));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const data = {
                id_update: req.body.id_update_vip,
                Ustart_date: req.body.Ustart_date_vip,
                Uend_date: formattedDate,
                Userv_id: serv_split[0],
                Ushop_id: req.body.Ushop_id_vip,
                Uemp_id: req.body.Uemp_id_vip,
                Uroom_id: req.body.Uroom_id_vip,
                Ustatus: req.body.Ustatus_vip,
                Uconfirmed: req.body.Uconfirmed_vip,
            }
            await model.update_appt_by_admin(data).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "std_update"){
            let serv_split = req.body.Userv_data_std.split('_')
            let serv_time = serv_split[1];
            const date = new Date(req.body.Ustart_date_std);
            date.setMinutes(date.getMinutes() + parseInt(serv_time));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const data = {
                id_update: req.body.id_update_std,
                Ustart_date: req.body.Ustart_date_std,
                Uend_date: formattedDate,
                Userv_id: serv_split[0],
                Ushop_id: req.body.Ushop_id_std,
                Uemp_id: req.body.Uemp_id_std,
                Uroom_id: req.body.Uroom_id_std,
                Ustatus: req.body.Ustatus_std,
                Uconfirmed: req.body.Uconfirmed_std,
            }
            await model.update_appt_by_admin(data).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "old_add"){
            let serv_split = req.body.serv_data_old.split('_')
            let serv_time = serv_split[1];
            const date = new Date(req.body.start_date_old);
            date.setMinutes(date.getMinutes() + parseInt(serv_time));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const data = {
                cust_id: req.body.cust_id_old,
                start_date: req.body.start_date_old,
                end_date: formattedDate,
                serv_id: serv_split[0],
                shop_id: req.body.shop_id_old,
                emp_id: req.body.emp_id_old,
                room_id: req.body.room_id_old
            }
            await model.insert_appt(data).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "new_add"){
            let serv_split = req.body.serv_data_new.split('_')
            let serv_time = serv_split[1];
            req.body.serv_id = serv_split[0];
            const date = new Date(req.body.start_date_new);
            date.setMinutes(date.getMinutes() + parseInt(serv_time));
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            const data = {
                start_date: req.body.start_date_new,
                end_date: formattedDate,
                serv_id: serv_split[0],
                shop_id: req.body.shop_id_new,
                emp_id: req.body.emp_id_new,
                room_id: req.body.room_id_new
            }
            let search = await model_cust.search_cust(req.body);
            if (search.length == 0){
                req.body.type = "ทั่วไป";
                req.body.point = 0;
                console.log(req.body)
                let new_cust_id = await model_cust.insert_cust(req.body);
                data.cust_id = new_cust_id
                await model.insert_appt(data).then((data)=>{return data});
                res.redirect("../manage_appointment");
            }
            else{
                data.cust_id = search[0].id
                await model.insert_appt(data).then((data)=>{return data});
                res.redirect("../manage_appointment");
            }
        }else if(req.params.action === "cancel"){
            await model.cancel_appt(req.body).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "delete"){
            await model.delete_appt(req.body).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "serve"){
            await model.serve_appt(req.body).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else if(req.params.action === "sale"){
            const appt = await model.get_appt_by_admin({id:req.body.Sappt_id})
            const products = await model_serv.get_serv_prod_by_servFuncID({id:appt[0].serv_id})
            const data = {
                appt_id:req.body.Sappt_id,
                emp_id:appt[0].emp_id,
                datetime:req.body.Sdatetime,
                price:req.body.Sprice,
            }
            // console.log('#',products)
            for (let product of products){
                // console.log('##',product)
                if (product.prod_can_used > 1){
                    let qty = product.qty;
                    let split = req.body[`reuse_${product.prod_id}`].split(",")
                    for (i of split){
                        if (!isNaN(parseInt(i)) && qty > 0) {
                            let p = await model_storage.get_product_reuse_byID({id:parseInt(i),prod_id:product.prod_id})
                            // console.log(p)
                            if (p.length > 0){
                                let remaining
                                if (qty >= p[0].remaining){
                                    remaining = 0
                                    qty -= p[0].remaining
                                }else{
                                    remaining = p[0].remaining - qty
                                    qty = 0
                                }
                                // console.log(remaining)
                                await model_storage.update_product_reuse({Uremaining:remaining,Uid:p[0].id}).then((data)=>{return data});
                                await model_storage.record_history(p[0].prod_id,p[0].remaining,remaining,4)
                            }
                        }
                    }
                }else{
                    let p = await model_storage.get_product_byID({id:product.prod_id})
                    // console.log(p)
                    let new_stock = p[0].stock - parseInt(product.qty);
                    await model_storage.update_stock(product.prod_id,new_stock).then((data)=>{return data});
                    await model_storage.record_history(product.prod_id,p[0].stock,new_stock,2)
                }
            }
            await model_sale.insert_sale(data).then((data)=>{return data});
            res.redirect("../manage_appointment");
        }else{
            res.redirect("../manage_appointment");
        }
    }else{
        res.redirect("/admin");
    }
};

exports.search_vip = async (req, res) => {
    if( req.session.role === "admin" ){
        if(req.query.id){
            let result = await model_vip.get_vip_byID({id:req.query.id});
            if( result.length > 0 ){  
                if(result[0].serv_course_id){
                    result[0].services = await model_course.get_course_service({id:result[0].serv_course_id}); 
                    res.send(result[0]);
                }else {
                    res.send({error:1,code:'404 Error Not Found'});
                }
            }else{
                res.send({error:1,code:'ไม่พบข้อมูล'});
            }
        }else {
            res.send({error:1,code:'404 Error Not Found'});
        }
    }else {
        res.send({error:1,code:'404 Error Not Found'})  ;
    }
};

// ---------------------- validate ----------------------
exports.check_can_add = async (req, res) => {
    let search_cust = await model_cust.get_cust_byID(req.query).then((data)=>{return data})
    const status = (search_cust.length>0)? 1 : 0
    res.send({status:status});
};

