
exports.getAdmin = (req, res) => {

    if( req.session.role === "admin" ){
        res.render('main_page',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            header:"Admin",
            image:"/images/bg-01.jpg"
        });
    }else{
        res.redirect('/login');
    }

};