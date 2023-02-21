const express=require('express');
const productModel=require('../../Models/productSchema');
const router=express.Router();

router.post('/:id',async(req,res)=>{
   const product=await productModel.findById(req.params.id);
   product.rating=  product.rating + parseInt(req.body.rating);
   product.ratingcount++;
   product.totalrating=product.rating/product.ratingcount;
   product.totalrating=product.totalrating.toFixed(1);
   
   await product.save();
   res.json({message:"Rating has been successfully Updated."})
})

module.exports=router;