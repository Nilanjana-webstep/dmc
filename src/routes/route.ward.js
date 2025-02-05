import { Router } from "express";
import { 
    createWard,
    getAllWard,
    getAllWardForParticularBorough,
    updateWardById,
    uploadWardFromCsv
} from "../controllers/controller.ward.js";

import { 
    WardCreationValidation,
    WardUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.ward.js";

import  { uploadCsv } from "../middlewares/upload.js";

const wardRoute = Router();

wardRoute.post('/',WardCreationValidation,createWard);
wardRoute.get('/',getAllWard);
wardRoute.get('/by-borough/:borough_id',getAllWardForParticularBorough);
wardRoute.put('/:id',WardUpdationValidation,updateWardById);
wardRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadWardFromCsv);


export default wardRoute;