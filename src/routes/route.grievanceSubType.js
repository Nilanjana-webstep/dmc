import { Router } from "express";




import  { uploadCsv } from "../middlewares/upload.js";
import { 
    grievanceSubTypeCreationValidation,
    grievanceSubTypeUpdationValidation
} from "../middlewares/validationMiddleware/validationMiddleware.grievance.js";
import { 
    createGrievanceSubType,
    getAllGrievanceSubType,
    getAllGrievanceSubTypeOfParticularGrievanceType,
    updateGrievanceSubTypeById,
    uploadGrievanceSubTypeFromCsv,
} from "../controllers/controller.grievanceSubtype.js";


const grievanceSubTypeRoute = Router();


grievanceSubTypeRoute.post('/',grievanceSubTypeCreationValidation,createGrievanceSubType)
grievanceSubTypeRoute.get('/',getAllGrievanceSubType)
grievanceSubTypeRoute.get('/grievance-type/:grievance_type_id',getAllGrievanceSubTypeOfParticularGrievanceType)
grievanceSubTypeRoute.put('/:id',grievanceSubTypeUpdationValidation,updateGrievanceSubTypeById)
grievanceSubTypeRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadGrievanceSubTypeFromCsv);


export default grievanceSubTypeRoute;