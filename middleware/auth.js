const ifLogin = (req,res,next)=>{
    if(req.session.userInfo)
    {
        next();
    }
    else{
        res.redirect("/user/login");
    }
}

module.exports=ifLogin;