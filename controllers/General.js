const express = require('express');
const router = express.Router();
const productModel = require("../models/General");

router.get("/", (req, res) => {

    res.render("General/home", {
        title: "Home",
        categorySection: productModel.categorySection.getAllCategories(),
        sellerSection: productModel.products.getAllSellers()
    });

});

router.get("/products", (req, res) => {

    res.render("General/products", {
        title: "Products",
        products: productModel.products.getAllProducts()
    });

});


module.exports=router;