import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    NoticeBoardCreationValidationModel,
    NoticeBoardUpdationValidationModel,
} from "../../validations/validation.noticeBoardModel.js";


export const noticeBoardCreationValidation = (req,res,next)=>{
    
    const  { error } =  NoticeBoardCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}


export const noticeBoardUpdationValidation = (req,res,next)=>{

    const  { error } =  NoticeBoardUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));         
    }

    next();
}
