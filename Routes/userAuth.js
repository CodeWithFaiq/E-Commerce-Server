const express=require('express');
const bcrypt=require('bcryptjs');
const userModel=require('../Models/userSchema');
const router=express.Router();
const jwt=require('jsonwebtoken');
const uploads=require('../middleware/multer');
const config=require('config')


router.post('/Register', uploads.single('Avatar'), async (req,res)=>{

    const alreadyRegistered=await userModel.findOne({email:req.body.email});
    if(alreadyRegistered)return res.status(403).send('User is Alredy Registerd.');
    const url=req.protocol + '://' + req.get('host');
    const user=new userModel();
if(!req.file){

    user.name=req.body.name;
    user.email=req.body.email;
    if(req.body.password !== req.body.confirm) return res.status(403).send('Passwords do not match');

    const hashedPassword=await bcrypt.hash(req.body.password,12);
    const confirmHash=await bcrypt.hash(req.body.confirm,12);
    user.password=hashedPassword;
    user.confirm=confirmHash;
    user.image=url + '/Images/' + 'default.jpg';
    await user.save();
    res.json({message:'User successfully registered'});

}
    else{
        user.name=req.body.name;
    user.email=req.body.email;
    if(req.body.password !== req.body.confirm) return res.status(403).send('Passwords do not match');

    const hashedPassword=await bcrypt.hash(req.body.password,12);
    const confirmHash=await bcrypt.hash(req.body.confirm,12);
    user.password=hashedPassword;
    user.confirm=confirmHash;
    user.image=url + '/Images/' + req.file.filename;
    await user.save();
    res.json({message:'User successfully registered'});
    }
    
})

router.post('/Login', async (req,res)=>{
    const user=await userModel.findOne({email:req.body.email});
    if(!user) return res.status(403).send('User is not Registered.');
 
    const isVerified=await bcrypt.compare(req.body.password,user.password);
    if(!isVerified) return res.status(403).send('Invalid Email or Password')
     
    const token=jwt.sign({
        _id:user._id,isAdmin:user.isAdmin
    }, config.get('JWTKEY')  );

    
    res.send(token);
      


})

module.exports=router;