import { Router } from "express";


import { 
    createServiceType,
    updateServiceTypeById,
    getAllServiceType,
} from "../controllers/controller.serviceType.js";
import { 
    serviceTypeCreationValidation,
    serviceTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.serviceType.js";

const serviceTypeRoute = Router();


serviceTypeRoute.post('/',serviceTypeCreationValidation,createServiceType)
serviceTypeRoute.get('/',getAllServiceType)
serviceTypeRoute.put('/:id',serviceTypeUpdationValidation,updateServiceTypeById)
// serviceTypeRoute.post('/upload-csv',upload.single('csvFile'),uploadPropertyTypeFromCsv);


export default serviceTypeRoute;