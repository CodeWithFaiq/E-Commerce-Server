const express=require('express');
const stripe = require('stripe')('sk_test_51MQBxrBAMG50aPgKbdECGNcPCPCQDDshRCxbo5cx5BtwjnVSirDwAy8dpQpaiPopCqY7ucjbMPTOXdfsGB0CaK0S00rw9Us5He');
const router=express.Router();
const orderModel=require('../../Models/orderSchema')
const endpointSecret='whsec_8fe27afca0656edb75d5cef53bbd327624a671278ddca399cf2a63033abe63bc'

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const payload = request.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    console.log(`Webhook Verified: `);
  } catch (err) {
    console.log(`Webhook Error: `);
    res.status(400).send(`Webhook Error: `);
    return;
  }


  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
     
  
  const session = event.data.object;
  stripe.checkout.sessions.listLineItems(
  session.id,
  
   async function (err, lineItems) {
    console.log(lineItems);
    console.log(session);
// console.log(session.metadata.user);
    const order=new orderModel();
    order.user=session.metadata.user;
    order.items=lineItems.data.map((item)=>item)
   order.bill=session.amount_total/100;

    await order.save();
    

  }
);
  }

  response.status(200).end();
});


module.exports=router;