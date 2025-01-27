import { Router } from "express";
import { 
    createGrievanceType,
    getAllGrievanceType,
    updateGrievanceTypeById,
    uploadGrievanceTypeFromCsv,
    
} from "../controllers/controller.grievanceType.js";



import  { uploadCsv } from "../middlewares/upload.js";
import { grievanceTypeCreationValidation, grievanceTypeUpdationValidation } from "../middlewares/validationMiddleware/validationMiddleware.grievance.js";


const grievanceTypeRoute = Router();


grievanceTypeRoute.post('/',grievanceTypeCreationValidation,createGrievanceType)
grievanceTypeRoute.get('/',getAllGrievanceType)
grievanceTypeRoute.put('/:id',grievanceTypeUpdationValidation,updateGrievanceTypeById)
grievanceTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadGrievanceTypeFromCsv);


export default grievanceTypeRoute;