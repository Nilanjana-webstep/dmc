import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    ServiceTypeCreationValidationModel,
    ServiceTypeUpdationValidationModel,
} from "../../validations/validation.serviceTypeModel.js";


export const serviceTypeCreationValidation = (req,res,next)=>{

    const  { error } =  ServiceTypeCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const serviceTypeUpdationValidation = (req,res,next)=>{

    const  { error } =  ServiceTypeUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
