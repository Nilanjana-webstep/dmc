import { Router } from "express";
import { 
    createNotice,
    deleteNotice,
    getActiveAllNotice,
    updateNotice,
} from "../controllers/controller.noticeBoard.js";
import { 
    noticeBoardCreationValidation,

} from "../middlewares/validationMiddleware/validationMiddleware.noticeBoard.js";




const noticeBoardRoute  = Router();

noticeBoardRoute.post('/',noticeBoardCreationValidation,createNotice);
noticeBoardRoute.get('/',getActiveAllNotice)
noticeBoardRoute.put('/:id',updateNotice)
noticeBoardRoute.delete('/:id',deleteNotice)



export default noticeBoardRoute;