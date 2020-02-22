
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

app.get("/login",(req,res)=>{

    res.render("login",{
        title:"Login"

    });

});


app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is succeeded!`);
});