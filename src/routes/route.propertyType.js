import { Router } from "express";
import { 
    createPropertyType,
    getAllPropertyType,
    getParticularPropertyTypeById,
    updatePropertyTypeById,
    uploadPropertyTypeFromCsv
} from "../controllers/controller.propertyType.js";

import { 
    propertyTypeCreationValidation,
    propertyTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertyType.js";

import  { uploadCsv } from "../middlewares/upload.js";

const propertyTypeRoute = Router();


propertyTypeRoute.post('/',propertyTypeCreationValidation,createPropertyType)
propertyTypeRoute.get('/',getAllPropertyType)
propertyTypeRoute.get('/:property_type_id',getParticularPropertyTypeById)
propertyTypeRoute.put('/:property_type_id',propertyTypeUpdationValidation,updatePropertyTypeById)
propertyTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadPropertyTypeFromCsv);


export default propertyTypeRoute;