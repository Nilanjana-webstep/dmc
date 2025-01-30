import  Razorpay from 'razorpay';
import { ENV_VARIALBE } from "./.envConfig.js";

export const razorpay = new Razorpay({
    key_id: ENV_VARIALBE.RAZORPAY_KEY_ID,
    key_secret: ENV_VARIALBE.RAZORPAY_KEY_SECRET,
  });