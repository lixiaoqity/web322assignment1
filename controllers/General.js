const express = require('express');
const router = express.Router();
const productModel = require("../models/Product");

router.get("/", (req, res) => {
 /*   
    productModel.find({bestSeller:"Star"})
    .then((products)=>{

        const filteredProduct = products.map(product=>{

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
*/   
    productModel.find({bestSeller:"Star"})
    .then((products)=>{
        productModel.find({isCategory:"true"})
        .then((categories)=>{
            const filteredProduct = products.map(product=>{

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
            const filteredCategory = categories.map(category=>{

                return {
                    id: category._id,
                    title : category.category,
                    productPic : category.productPic
                }
            });
            res.render("General/home", {
            title: "Home",
            categorySection: filteredCategory,
            sellerSection : filteredProduct
            });
        })
        .catch(err=>console.log(`Error happened when pulling home categoris from the database :${err}`)); 

    })
    .catch(err=>console.log(`Error happened when pulling home bestSellers from the database :${err}`));  

});

router.get("/products", (req, res) => {
    productModel.find()
    .then((products)=>{
        const filteredProduct = products.map(product=>{
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

router.post("/products/searchPage", (req, res) => {
    if(req.body.productSearch=="all"){
        productModel.find()
        .then((products)=>{
            const filteredProduct = products.map(product=>{
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
    }else{
        productModel.find({category:req.body.productSearch})
        .then((products)=>{
            const filteredProduct = products.map(product=>{
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
         .catch(err=>console.log(`Error happened when searching productis of one product from the database :${err}`));
    }


});

router.get("/products/:selectCategory",(req,res)=>{
    productModel.find({category:req.params.selectCategory})
    .then((products)=>{
        const filteredProduct = products.map(product=>{
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
     .catch(err=>console.log(`Error happened when pulling productis of one product from the database :${err}`)); 
});

router.get("/products/oneProduct/:id",(req,res)=>{
    
    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id,category,title,description,price,inventory,bestSeller,productPic} = product;
        res.render("General/oneProduct",{
            _id,
            category,
            title,
            description,
            price,
            inventory,
            bestSeller,
            productPic
        })
    })
    .catch(err=>console.log(`Error happened when pulling one product from the database :${err}`));
    /*
    console.log("one product page");
    res.render("general/oneProduct");*/
});

module.exports=router;