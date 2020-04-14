const express = require('express');
const router = express.Router();
const productModel = require("../models/Product");
const addToCartModel = require("../models/Cart");
const isAuthenticated = require("../middleware/auth");

router.get("/list",isAuthenticated,(req,res)=>{
    /*
    addToCartModel.find({userId:req.session.userInfo._id})
    .then((products)=>{
        
        const filteredProducts = products.map(product=>{
            return {
                id : product._id,
                userId : product.userId,
                productId : product.productId,
                title : product.title,
                description : product.description,
                price : product.price,
                quantity : product.quantity,
                productPic : product.productPic,
                itemSum : Number(product.quantity)*Number(product.price)                
            }
        });
        let totalSum=0;
        filteredProducts.forEach((val)=>{
            totalSum=totalSum+val.itemSum;
        });
        res.render("Cart/cartDashboard", {
            title: "Shopping Cart List",
            data : filteredProducts,
            total : totalSum
        });
    })
    .catch(err=>console.log(`Error happened when pulling shopping cart info from database :${err}`));
    */
   addToCartModel.find({userId:req.session.userInfo._id})
   .then((products)=>{   
       const filteredProducts = products.map(product=>{
           var temp=0;
           productModel.findById({_id:product.productId})
           .then((item)=>{
               temp=item.inventory;
           })
           .catch(err=>console.log(`inventory data error :${err}`));
           return {
               id : product._id,
               userId : product.userId,
               productId : product.productId,
               title : product.title,
               description : product.description,
               price : product.price,
               quantity : product.quantity,
               productPic : product.productPic,
               itemSum : Number(product.quantity)*Number(product.price)                
           }
       });
       let totalSum=0;
       filteredProducts.forEach((val)=>{
           totalSum=totalSum+val.itemSum;
       });
       res.render("Cart/cartDashboard", {
           title: "Shopping Cart List",
           data : filteredProducts,
           total : totalSum
       });
   })
   .catch(err=>console.log(`Error happened when pulling shopping cart from database :${err}`));
});

router.post("/addToCart/:id",isAuthenticated,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        const cartProduct ={
            id : product._id,
            title : product.title,
            description : product.description,
            price : product.price,
            inventory : product.inventory,
            productPic : product.productPic
        };
        addToCartModel.findOne({userId:req.session.userInfo._id,productId:cartProduct.id})
        .then((old)=>{
            if(old){
                const updateCart = {
                    quantity : Number(req.body.quantity)+Number(old.quantity)
                };
                addToCartModel.updateOne({_id:old._id},updateCart)
                .then(()=>{
                    res.redirect(`/cart/list`);
                })
                .catch(err=>console.log(`Error happened when updating quantity to the shopping cart :${err}`));
            }
            else{
                const addCart = {
                    userId : req.session.userInfo._id,
                    productId : cartProduct.id,
                    title : cartProduct.title,
                    description : cartProduct.description,
                    price : cartProduct.price,
                    quantity : req.body.quantity,
                    productPic : cartProduct.productPic               
                };
                const newProduct = new addToCartModel(addCart);
                newProduct.save()
                .then(()=>{
                    res.redirect(`/cart/list`);
                })
                .catch(err=>console.log(`Error happened when inserting new product to the shopping cart :${err}`));
            }
        })
        .catch(err=>console.log(`Error happened when pulling cart product from the shopping cart :${err}`));
    })
    .catch(err=>console.log(`Error happened when pulling product from the product list :${err}`));
});

//router to delete one cart
router.delete("/delete/:id",isAuthenticated,(req,res)=>{
    
    addToCartModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/cart/list");
    })
    .catch(err=>console.log(`Error happened when deleting shopping cart data from the database :${err}`));

});


module.exports=router;