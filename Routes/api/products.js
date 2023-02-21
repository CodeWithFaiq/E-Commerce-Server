const express=require('express');

const router=express.Router();
const productModel=require('../../Models/productSchema');
const jwt=require('jsonwebtoken')
const config=require('config')

router.post('/',async(req,res)=>{


const product=await productModel.findById(req.body._id);
res.send(product);
})


router.get('/',async(req,res)=>{

    const limit=parseInt(req.query.limit) || 6;
    const page=parseInt(req.query.page) ||1;
    const skip=(page -1)*limit;
    const products=await productModel.find().skip(skip).limit(limit);
    res.send(products);
})

router.get('/:id',async (req,res)=>{
    const product=await productModel.findById(req.params.id);
    res.send(product);
})

router.post('/:id',async (req,res)=>{
    const product=await productModel.findById(req.params.id);
    product.views++;
    await product.save();
    res.json({message:'View is successfully made'})
})


router.put('/Search',async(req,res)=>{
     const {query}=req.body;
   
    const products=await productModel.find({name:{$regex:query,$options:'i'}});
res.send(products);


})




module.exports=router;