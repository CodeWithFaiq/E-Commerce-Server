const express=require('express');
const productModel=require('../Models/productSchema');
const categoryModel=require('../Models/categorySchema');
const uploads=require('../middleware/multer');
const authentication = require('../middleware/authentication');
const router=express.Router();


router.get('/',async(req,res)=>{
    const products=await productModel.find();
    res.render('Products',{products});
})


router.get('/add/:cId', authentication, async (req,res)=>{
res.render('AddProduct');

})

router.post('/add/:cId',uploads.single('Avatar') , async (req,res)=>{
    const category=await categoryModel.findById(req.params.cId);
    if(!req.file) return res.status(500).json({message:'Please insert an appropriate Image for your product.'})
    const url=req.protocol + '://' + req.get('host');
    const product=new productModel();
    product.category=category;
    product.price=req.body.price;
    product.name=req.body.name;
    product.description=req.body.description;
    product.image= url + '/Images/' + req.file.filename;
    await product.save();
    category.products.push(product);
    await category.save();
    res.redirect('/')

})

router.get('/:id',async (req,res)=>{
   
    const products=await productModel.find({category:req.params.id}).populate('category');
    res.send(products);
})


module.exports=router;