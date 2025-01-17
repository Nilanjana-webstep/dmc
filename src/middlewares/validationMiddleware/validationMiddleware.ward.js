import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    WardCreationValidationModel,
    WardUpdationValidationModel,
} from "../../validations/validation.wardModel.js";

export const WardCreationValidation = (req,res,next)=>{

    const  { error } =  WardCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const WardUpdationValidation = (req,res,next)=>{

    const  { error } =  WardUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
