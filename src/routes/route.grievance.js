import { Router } from "express";
import { 
    createGrievance,
    deleteGrievanceById,
    getAllGrievance,
    getAllGrievanceByPartucularCustomerId,
    updateGrievanceById,
    
} from "../controllers/controller.grievance.js";
import { 
    grievanceCreationValidation,
    grievanceUpdationValidation,

} from "../middlewares/validationMiddleware/validationMiddleware.grievance.js";

import { uploadGrievancePhoto } from "../middlewares/upload.js";


const grievanceRoute = Router();

grievanceRoute.post('/',uploadGrievancePhoto.single('grievance_photo'),grievanceCreationValidation,createGrievance)
grievanceRoute.get('/',getAllGrievance)
grievanceRoute.get('/customer-id/:id',getAllGrievanceByPartucularCustomerId)
grievanceRoute.put('/:id',grievanceUpdationValidation,updateGrievanceById)
grievanceRoute.delete('/:id',deleteGrievanceById)


export default grievanceRoute;