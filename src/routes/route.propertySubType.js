import { Router } from "express";
import { 
    createPropertySubType,
    getAllPropertySubType,
    getParticularPropertySubTypeById,
    updatePropertySubTypeById,
    getAllPropertySubTypeOfParticularPropertyType,
    uploadPropertySubTypeFromCsv
} from "../controllers/controller.propertySubType.js";

import { 
    propertySubTypeCreationValidation,
    propertySubTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertySubType.js";

import  { uploadCsv } from "../middlewares/upload.js";



const propertySubTypeRoute = Router();


propertySubTypeRoute.post('/',propertySubTypeCreationValidation,createPropertySubType)
propertySubTypeRoute.get('/',getAllPropertySubType)
propertySubTypeRoute.get('/:property_sub_type',getParticularPropertySubTypeById)
propertySubTypeRoute.get('/property-type/:property_type',getAllPropertySubTypeOfParticularPropertyType)
propertySubTypeRoute.put('/:property_sub_type',propertySubTypeUpdationValidation,updatePropertySubTypeById)
propertySubTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadPropertySubTypeFromCsv);

export default propertySubTypeRoute;