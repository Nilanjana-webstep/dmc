import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    PropertySubTypeCreationValidationModel,
    PropertySubTypeUpdationValidationModel,
} from "../../validations/validation.propertySubTypeModel.js";

export const propertySubTypeCreationValidation = (req,res,next)=>{

    const  { error } =  PropertySubTypeCreationValidationModel.validate(req.body);    

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();
}

export const propertySubTypeUpdationValidation = (req,res,next)=>{

    const  { error } =  PropertySubTypeUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400)); 
    }

    next();

}
