import { Router } from "express";
import { 
    bookService,
    getAllBookedService,
    getAllBookedServiceOfParticularCustomer,
} from "../controllers/controller.bookService.js";
import { 
    serviceBookingValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.bookService.js";


const bookServiceRoute = Router();

bookServiceRoute.post('/',serviceBookingValidation,bookService);
bookServiceRoute.get('/',getAllBookedService)
bookServiceRoute.get('/customer-id/:id',getAllBookedServiceOfParticularCustomer)



export default bookServiceRoute;



