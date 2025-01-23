import { Router } from "express";
import { 
    updatePropertyById,
    deletePropertyById,
    getAllProperty,
    getParticularPropertyById, 
    getAllPropertyByPartucularCustomerId,
} from "../controllers/controller.property.js";
import {
    propertyUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.property.js"

const propertyRoute = Router();


propertyRoute.get('/',getAllProperty)
propertyRoute.get('/customer-id/:id',getAllPropertyByPartucularCustomerId)
propertyRoute.get('/:property_id',getParticularPropertyById)
propertyRoute.put('/:property_id',propertyUpdationValidation,updatePropertyById)
propertyRoute.delete('/:property_id',deletePropertyById)


export default propertyRoute;