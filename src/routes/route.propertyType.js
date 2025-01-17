import { Router } from "express";
import { 
    createPropertyType,
    getAllPropertyType,
    getParticularPropertyTypeById,
    deletePropertyTypeById,
    updatePropertyTypeById
} from "../controllers/controller.propertyType.js";

import { 
    propertyTypeCreationValidation,
    propertyTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertyType.js";

const propertyTypeRoute = Router();


propertyTypeRoute.post('/',propertyTypeCreationValidation,createPropertyType)
propertyTypeRoute.get('/',getAllPropertyType)
propertyTypeRoute.get('/:property_type_id',getParticularPropertyTypeById)
propertyTypeRoute.put('/:property_type_id',propertyTypeUpdationValidation,updatePropertyTypeById)
// propertyTypeRoute.delete('/:property_type_id',deletePropertyTypeById)


export default propertyTypeRoute;