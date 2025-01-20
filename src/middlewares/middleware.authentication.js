import CustomError from "../utils/util.customError.js";
import { varifyToken } from "../utils/utis.jwt.js";

export const authenticationMiddleware = async( req,res,next)=>{
    try {
        
        const token = req.headers['authorization'].split(' ')[1];
        
        if ( !token ){

            return next( new CustomError("Unauthenticated user.",403));

        }

        const payload = varifyToken(token);
            
        req.user = payload;
        next();

    } catch (error) {

        console.log(error.message);
        next( new CustomError(error.message,403));
        
    }
}