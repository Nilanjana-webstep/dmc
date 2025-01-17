import { Router } from "express";
import { 
    createProperty,
    updatePropertyById,
    deletePropertyById,
    getAllProperty,
    getParticularPropertyById 
} from "../controllers/controller.property.js";

import {
    propertyCreationValidation,
    propertyUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.property.js"

const propertyRoute = Router();


propertyRoute.post('/',propertyCreationValidation,createProperty)
propertyRoute.get('/',getAllProperty)
propertyRoute.get('/:property_id',getParticularPropertyById)
propertyRoute.put('/:property_id',propertyUpdationValidation,updatePropertyById)
propertyRoute.delete('/:property_id',deletePropertyById)


export default propertyRoute;