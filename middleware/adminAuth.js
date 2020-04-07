const IfAdminLogin = (req,res,next)=>{
    if(req.session.userInfo.type=="Admin")
    {
        next();
    }
    else{
        
        res.render("user/login",{
            errorE: "Invalid authorization, please use the administror account to login!"
        });
    }
}

module.exports=IfAdminLogin;