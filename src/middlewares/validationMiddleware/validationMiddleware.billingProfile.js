import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    BillingProfileCreationValidationModel,
    BillingProfileUpdationValidationModel,
} from "../../validations/validation.billingProfileModel.js";



export const billingProfileCreationValidation = (req,res,next)=>{

    const  { error } =  BillingProfileCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}


export const billingProfileUpdationValidation = (req,res,next)=>{

    const  { error } =  BillingProfileUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}


