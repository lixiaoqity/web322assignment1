
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');


require('dotenv').config({path:"./config/keys.env"});

//Import your router objects
const generalRoutes = require("./controllers/General");
const taskRoutes = require("./controllers/Task");
const userRoutes = require("./controllers/User");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Maps express to all our router objects
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/task",taskRoutes);
app.use("/",(req,res)=>{
    res.render("General/404");
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is succeeded!`);
});