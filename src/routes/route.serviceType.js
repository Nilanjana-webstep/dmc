import { Router } from "express";
import { 
    createServiceType,
    updateServiceTypeById,
    getAllServiceType,
    uploadServiceTypeFromCsv
} from "../controllers/controller.serviceType.js";

import { 
    serviceTypeCreationValidation,
    serviceTypeUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.serviceType.js";

import { uploadCsv } from "../middlewares/upload.js";

const serviceTypeRoute = Router();

serviceTypeRoute.post('/',serviceTypeCreationValidation,createServiceType)
serviceTypeRoute.get('/',getAllServiceType)
serviceTypeRoute.put('/:id',serviceTypeUpdationValidation,updateServiceTypeById)
serviceTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadServiceTypeFromCsv);


export default serviceTypeRoute;