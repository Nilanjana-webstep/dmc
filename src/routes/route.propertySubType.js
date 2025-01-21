import { Router } from "express";
import { 
    createPropertySubType,
    getAllPropertySubType,
    getParticularPropertySubTypeById,
    updatePropertySubTypeById,
    deletePropertySubTypeById,
    getAllPropertiesOfParticularPropertyType,
    uploadPropertySubTypeFromCsv
} from "../controllers/controller.propertySubType.js";

import { 
    propertySubTypeCreationValidation,
    propertySubTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertySubType.js";

import upload from "../middlewares/upload.js";



const propertySubTypeRoute = Router();


propertySubTypeRoute.post('/',propertySubTypeCreationValidation,createPropertySubType)
propertySubTypeRoute.get('/',getAllPropertySubType)
propertySubTypeRoute.get('/:property_sub_type',getParticularPropertySubTypeById)
propertySubTypeRoute.get('/type/:property_type',getAllPropertiesOfParticularPropertyType)
propertySubTypeRoute.put('/:property_sub_type',propertySubTypeUpdationValidation,updatePropertySubTypeById)
// propertySubTypeRoute.delete('/:property_sub_type',deletePropertySubType)
propertySubTypeRoute.post('/upload-csv',upload.single('csvFile'),uploadPropertySubTypeFromCsv);

export default propertySubTypeRoute;