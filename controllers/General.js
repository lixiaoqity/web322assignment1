const express = require('express');
const router = express.Router();
const generalModel = require("../models/General");
const productModel = require("../models/Product");

router.get("/", (req, res) => {
    productModel.find()
    .then((products)=>{
        const filteredProduct =   products.map(product=>{
                return {
                    id: product._id,
                    category : product.category,
                    title : product.title,
                    description : product.description,
                    price : product.price,
                    inventory : product.inventory,
                    bestSeller : product.bestSeller,
                    productPic : product.productPic
                }
        });
        res.render("General/home", {
            title: "Home",
            categorySection: generalModel.categorySection.getAllCategories(),
            sellerSection : filteredProduct
        });
     })
     .catch(err=>console.log(`Error happened when pulling bestSellers from the database :${err}`)); 

});
/*
router.get("/products", (req, res) => {

    res.render("General/products", {
        title: "Products",
        products: generalModel.products.getAllProducts()
    });

});
*/

router.get("/products", (req, res) => {
    productModel.find()
    .then((products)=>{
        const filteredProduct =   products.map(product=>{
                return {
                    id: product._id,
                    category : product.category,
                    title : product.title,
                    description : product.description,
                    price : product.price,
                    inventory : product.inventory,
                    bestSeller : product.bestSeller,
                    productPic : product.productPic
                }
        });
        res.render("General/products", {
            title: "Products",
            data : filteredProduct
        });
     })
     .catch(err=>console.log(`Error happened when pulling productis from the database :${err}`)); 
});

module.exports=router;