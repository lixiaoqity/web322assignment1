const express = require('express');
const router = express.Router();
const productModel = require("../models/Product");
const addToCartModel = require("../models/Cart");
const userModel = require("../models/User");
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
   let total = 0;
    productModel.find()
        .then((products) => {
            const filteredProducts = products.map(product => {
                return {
                    id: product._id,
                    inventory: product.inventory
                }
            });
            addToCartModel.find({userId: req.session.userInfo._id})
            .then((orders) => {

                const filterorders = orders.map(order => {
                    return {
                        id: order._id,
                        userId: order.userId,
                        productId: order.productId,
                        title: order.title,
                        price: order.price,
                        quantity: order.quantity,
                        description: order.description,
                        productPic: order.productPic,
                        itemSum : Number(order.quantity)*Number(order.price)
                    }
                });
                filterorders.forEach((order)=>{
                    total=total+order.itemSum;
                });
                if (filterorders.length > 0) {
                    for (let i = 0; i < filterorders.length; i++) {
                        for (let j = 0; j < filteredProducts.length; j++) {
                            if (filterorders[i].productId == filteredProducts[j].id) {
                                filterorders[i].inventory = filteredProducts[j].inventory;
                                if (filterorders[i].quantity > filteredProducts[j].inventory) {
                                    filterorders[i].stock = "Out Of Stock!";
                                }else {
                                    filterorders[i].stock = "In Stock!";
                                }
                            }
                        }
                    }
                }  
                res.render("Cart/shoppingCart", {
                    title: `Shopping Cart`,
                    data: filterorders,
                    total : total
                });
            })
            .catch(err=>console.log(`inventory data error :${err}`));
        })
        .catch(err=>console.log(`products data error :${err}`));

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

router.post("/checkout",isAuthenticated,(req,res)=>{
    addToCartModel.find({userId:req.session.userInfo._id})
    .then((carts)=>{
        const filtered = carts.map(cart=>{
            return{
                title : cart.title,
                quantity : cart.quantity,
                itemSum : Number(cart.price)*cart.quantity
            }
        });

        let totalPrice = 0;
        let totalItem = 0;
        filtered.forEach((item)=>{
            totalPrice = totalPrice + item.itemSum;
            totalItem = totalItem + item.quantity;
        });

        addToCartModel.deleteMany({userId:req.session.userInfo._id})
        .then(()=>{
            userModel.findById(req.session.userInfo._id)
            .then((user)=>{
                const email = user.email;
                const username = user.yourName;
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.WEB322_API_KEY);
                const msg = {
                to: `${email}`,
                from: `jessicaguo05@gmail.com`,
                subject: 'Welcome to our Amazonon',
                html: 
                `
                Hi, ${username} <br>
                Thank you for shopping in our company.<br>
                Today, you bought ${totalItem} products.<br>
                Total cost is $${totalPrice}.
                `,
                };

                sgMail.send(msg)
                .then(()=>{
                    res.render("Cart/cartDashboard",{
                        title : "Thankyou for shopping in our company!",
                        data : filtered,
                        totalItem : totalItem,
                        totalPrice : totalPrice
                    });
                })
                .catch(err=>{console.log(`Error sending confirm email ${err}`);});
            })
            .catch(err=>{console.log(`Error found the userInfo ${err}`);});
            
        })
        .catch(err=>{console.log(`Err during the delete ${err}`);});
    })
    .catch(err=>{console.log(`Err to found the order ${err}`);});
});


module.exports=router;