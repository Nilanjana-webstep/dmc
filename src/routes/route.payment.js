import { Router } from "express";
import { 
    createPaymentOrder,
    varifyPayment,
} from "../controllers/controller.payment.js";

const paymentRoute = Router();

paymentRoute.post('/create-order',createPaymentOrder);
paymentRoute.post('/verify-payment',varifyPayment);

export default paymentRoute;