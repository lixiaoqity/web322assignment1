const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
const productSchema = new Schema({
   
    category :
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
    inventory:
    {
        type:Number,
        required:true
    },
    bestSeller:
    {
        type:String,
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

 const productModel = mongoose.model('Product', productSchema);

 module.exports = productModel;