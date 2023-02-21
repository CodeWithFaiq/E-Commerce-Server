const express=require('express');
const userModel=require('../../Models/userSchema');
const productModel=require('../../Models/productSchema');
const reviewModel=require('../../Models/reviewSchema'); 
const router=express.Router();

router.get('/:pId',async(req,res)=>{
   const reviews=await reviewModel.find({product:req.params.pId}).populate([{path:'user',populate:[{path:'reviews'}]}])
   res.send(reviews);
    
})

router.post('/:uId/:pId',async(req,res)=>{
    const user=await userModel.findById(req.params.uId);
    const product=await productModel.findById(req.params.pId);
   
        const review=new reviewModel();
        review.text=req.body.text;
        review.user=user;
        review.product=product;
        await review.save();
        user.reviews.push(review);
        await user.save();
        product.reviews.push(review);
        await product.save();
        res.json({message:'Comment Successfully made'});
    
    
    


})

module.exports=router;