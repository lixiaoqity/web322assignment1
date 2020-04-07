const express = require('express');
const router = express.Router();
const productModel = require("../models/Product");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const AdminAuthenticated = require("../middleware/adminAuth");

//Route to direct use to Add Task form
router.get("/add",isAuthenticated,AdminAuthenticated,(req,res)=>
{
    res.render("Product/productAddForm");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add",isAuthenticated,AdminAuthenticated,(req,res)=>
{
        const newProduct = {
            category : req.body.category,
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            inventory : req.body.inventory,
            bestSeller : req.body.bestSeller
        }
    /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
         in the form of an object(object literal)
        2. From the instance, you call the save method
     */

     const product =  new productModel(newProduct);
     product.save()
     .then((product)=>{
        req.files.productPic.name = `pro_pic_${product._id}${path.parse(req.files.productPic.name).ext}`;
        req.files.productPic.mv(`public/uploads/${req.files.productPic.name}`)
        .then(()=>{
            productModel.updateOne({_id:product._id},{
                productPic: req.files.productPic.name
            })
            .then(()=>{
                res.redirect(`/product/list`);
            })
        })       
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

////Route to fetch all tasks
router.get("/list",isAuthenticated,AdminAuthenticated,(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    productModel.find()
    .then((products)=>{

        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 
 
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
        res.render("Product/productDashboard",{
           data : filteredProduct
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`)); 
});

//Route to direct user to the task profile page
router.get("/description",isAuthenticated,AdminAuthenticated,(req,res)=>{

    

})

//Route to direct user to edit task form
router.get("/edit/:id",isAuthenticated,AdminAuthenticated,(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id,category,title,description,price,inventory,bestSeller} = product;
        res.render("Product/productEditForm",{
            _id,
            category,
            title,
            description,
            price,
            inventory,
            bestSeller  
        })
    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
})


//Route to update user data after they submit the form
router.put("/update/:id",isAuthenticated,AdminAuthenticated,(req,res)=>{

    const product =
    {
        category : req.body.category,
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        inventory : req.body.inventory,
        bestSeller : req.body.bestSeller
    }

    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));
});

//router to delete user
router.delete("/delete/:id",isAuthenticated,AdminAuthenticated,(req,res)=>{
    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

});




module.exports=router;