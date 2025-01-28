import { Router } from "express";
import { 
    bookService,
} from "../controllers/controller.bookService.js";
import { 
    serviceBookingValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.bookService.js";


const bookServiceRoute = Router();

bookServiceRoute.post('/',serviceBookingValidation,bookService);
// grievanceRoute.get('/',getAllGrievance)
// grievanceRoute.get('/customer-id/:id',getAllGrievanceByPartucularCustomerId)
// grievanceRoute.put('/:id',grievanceUpdationValidation,updateGrievanceById)
// grievanceRoute.delete('/:id',deleteGrievanceById)


export default bookServiceRoute;