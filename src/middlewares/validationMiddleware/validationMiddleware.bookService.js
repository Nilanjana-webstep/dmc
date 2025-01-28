import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    ServiceBookingValidationModel,
    
} from "../../validations/validation.bookServiceModel.js";


export const serviceBookingValidation = (req,res,next)=>{

    const  { error } =  ServiceBookingValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}


