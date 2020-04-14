const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
const addToCartSchema = new Schema({
   
    userId:
    {
        type:String,
        required:true
    },
    productId: 
    {
        type:String,
        required:true
    },   
    title:
    {
      type:String,
      required:true
    },
    description: 
    {
        type:String,
        required:true
    },
    price :
    {
        type:String,
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
    productPic:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
});

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const addToCartModel = mongoose.model('Cart', addToCartSchema);

 module.exports = addToCartModel;