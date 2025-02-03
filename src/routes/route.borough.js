import { Router } from "express";
import  { uploadCsv } from "../middlewares/upload.js";
import { 
    createBorough,
    getAllBorough,
    updateBoroughById,
    uploadBoroughFromCsv,
} from "../controllers/controller.borough.js";
import { 
    BoroughCreationValidation,
    BoroughUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.borough.js";

const boroughRoute = Router();

boroughRoute.post('/',BoroughCreationValidation,createBorough);
boroughRoute.get('/',getAllBorough);
boroughRoute.put('/:id',BoroughUpdationValidation,updateBoroughById);
boroughRoute.post('/upload-csv',uploadCsv.single('csvFile'),uploadBoroughFromCsv);


export default boroughRoute;