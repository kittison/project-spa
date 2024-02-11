
exports.getMain = (req, res) => {

    res.render('main_page',{
        // session_user_id:req.session.user_id,
        // session_user:req.session.user,
        session_role:"customer",
        header:"Customer",
        image:"/images/bg-01.jpg"
    });
};