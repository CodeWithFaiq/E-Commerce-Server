const express=require('express');
const categoryModel=require('../../Models/categorySchema');
const productModel=require('../../Models/productSchema');
const router=express.Router();

router.get('/',async(req,res)=>{
    const categories=await categoryModel.find();
    res.send(categories);
})

router.get('/:cId',async (req,res)=>{
   
    const products=await productModel.find({category:req.params.cId});
    res.send(products);
})

module.exports=router;