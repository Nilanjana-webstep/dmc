import { razorpay } from "../config/razorpayConfig.js";
import crypto from 'crypto';

export const createPaymentOrder = async (req,res,next)=>{

    const { amount, currency, receipt } = req.body;
    
    try {
      const order =  razorpay.orders.create({
        amount: amount, 
        currency: currency,
        payment_capture: 1 ,
        receipt
      });

      if ( order ){
        return res.status(200).json({
            success : true,
            message : "successfully created order.",
            data : order,
        })
      }
      
    } catch (error) {
      
      console.log("error of creating order : ",error);
        
    }
}


export const varifyPayment = async ( req,res,next)=>{
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');
        if (generated_signature === razorpay_signature) {

            return res.status(200).json({
                success : true,
                message : "payment varified!"
            })
           
        } else {
            return res.status(401).json({
                success : false,
                message : "payment is not varified!"
            })
        }
    } catch (error) {
        console.log("error of varifing payment : ",error);
        
    }
    
}

