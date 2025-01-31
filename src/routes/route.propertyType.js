import { Router } from "express";
import { 
    createPropertyType,
    getAllPropertyType,
    updatePropertyTypeById,
    uploadPropertyTypeFromCsv,
} from "../controllers/controller.PropertyType.js";

import { 
    propertyTypeCreationValidation,
    propertyTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.PropertyType.js";

import  { uploadCsv } from "../middlewares/upload.js";

const propertyTypeRoute = Router();

propertyTypeRoute.post('/',propertyTypeCreationValidation,createPropertyType)
propertyTypeRoute.get('/',getAllPropertyType)
propertyTypeRoute.put('/:id',propertyTypeUpdationValidation,updatePropertyTypeById)
propertyTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadPropertyTypeFromCsv);


export default propertyTypeRoute;