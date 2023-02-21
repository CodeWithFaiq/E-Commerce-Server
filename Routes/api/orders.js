const express=require('express');

const router=express.Router()
const orderModel=require('../../Models/orderSchema');
const config=require('config')
const stripe=require('stripe')('sk_test_51MQBxrBAMG50aPgKbdECGNcPCPCQDDshRCxbo5cx5BtwjnVSirDwAy8dpQpaiPopCqY7ucjbMPTOXdfsGB0CaK0S00rw9Us5He');
const cors=require('cors')
const userModel=require('../../Models/userSchema');
const { json } = require('express');





router.get('/',async(req,res)=>{
    const orders=await orderModel.find();
    res.send(orders);

    
})

router.get('/:id',async(req,res)=>{
    const orders=await orderModel.find({user:req.params.id});
    res.send(orders);
})





router.post('/:uId',async(req,res)=>{
    const {cart,totalbill}=req.body;


const line_items=cart.map((item)=>{
    return{
        price_data:{
            currency:'usd',
            product_data:{
                name:item.name,
                description:item.description,
                metadata:{id:item._id}
              
            },
            unit_amount:item.price*100,
              
        
        },
        quantity:item.qty,
        
    }
})

const session=await stripe.checkout.sessions.create({
   
    line_items,
    mode:'payment',
    metadata:{user:req.params.uId,cart:json()},
    success_url:'http://localhost:3000/payment/successful',
    cancel_url:'http://localhost:3000/Placeorder',
    
    
})
res.status(200).send(session.url)


 
// const user=await userModel.findById(req.params.uId);
// if(!user) return res.status(500).send('User is not registered with us.');
// const order= new orderModel();
// order.user=user;
// order.bill=totalbill;

// order.items=cart.map((item)=>item)
// await order.save();

// res.send('yeah')

})

const endpointSecret=' whsec_8fe27afca0656edb75d5cef53bbd327624a671278ddca399cf2a63033abe63bc'








module.exports=router;