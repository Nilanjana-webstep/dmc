import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARIALBE = {
    SERVER_PORT : process.env.SERVER_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY : process.env.SECRET_KEY,
}