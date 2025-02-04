import { Router } from "express";
import { 
    createBillingProfile,
    editBillingProfile,
    getAllBillingProfile,
} from "../controllers/controller.billingProfile.js";
import { 
    billingProfileCreationValidation,
    billingProfileUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.billingProfile.js";


const billingProfileRoute = Router();

billingProfileRoute.post('/',billingProfileCreationValidation,createBillingProfile);
billingProfileRoute.get('/',getAllBillingProfile)
billingProfileRoute.put('/:id',billingProfileUpdationValidation,editBillingProfile)



export default billingProfileRoute;