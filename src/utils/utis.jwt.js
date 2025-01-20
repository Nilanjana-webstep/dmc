import jwt from 'jsonwebtoken';
import { ENV_VARIALBE } from '../config/.envConfig.js';

export const generateToken =  (payload)=>{

    const token = jwt.sign(payload,ENV_VARIALBE.SECRET_KEY,{expiresIn:'30d'})
    return token;
}


export const varifyToken =  (token)=>{
    const payload = jwt.verify(token,ENV_VARIALBE.SECRET_KEY);
    return payload;
}