import { Router } from "express";
import { 
    createWard,
    deleteWardById,
    getAllWard,
    getParticularWardById,
    updateWardById
} from "../controllers/controller.ward.js";

import { 
    WardCreationValidation,
    WardUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.ward.js";

const wardRoute = Router();


wardRoute.post('/',WardCreationValidation,createWard)
wardRoute.get('/',getAllWard)
wardRoute.get('/:ward_id',getParticularWardById)
wardRoute.put('/:ward_id',WardUpdationValidation,updateWardById)
// wardRoute.delete('/:ward_id',deleteWardById)


export default wardRoute;