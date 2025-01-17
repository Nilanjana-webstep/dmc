import { Router } from "express";

import { 
    createCustomer,
    deleteCustomerById,
    getAllCustomer,
    getParticularCustomerByCustomerId,
    updateCustomerById
} from "../controllers/controller.customer.js";

import { 
    customerCreationValidation,
    customerUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.customer.js";



const customerRoute = Router();

customerRoute.post('/',customerCreationValidation,createCustomer)
customerRoute.get('/',getAllCustomer)
customerRoute.get('/:customer_id',getParticularCustomerByCustomerId)
customerRoute.put('/:customer_id',customerUpdationValidation,updateCustomerById)
customerRoute.delete('/:customer_id',deleteCustomerById)

export default customerRoute;