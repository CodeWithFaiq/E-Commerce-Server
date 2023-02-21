const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    name:String,
    products:[{
        type:mongoose.Types.ObjectId,
        ref:'products'
    }]
},{timestamps:true})

const categoryModel=mongoose.model('categories',categorySchema);

module.exports=categoryModel;