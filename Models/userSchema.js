const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    password:String,
    confirm:String,
    email:{
        type:String,
        lowercase:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    image:String,
    
    reviews:[{
        type:mongoose.Types.ObjectId,
        ref:'reviews'
    }],
   

},{timestamps:true})

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;