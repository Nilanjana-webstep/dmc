import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    CustomerCreationValidationModel,
    CustomerUpdationValidationModel,
} from "../../validations/validation.customerModel.js";

import { 
    PropertyCreationValidationModel,
} from "../../validations/validation.propertyModel.js";

import { 
    PropertyTypeCreationValidationModel,
} from "../../validations/validation.propertyTypeModel.js";

import { 
    PropertySubTypeCreationValidationModel,
} from "../../validations/validation.propertySubTypeModel.js";

import { WardCreationValidationModel } from "../../validations/validation.wardModel.js";

export const customerCreationValidation = async(req,res,next)=>{
    
    const  { error } =  CustomerCreationValidationModel.validate(req.body);

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
