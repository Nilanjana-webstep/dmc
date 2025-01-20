import { Router } from "express";
import { 
    createWard,
    deleteWardById,
    getAllWard,
    getParticularWardById,
    updateWardById,
    uploadWardFromCsv
} from "../controllers/controller.ward.js";

import { 
    WardCreationValidation,
    WardUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.ward.js";


import upload from "../middlewares/upload.js";

const wardRoute = Router();


wardRoute.post('/',WardCreationValidation,createWard)
wardRoute.get('/',getAllWard)
wardRoute.get('/:ward_id',getParticularWardById)
wardRoute.put('/:ward_id',WardUpdationValidation,updateWardById)
wardRoute.post('/upload-csv',upload.single('csvFile'),uploadWardFromCsv);


export default wardRoute;