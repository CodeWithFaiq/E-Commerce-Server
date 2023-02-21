const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },

    items:[
        {
            id:{
                type:String
                
            },
            quantity:Number,
            description:String
        }
    ],

   bill:Number,
   orderDate:{
    type:Date,
    default:Date.now()
   },
   status:{
    type:String,
    default:'Pending'
   }

},{timeStamps:true})

const orderModel=mongoose.model('orders',orderSchema);

module.exports=orderModel;