import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    CustomerCreationValidationModel,
    CustomerUpdationValidationModel,
} from "../../validations/validation.customerModel.js";

import { 
    ConsumerCreationValidationModel,
} from "../../validations/validation.ConsumerModel.js";



export const customerCreationWithConsumerValidation = async(req,res,next)=>{

    const { consumer ,customer } = req.body;

    if ( !customer || !consumer ){
        return next( new CustomError("Please provide both customer and Consumer",401));
    }

    if ( customer ){

        const  { error } =  CustomerCreationValidationModel.validate(customer);

        if ( error ){
            
            const errorMessage = error.details[0].message;
            const message = makeClearMessage(errorMessage);
            return next( new CustomError(message,400));
                    
        }
    }

    if ( consumer ){

        const  { error } =  ConsumerCreationValidationModel.validate(consumer);
    
        if ( error ){
            
            const errorMessage = error.details[0].message;
            const message = makeClearMessage(errorMessage);
            return next( new CustomError(message,400));
                    
        }
    }

    next();

}




export const customerCreationValidation = async(req,res,next)=>{
    
    const  { error } =  CustomerCreationValidationModel.validate(req.body.customer);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const customerUpdationValidation = async(req,res,next)=>{

    const  { error } =  CustomerUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
