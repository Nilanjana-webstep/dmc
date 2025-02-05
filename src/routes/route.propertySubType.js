import { Router } from "express";
import { 
    createPropertySubType,
    getAllPropertySubType,
    getAllPropertySubTypeByPropertyType,
    updatePropertySubTypeById,
    uploadPropertySubTypeFromCsv,
} from "../controllers/controller.PropertySubType.js";

import { 
    propertySubTypeCreationValidation,
    propertySubTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.PropertySubType.js";

import  { uploadCsv } from "../middlewares/upload.js";

const propertySubTypeRoute = Router();


propertySubTypeRoute.post('/',propertySubTypeCreationValidation,createPropertySubType)
propertySubTypeRoute.get('/',getAllPropertySubType)
propertySubTypeRoute.get('/by-property-type/:id',getAllPropertySubTypeByPropertyType)
propertySubTypeRoute.put('/:id',propertySubTypeUpdationValidation,updatePropertySubTypeById)
propertySubTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadPropertySubTypeFromCsv);


export default propertySubTypeRoute;