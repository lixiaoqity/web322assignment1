const dashBoardLoader = (req,res)=>{

    if(req.session.userInfo.type=="Admin")
    {
        res.render("User/adminDashboard");
    }
    
    else
    {
        res.render("User/dashboard");
    }

}

module.exports = dashBoardLoader;