import { Router } from "express";

import { 
    deleteCustomerById,
    getAllCustomer,
    updateCustomerById,
    exportCustomerIntoCsv,
    getParticularCustomerByMobileNumber,
    createCustomerWithProperty,
    uploadCustomerWithPropertyFromCsv,
    getParticularCustomerByCustomerId
} from "../controllers/controller.customer.js";

import { 
    customerUpdationValidation,
    customerCreationWithPropertyValidation
} from "../middlewares/validationMiddleware/validationMiddleware.customer.js";

import upload from "../middlewares/upload.js";


const customerRoute = Router();


customerRoute.post('/',customerCreationWithPropertyValidation,createCustomerWithProperty)
customerRoute.get('/',getAllCustomer)
customerRoute.get('/export-csv',exportCustomerIntoCsv);
customerRoute.get('/:customer_id',getParticularCustomerByCustomerId)
customerRoute.put('/:customer_id',customerUpdationValidation,updateCustomerById)
customerRoute.delete('/:customer_id',deleteCustomerById)
customerRoute.get('/mobile-number/:mobile_number',getParticularCustomerByMobileNumber)
customerRoute.post('/upload-csv',upload.single('csvFile'),uploadCustomerWithPropertyFromCsv);

export default customerRoute;