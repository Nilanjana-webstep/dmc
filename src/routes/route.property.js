import { Router } from "express";
import { 
    updatePropertyById,
    deletePropertyById,
    getAllProperty,
    getParticularPropertyByConsumerId, 
    getAllPropertyByPartucularCustomerId,
} from "../controllers/controller.property.js";
import {
    propertyUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.property.js"

const propertyRoute = Router();


propertyRoute.get('/',getAllProperty)
propertyRoute.get('/customer-id/:id',getAllPropertyByPartucularCustomerId)
propertyRoute.get('/:consumer_id',getParticularPropertyByConsumerId)
propertyRoute.put('/:id',propertyUpdationValidation,updatePropertyById)
propertyRoute.delete('/:id',deletePropertyById)


export default propertyRoute;