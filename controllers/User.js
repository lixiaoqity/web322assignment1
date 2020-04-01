const express = require('express');
const router = express.Router();
const userModel = require("../models/User");
//const path=require("path");

router.get("/registration", (req, res) => {

    res.render("User/registration", {
        title: "Registration"

    });

});

router.get("/dashboard", (req, res) => {

    res.render("User/dashboard", {
        title: "Dashboard"
    });

});
/*
router.post("/registration", (req, res) => {
    console.log(`${req.body.email}`);
    res.render("User/dashboard");
});*/

router.post("/registration",(req, res)=> {
    //console.log(`${req.body.email}`);
    //console.log(req.body);
    //res.redirect("/User/dashboard");   
    const errorName = [];
    const errorEmail = [];
    const errorPassword = [];
    const errorPasswordA = [];

    if (req.body.yourName == "") {
        errorName.push("Enter your name");
    }
    if (req.body.email == "") {
        errorEmail.push("Enter your email");
    }

    var temp = req.body.password;
    console.log(req.body.password);
    const regu = RegExp(/^[A-Za-z1-9]+$/);
    if (req.body.password == "") {
        errorPassword.push("Enter your password");
    }
    else if (req.body.password.length > 5 && req.body.password.length < 13) {
        if (!regu.test(temp)) {
            errorPassword.push("Your password must have letters and numbers only");
        }
    }
    else {
        errorPassword.push("Your password must have 6 to 12 characters");
    }
    if (req.body.passwordAgain == "") {
        errorPasswordA.push("Enter your password again");
    }
    else if (req.body.passwordAgain != req.body.password) {
        errorPasswordA.push("Password input is inconsistent");
    }
    if (errorName.length > 0 || errorEmail.length > 0 || errorPassword.length > 0 || errorPasswordA.length > 0) {
        res.render("user/registration", {
            title: "Registration",
            errorN: errorName,
            errorE: errorEmail,
            errorP: errorPassword,
            errorPP: errorPasswordA,
            yourName: req.body.yourName,
            email: req.body.email,
            password: req.body.password,
            passwordAgain: req.body.passwordAgain
        });
    }
    else {
        //res.redirect("/User/dashboard");
        //console.log(`${req.body.email}`);
        
        const newUser = 
        {
            yourName:req.body.yourName,
            email:req.body.email,
            password:req.body.password
        };
        console.log(newUser.email);
        
        const user = new userModel(newUser);
        
        //const {yourName,email}=req.body;
        console.log(req.body);
        
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.WEB322_API_KEY);
        const msg = {
            to: `${newUser.email}`,
            from: `jessicaguo05@gmail.com`,
            subject: `Welcome to Amazon`,
            html: 
            `Vistor's Full Name ${newUser.yourName} <br>
            Vistor's Email Address ${newUser.email} <br>
            Welcome to Amazon. Your registration is succeed!<br>
           `,
        };
        user.save()
        .then(()=>{
            sgMail.send(msg)
            .then(()=>{
                
                res.render("User/dashboard",{
                    name:newUser.yourName
                });
                //res.redirect("/User/dashboard");
            })
            .catch(err=>{
                console.log(`Error ${err}`);
            });
            //res.redirect("/User/dashboard");
        })
        .catch(err=>console.log(`Error while inserting into the data ${err}`));
             
    }
});

router.get("/login", (req, res) => {

    res.render("User/login", {
        title: "Login"
    });

});

router.post("/login", (req, res) => {
    console.log(`${req.body.email}`)
    if (req.body.password == "") {
        var errorPassword = "Enter your password";
    }
    if (req.body.email == "") {
        var errorEmail = "Enter your email";
    }

    res.render("User/login", {
        title: "Login",
        errorE: errorEmail,
        errorP: errorPassword,
        email: req.body.email,
        password: req.body.password
    });

});


module.exports=router;