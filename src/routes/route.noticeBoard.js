import { Router } from "express";
import { 
    createNotice,
    getActiveAllNotice,
    updateNotice,
} from "../controllers/controller.noticeBoard.js";
import { 
    noticeBoardCreationValidation,
    noticeBoardUpdationValidation,

} from "../middlewares/validationMiddleware/validationMiddleware.noticeBoard.js";




const noticeBoardRoute  = Router();

noticeBoardRoute.post('/',noticeBoardCreationValidation,createNotice);
noticeBoardRoute.get('/',getActiveAllNotice)
noticeBoardRoute.put('/:id',noticeBoardUpdationValidation,updateNotice)




export default noticeBoardRoute;