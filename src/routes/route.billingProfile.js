import { Router } from "express";
import { 
    createBillingProfile,
    editBillingProfile,
    getAllBillingProfile,
    getBillingProfilesByPropertyType,
    uploadBillingProfileFromCsv,
} from "../controllers/controller.billingProfile.js";
import { 
    billingProfileCreationValidation,
    billingProfileUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.billingProfile.js";
import { uploadCsv } from "../middlewares/upload.js";

const billingProfileRoute = Router();

billingProfileRoute.post('/',billingProfileCreationValidation,createBillingProfile);
billingProfileRoute.get('/',getAllBillingProfile);
billingProfileRoute.get('/by-Property', getBillingProfilesByPropertyType);
billingProfileRoute.put('/:id',billingProfileUpdationValidation,editBillingProfile);
billingProfileRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadBillingProfileFromCsv);



export default billingProfileRoute;