

exports.Test_Payment = async (req, res) => {
    if( req.session.role === "admin" ){
        res.render('template',{
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            header:"Payment",
            file:'payment'
        });
    }else{
        res.redirect('/');
    }
};