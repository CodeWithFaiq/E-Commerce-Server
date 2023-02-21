const express=require('express');
const productModel=require('../Models/productSchema');
const router=express.Router();

router.post('/',async(req,res)=>{
  const {text}=req.body
const products=await productModel.find({name:{$regex:text}})
    res.send(products);

})

module.exports=router;