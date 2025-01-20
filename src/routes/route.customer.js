import { Router } from "express";

import { 
    createCustomer,
    deleteCustomerById,
    getAllCustomer,
    getParticularCustomerByConsumer_id,
    updateCustomerById,
    customerLogin,
    varification,
    getMyProfile,
    uploadCsv,
} from "../controllers/controller.customer.js";

import { 
    customerCreationValidation,
    customerUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.customer.js";

import { authenticationMiddleware } from "../middlewares/middleware.authentication.js";
import upload from "../middlewares/upload.js";



const customerRoute = Router();

customerRoute.post('/',customerCreationValidation,createCustomer)
customerRoute.get('/',getAllCustomer)
customerRoute.get('/my-profile',authenticationMiddleware,getMyProfile);
customerRoute.get('/:consumer_id',getParticularCustomerByConsumer_id)
customerRoute.put('/:customer_id',customerUpdationValidation,updateCustomerById)
customerRoute.delete('/:customer_id',deleteCustomerById)
customerRoute.post('/login',customerLogin);
customerRoute.post('/varify',varification);
customerRoute.post('/upload-csv',upload.single('csvFile'),uploadCsv);

export default customerRoute;