const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
   
    name:String,
    price:Number,
    description:String,
    image:String,
    category:{
        type:mongoose.Types.ObjectId,
        ref:'categories'
    },
    reviews:[{
        type:mongoose.Types.ObjectId,
        ref:'reviews'
    }],
    views:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    ratingcount:{
        type:Number,
        default:0
    },
    totalrating:Number,

   
},{timestamps:true})


const productModel=mongoose.model('products',productSchema);

module.exports=productModel;