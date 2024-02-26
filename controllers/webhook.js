const { io } = require("socket.io-client");
const model = require('../models/vip');
const model_cust = require('../models/customer');
const formatDate = require("../config/formatDate");

exports.omise_webhook = async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);

    try {
        let data = req.body.data
        if (data.id && data.amount && data.paid){
            let get_pre_vip = await model.get_pre_vip_by_omise({id: data.id, amount: data.amount/100})
            // console.log(get_pre_vip)
            if (get_pre_vip.length > 0){
                let vip_id
                let cust_id
                let pre_vip = get_pre_vip[0]
                let search = await model_cust.search_cust(pre_vip);
                if (search.length == 0){
                    const cust_data = {
                        f_name: pre_vip.f_name,
                        l_name: pre_vip.l_name,
                        gender: pre_vip.gender,
                        address: pre_vip.address,
                        tel: pre_vip.tel,
                        email: pre_vip.email,
                        type: "vip",
                        point: 0
                    }
                    cust_id = await model_cust.insert_cust_vip(cust_data);
                    
                }
                else{
                    cust_id = search[0].id
                }

                let join_date = new Date();
                let expire_date = new Date(join_date)
                expire_date.setMonth(expire_date.getMonth() + 1);
                const vip_data = {
                    cust_id: cust_id,
                    course_id: pre_vip.serv_course_id,
                    join_date: formatDate(join_date),
                    expire_date: formatDate(expire_date),
                    acc_val: 0,
                    remain_val: pre_vip.price
                }
                vip_id = await model.insert_vip(vip_data).then((data)=>{return data});
                await model.update_pre_vip({id: pre_vip.id, vip_id: vip_id}).then((data)=>{return data});
                const socket = io("http://localhost:3000", {
                    transports: ['websocket']
                });

                socket.on("connect", () => {
                    // console.log("connected")
                    socket.emit("pre_vip", {id: pre_vip.id, vip_id: vip_id});
                });
            }
        }
    } catch (error) {
        // Code to handle the error
        console.error('An error occurred:', error.message);
    }
};