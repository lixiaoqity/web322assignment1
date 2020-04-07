
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');

require('dotenv').config({path:"./config/keys.env"});

//Import your router objects
const generalRoutes = require("./controllers/General");
const productRoutes = require("./controllers/Product");
const userRoutes = require("./controllers/User");

const app = express();

// parse application/x-www-form-urlencoded
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());

app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}));
//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.userInfo;
    next();
});

//Maps express to all our router objects
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);
app.use("/",(req,res)=>{
    res.render("General/404");
});

mongoose.connect(process.env.MONGODB_CONNECTING_WEB322ASSIGNMENT, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

const PORT=process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`Server is succeeded!`);
});