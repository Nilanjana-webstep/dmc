import { Router } from "express";

import { 
    deleteCustomerById,
    getAllCustomer,
    updateCustomerById,
    getParticularCustomerByMobileNumber,
    createCustomerWithConsumer,
    uploadCustomerWithConsumerFromCsv,
    getParticularCustomerByCustomerId,
    exportCustomerIntoExcel,
    customerLogin,
    otpVarification,
    otpResend
} from "../controllers/controller.customer.js";

import { 
    customerUpdationValidation,
    customerCreationWithConsumerValidation
} from "../middlewares/validationMiddleware/validationMiddleware.customer.js";

import { uploadCsv } from "../middlewares/upload.js";


const customerRoute = Router();


customerRoute.post('/',customerCreationWithConsumerValidation,createCustomerWithConsumer)
customerRoute.get('/',getAllCustomer)
customerRoute.get('/export-xl',exportCustomerIntoExcel);
customerRoute.get('/:customer_id',getParticularCustomerByCustomerId)
customerRoute.put('/:id',customerUpdationValidation,updateCustomerById)
customerRoute.delete('/:customer_id',deleteCustomerById)
customerRoute.get('/mobile-number/:mobile_number',getParticularCustomerByMobileNumber)
customerRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadCustomerWithConsumerFromCsv);
customerRoute.post('/login',customerLogin);
customerRoute.post('/otp-varify',otpVarification);
customerRoute.post('/otp-resend',otpResend);

export default customerRoute;