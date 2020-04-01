
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config({path:"./config/keys.env"});

//Import your router objects
const generalRoutes = require("./controllers/General");
const taskRoutes = require("./controllers/Task");
const userRoutes = require("./controllers/User");

const app = express();

// parse application/x-www-form-urlencoded
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Maps express to all our router objects
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/task",taskRoutes);
app.use("/",(req,res)=>{
    res.render("General/404");
});

mongoose.connect(process.env.MONGODB_CONNECTING_WEB322ASSIGNMENT, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is succeeded!`);
});