const model = require('../../models/sale');

exports.Rating = async (req, res) => {
    let search_sale = req.query.sale_id;
    let data_sale = []
    if (!isNaN(req.query.sale_id)){
        data_sale = await model.get_sale_rating_byId({id:req.query.sale_id})
    }
    res.render('template',{
        session_role:"customer",
        header:"Rating",
        file:'customer_page/rating',
        data_sale: data_sale,
        search_sale: search_sale,
    });
};

exports.setRating =async (req, res) => {
    if(req.params.action === "submit"){
        await model.insert_sale_rating(req.body).then((data)=>{
            res.send(data);
        });
    }else{
        res.redirect("/customer");
    }
};