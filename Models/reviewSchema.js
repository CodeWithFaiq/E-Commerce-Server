const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    text:String,
    status:{
        type:String,
        default:''
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'products'
    },
    user:[{
        type:mongoose.Types.ObjectId,
        ref:'users',
    }]
})

const reviewModel=mongoose.model('reviews',reviewSchema);

module.exports=reviewModel;