import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { statusCode } from "../../config/constraint.js";
import { 
    BoroughCreationValidationModel,
    BoroughUpdationValidationModel,
} from "../../validations/validation.boroughModel.js";

export const BoroughCreationValidation = (req,res,next)=>{

    const  { error } =  BoroughCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,statusCode.BAD_REQUET_STATUS_CODE));  
    }

    next();

}


export const BoroughUpdationValidation = (req,res,next)=>{

    const  { error } =  BoroughUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,statusCode.BAD_REQUET_STATUS_CODE));            
    }

    next();

}
