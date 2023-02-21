const express=require('express');
const userModel=require('../../Models/userSchema');
const router=express.Router();
const uploads=require('../../middleware/multer');
const bcrypt=require('bcryptjs');
router.get('/',async(req,res)=>{
    const users=await userModel.find();
    res.send(users);
})



router.get('/:id',async (req,res)=>{
    const user=await userModel.findById(req.params.id);
    res.send(user);
})

router.delete('/:id',async (req,res)=>{
    const user=await userModel.findByIdAndDelete(req.params.id);
    res.json({message:'Successfully Deleted.'});
    
})

router.put('/:id', uploads.single('Avatar'), async (req,res)=>{
    const user=await userModel.findById(req.params.id);
    const url=req.protocol + '://' + req.get('host');
    if(req.body.password !== req.body.confirm) return res.status(404).send('Passwords Do not Match!');
   if(!req.file){
   user.name=req.body.name;
   const encryptPassword=await bcrypt.hash(req.body.password,12);
   const encryptConfirm=await bcrypt.hash(req.body.confirm,12);
   user.password=encryptPassword;
   user.confirm=encryptConfirm;
   user.email=req.body.email;
   await user.save();
   res.json({message:'Successfully Updated!'})
   }
   else{
    user.name=req.body.name;
   const encryptPassword=await bcrypt.hash(req.body.password,12);
   const encryptConfirm=await bcrypt.hash(req.body.confirm,12);
   user.password=encryptPassword;
   user.confirm=encryptConfirm;
   user.email=req.body.email;
   user.image=url + '/Images/' + req.file.filename;
   await user.save();
   res.json({message:'Successfully Updated!'});
   }
})



module.exports=router;