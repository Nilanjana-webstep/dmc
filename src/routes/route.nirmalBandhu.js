import { Router } from "express";
import { 
    createNirmalBandhu,
    getAllNirmalBandhu,
    getParticularNirmalBandhuById,
    updateNirmalBandhuById,
    deleteNirmalBandhuById
 } from "../controllers/controller.nirmalBandhu.js";

import { 
    nirmalBandhuCreationValidation,
    nirmalBandhuUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.nirmalBandhu.js";
import { uploadAdhar } from "../middlewares/upload.js";


const nirmalBandhuRoute = Router();

nirmalBandhuRoute.route('')
    .post(uploadAdhar.single('adhar_card_photo'),nirmalBandhuCreationValidation,createNirmalBandhu)
    .get(getAllNirmalBandhu)

nirmalBandhuRoute.route('/:id')
    .get(getParticularNirmalBandhuById)
    .put(uploadAdhar.single('adhar_card_photo'),nirmalBandhuUpdationValidation,updateNirmalBandhuById)
    .delete(deleteNirmalBandhuById)


export default nirmalBandhuRoute;