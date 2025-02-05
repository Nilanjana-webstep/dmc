import { Router } from "express";
import { 
    bill_create,
    getAllBill,
} from "../controllers/controller.bill.js";

const billRoute = Router();

billRoute.post('',bill_create)
billRoute.get('',getAllBill)

export default billRoute;