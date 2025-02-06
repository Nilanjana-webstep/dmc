import { statusCode } from "../../config/constraint.js";
import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    NirmalBandhuCreationValidationModel,
    NirmalBandhuUpdationValidationModel 
} from "../../validations/validation.nirmalBandhuModel.js";

export const nirmalBandhuCreationValidation = (req,res,next)=>{

    if ( !req.file ){
        return next( new CustomError("Please upload adhar card.",statusCode.BAD_REQUEST));
    }
    
    const  { error } =  NirmalBandhuCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}


export const nirmalBandhuUpdationValidation = (req,res,next)=>{

    const  { error } =  NirmalBandhuUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));         
    }

    next();
}
