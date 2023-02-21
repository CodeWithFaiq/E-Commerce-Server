const express=require('express');
const authentication = require('../middleware/authentication');
const categoryModel=require('../Models/categorySchema');
const router=express.Router();

router.get('/',async(req,res)=>{
    const categories=await categoryModel.find().skip(1);
    res.render('CategoryList',{categories});
})

router.get('/add', authentication, (req,res)=>{res.render('AddCategory')})

router.post('/add',async (req,res)=>{
const category=new categoryModel();
category.name=req.body.name;
await category.save();
res.redirect('/category');
})

module.exports=router;