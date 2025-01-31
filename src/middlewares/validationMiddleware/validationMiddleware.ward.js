import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    WardCreationValidationModel,
    WardUpdationValidationModel,
} from "../../validations/validation.wardModel.js";

import { statusCode } from "../../config/constraint.js";

export const WardCreationValidation = (req,res,next)=>{

    const  { error } =  WardCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,statusCode.BAD_REQUET_STATUS_CODE));  
    }

    next();

}


export const WardUpdationValidation = (req,res,next)=>{

    const  { error } =  WardUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,statusCode.BAD_REQUET_STATUS_CODE));            
    }

    next();

}
