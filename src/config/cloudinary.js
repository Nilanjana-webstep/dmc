import { v2 as cloudinary } from 'cloudinary'
import { ENV_VARIALBE } from './.envConfig.js';

cloudinary.config({ 
    cloud_name: ENV_VARIALBE.CLOUDINARY_ClOUD_NAME, 
    api_key: ENV_VARIALBE.CLOUDINARY_API_KEY, 
    api_secret: ENV_VARIALBE.CLOUDINARY_API_SECRET
});

export { cloudinary}