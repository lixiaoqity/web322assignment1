
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const productModel = require("./modle/product");

const app = express();

app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/",(req,res)=>{

    res.render("home",{
        title:"Home",
        categorySection: productModel.categorySection.getAllCategories(),
        sellerSection: productModel.products.getAllSellers()
    });

});

app.get("/products",(req,res)=>{

    res.render("products",{
        title:"Products",
        products: productModel.products.getAllProducts()
    });

});

app.get("/registration",(req,res)=>{

    res.render("registration",{
        title:"Registration"

    });

});

app.get("/dashboard",(req,res)=>{

    res.render("dashboard",{
        title:"Dashboard"
    });

});

app.post("/registration",(req,res)=>{
    console.log(`${req.body.email}`)
    var errorName=[];
    var errorEmail=[];
    var errorPassword=[];
    var errorPasswordA=[];

    if(req.body.yourName=="")
    {
        errorName="Enter your name";
    }
    if(req.body.email=="")
    {
        errorEmail="Enter your email";
    }

    var temp=req.body.password;
    const regu=RegExp(/^[A-Za-z1-9]+$/);
    if(req.body.password=="")
    {
        errorPassword="Enter your password";
    }
    else if(req.body.password.length>5&&req.body.password.length<13)
    {
        if(!regu.test(temp))
        {
            errorPassword="Your password must have letters and numbers only";
        }
    }
    else{
        errorPassword="Your password must have 6 to 12 characters";
    }
    if(req.body.passwordAgain=="")
    {
        errorPasswordA="Enter your password again";
    }
    else if(req.body.passwordAgain!=req.body.password){
        errorPasswordA="Password input is inconsistent";
    }   
    if(errorName.length>0||errorEmail.length>0||errorPassword.length>0||errorPasswordA.length>0)
    {
        res.render("registration",{
            title : "Registration",
            errorN : errorName,
            errorE : errorEmail,
            errorP : errorPassword,
            errorPP : errorPasswordA,
            yourName : req.body.yourName,
            email : req.body.email,
            password : req.body.password,
            passwordAgain : req.body.passwordAgain
        });
    }
    else{
        res.render("dashboard",{
            title : "Dashboard" 
        });
    }


});

app.get("/login",(req,res)=>{

    res.render("login",{
        title:"Login"
    });

});

app.post("/login",(req,res)=>{
    console.log(`${req.body.email}`)
    if(req.body.password=="")
    {
        var errorPassword="Enter your password";
    }
    if(req.body.email=="")
    {
        var errorEmail="Enter your email";
    }

    res.render("login",{
        title : "Login",
        errorE : errorEmail,
        errorP : errorPassword,
        email : req.body.email,
        password : req.body.password
    });

});


app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is succeeded!`);
});