const express=require('express');
const userModel=require('../Models/userSchema');
const bcrypt=require('bcryptjs')
const router=express.Router();
const uploads=require('../middleware/multer');
const jwt=require('jsonwebtoken')
const config=require('config');

router.get('/Login',(req,res)=>{
    res.render('Login');
})

router.get('/Register',(req,res)=>{
    res.render('Register');
})

router.post('/Login',async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});
    if(!user) return res.status(403).json({message:'Invalid Email or Password'});
  
    const isVerified=await bcrypt.compare(req.body.password,user.password);
    if(!isVerified) return res.status(403).json({message:'Invalid Email or Password'});

    const token=jwt.sign({
        _id:user._id,isAdmin:user.isAdmin
    }, config.get('JWTKEY')  );

   
req.session.token=token;
    req.session.user=user;
   
    res.redirect('/products');

})
router.post('/Register', uploads.single('Avatar'), async (req,res)=>{

    const alreadyRegistered=await userModel.findOne({email:req.body.email});
    if(alreadyRegistered)return res.status(403).json({message:'User is Alredy Registerd.'});
    const url=req.protocol + '://' + req.get('host');
    const user=new userModel();
if(!req.file){

    user.name=req.body.name;
    user.email=req.body.email;
    if(req.body.password !== req.body.confirm) return res.status(403).json({message:'Passwords do not match'});

    const hashedPassword=await bcrypt.hash(req.body.password,12);
    const confirmHash=await bcrypt.hash(req.body.confirm,12);
    user.password=hashedPassword;
    user.confirm=confirmHash;
    user.image=url + '/Images/' + 'default.jpg';
   
    await user.save();
    res.redirect('/Login')

}
    else{
        user.name=req.body.name;
    user.email=req.body.email;
    if(req.body.password !== req.body.confirm) return res.status(403).json({message:'Passwords do not match'});

    const hashedPassword=await bcrypt.hash(req.body.password,12);
    const confirmHash=await bcrypt.hash(req.body.confirm,12);
    user.password=hashedPassword;
    user.confirm=confirmHash;
    user.image=url + '/Images/' + req.file.filename;
    await user.save();
    res.redirect('/Login')
    }
    
})

router.get('/Logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/Login');
})




module.exports=router;