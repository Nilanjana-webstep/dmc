import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    PropertyCreationValidationModel,
    PropertyUpdationValidationModel,

 } from "../../validations/validation.propertyModel.js";

export const propertyCreationValidation = (req,res,next)=>{

    
    

    const  { error } =  PropertyCreationValidationModel.validate(req.body.property);

    console.log("the error is : ",error);
    

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const propertyUpdationValidation = (req,res,next)=>{

    const  { error } =  PropertyUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
