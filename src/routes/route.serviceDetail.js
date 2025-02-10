import { Router } from "express";
import { 
    createServiceDetails,
    getAllServiceDetails,
    getServiceDetailsByServiceTypes,
    updateServiceDetails,
} from "../controllers/controller.serviceDetail";
import { serviceDetailCreationValidation, serviceDetailUpdationValidation } from "../middlewares/validationMiddleware/validationMiddleware.serviceDetail";

const serviceDetailRoute = Router();

serviceDetailRoute.post('',serviceDetailCreationValidation,createServiceDetails);
serviceDetailRoute.get('',getAllServiceDetails);
serviceDetailRoute.put('/:id',serviceDetailUpdationValidation,updateServiceDetails);
serviceDetailRoute.get('/by-service-type/:id',getServiceDetailsByServiceTypes);


export default serviceDetailRoute;