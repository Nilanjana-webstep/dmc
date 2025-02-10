import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    ServiceDetailCreationModel,
    ServiceDetailUpdationValidationModel,
} from "../../validations/validation.serviceDetailModel.js";



export const serviceDetailCreationValidation = (req,res,next)=>{

    const  { error } =  ServiceDetailCreationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const serviceDetailUpdationValidation = (req,res,next)=>{

    const  { error } = ServiceDetailUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
