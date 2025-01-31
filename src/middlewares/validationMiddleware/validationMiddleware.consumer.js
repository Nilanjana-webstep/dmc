import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    ConsumerCreationValidationModel,
    ConsumerUpdationValidationModel,

 } from "../../validations/validation.ConsumerModel.js";

export const ConsumerCreationValidation = (req,res,next)=>{

    const  { error } =  ConsumerCreationValidationModel.validate(req.body.Consumer); 

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const ConsumerUpdationValidation = (req,res,next)=>{

    const  { error } =  ConsumerUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
