import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    PropertyTypeCreationValidationModel,
    PropertyTypeUpdationValidationModel,
} from "../../validations/validation.propertyTypeModel.js";

export const propertyTypeCreationValidation = (req,res,next)=>{

    const  { error } =  PropertyTypeCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const propertyTypeUpdationValidation = (req,res,next)=>{

    const  { error } =  PropertyTypeUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
