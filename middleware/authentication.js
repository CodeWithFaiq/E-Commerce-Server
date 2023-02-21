const jwt=require('jsonwebtoken');
const config=require('config');


const authentication=(req,res,next)=>{

const user=req.session.user;
const token=req.session.token;


if(!user) return res.redirect('/Login') ;

const isTokenVerified=jwt.verify(token,config.get("JWTKEY"));
if(!isTokenVerified) return res.status(403).json({message:'Token is Invalid'});

if(user.isAdmin !== true)return res.status(403).json({message:'You are not authorized.'});

next();

}
module.exports=authentication;