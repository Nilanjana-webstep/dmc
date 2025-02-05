import { Router } from "express";
import { 
    updateConsumerById,
    deleteConsumerById,
    getAllConsumer,
    getParticularConsumerByConsumerId, 
    getAllConsumerByPartucularCustomerId,
} from "../controllers/controller.Consumer.js";
import {
    ConsumerUpdationValidation,
} from "../middlewares/validationMiddleware/validationMiddleware.Consumer.js"

const ConsumerRoute = Router();

ConsumerRoute.get('/',getAllConsumer)
ConsumerRoute.get('/customer-id/:id',getAllConsumerByPartucularCustomerId)
ConsumerRoute.get('/:consumer_id',getParticularConsumerByConsumerId)
ConsumerRoute.put('/:id',ConsumerUpdationValidation,updateConsumerById)
ConsumerRoute.delete('/:id',deleteConsumerById)


export default ConsumerRoute;