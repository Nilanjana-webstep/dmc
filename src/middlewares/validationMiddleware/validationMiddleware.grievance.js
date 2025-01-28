import CustomError from "../../utils/util.customError.js";
import { makeClearMessage } from "../../utils/util.validation.js";
import { 
    GrievanceCreationValidationModel,
    GrievanceSubTypeCreationValidationModel,
    GrievanceSubTypeUpdationValidationModel,
    GrievanceTypeCreationValidationModel,
    GrievanceTypeUpdationValidationModel,
    GrievanceUpdationValidationModel,

} from "../../validations/validation.grievanceModel.js";


export const grievanceTypeCreationValidation = (req,res,next)=>{

    const  { error } =  GrievanceTypeCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}
export const grievanceCreationValidation = (req,res,next)=>{

    console.log("the file is : ",req.file);
    console.log("the file is : ",req.body);
    

    const  { error } =  GrievanceCreationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const grievanceUpdationValidation = (req,res,next)=>{

    const  { error } =  GrievanceUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const grievanceTypeUpdationValidation = (req,res,next)=>{

    const  { error } =  GrievanceTypeUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}


export const grievanceSubTypeCreationValidation = (req,res,next)=>{

    const  { error } =  GrievanceSubTypeCreationValidationModel.validate(req.body);    

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));        
    }

    next();

}

export const grievanceSubTypeUpdationValidation = (req,res,next)=>{

    const  { error } =  GrievanceSubTypeUpdationValidationModel.validate(req.body);

    if ( error ){
        
        const errorMessage = error.details[0].message;
        const message = makeClearMessage(errorMessage);
        return next( new CustomError(message,400));
                
    }

    next();

}




