import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    CustomerCreationValidationModel,
    CustomerUpdationValidationModel,
} from "../../validations/validation.customerModel.js";

import { 
    PropertyCreationValidationModel,
} from "../../validations/validation.propertyModel.js";



export const customerCreationWithPropertyValidation = async(req,res,next)=>{

    const {   property ,customer } = req.body;

    if ( !customer || !property ){
        return next( new CustomError("Please provide both customer and property",401));
    }

    if ( customer ){

        const  { error } =  CustomerCreationValidationModel.validate(customer);

        if ( error ){
            
            const errorMessage = error.details[0].message;
            const message = makeClearMessage(errorMessage);
            return next( new CustomError(message,400));
                    
        }
    }

    if ( property ){

        const  { error } =  PropertyCreationValidationModel.validate(property);
    
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
