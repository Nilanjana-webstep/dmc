import { Router } from "express";

import { 
    deleteCustomerById,
    getAllCustomer,
    updateCustomerById,
    // exportCustomerIntoCsv,
    getParticularCustomerByMobileNumber,
    createCustomerWithProperty,
    uploadCustomerWithPropertyFromCsv,
    getParticularCustomerByCustomerId,
    exportCustomerIntoExcel
} from "../controllers/controller.customer.js";

import { 
    customerUpdationValidation,
    customerCreationWithPropertyValidation
} from "../middlewares/validationMiddleware/validationMiddleware.customer.js";

import { uploadCsv } from "../middlewares/upload.js";


const customerRoute = Router();


customerRoute.post('/',customerCreationWithPropertyValidation,createCustomerWithProperty)
customerRoute.get('/',getAllCustomer)
// customerRoute.get('/export-csv',exportCustomerIntoCsv);
customerRoute.get('/export-xl',exportCustomerIntoExcel);
customerRoute.get('/:customer_id',getParticularCustomerByCustomerId)
customerRoute.put('/:customer_id',customerUpdationValidation,updateCustomerById)
customerRoute.delete('/:customer_id',deleteCustomerById)
customerRoute.get('/mobile-number/:mobile_number',getParticularCustomerByMobileNumber)
customerRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadCustomerWithPropertyFromCsv);

export default customerRoute;