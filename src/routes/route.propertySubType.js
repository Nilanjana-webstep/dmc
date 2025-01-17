import { Router } from "express";
import { 
    createPropertySubType,
    getAllPropertySubType,
    getParticularPropertySubTypeById,
    updatePropertySubTypeById,
    deletePropertySubTypeById,
    getAllPropertiesOfParticularPropertyType
} from "../controllers/controller.propertySubType.js";

import { 
    propertySubTypeCreationValidation,
    propertySubTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertySubType.js";

const propertySubTypeRoute = Router();


propertySubTypeRoute.post('/',propertySubTypeCreationValidation,createPropertySubType)
propertySubTypeRoute.get('/',getAllPropertySubType)
propertySubTypeRoute.get('/:property_sub_type',getParticularPropertySubTypeById)
propertySubTypeRoute.get('/type/:property_type',getAllPropertiesOfParticularPropertyType)
propertySubTypeRoute.put('/:property_sub_type',propertySubTypeUpdationValidation,updatePropertySubTypeById)
// propertySubTypeRoute.delete('/:property_sub_type',deletePropertySubType)


export default propertySubTypeRoute;