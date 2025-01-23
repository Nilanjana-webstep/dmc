import { Router } from "express";

import { 
    propertyTypeCreationValidation,
    propertyTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.propertyType.js";

import upload from "../middlewares/upload.js";
import { createServiceType } from "../controllers/controller.serviceType.js";

const serviceTypeRoute = Router();


serviceTypeRoute.post('/',createServiceType)
// serviceTypeRoute.get('/',getAllPropertyType)
// serviceTypeRoute.get('/:property_type_id',getParticularPropertyTypeById)
// serviceTypeRoute.put('/:property_type_id',propertyTypeUpdationValidation,updatePropertyTypeById)
// serviceTypeRoute.post('/upload-csv',upload.single('csvFile'),uploadPropertyTypeFromCsv);


export default serviceTypeRoute;