import  Sequelize from 'sequelize';
import { ENV_VARIALBE } from './.envConfig.js';


const sequelize = new Sequelize(ENV_VARIALBE.DB_NAME, ENV_VARIALBE.DB_USER, ENV_VARIALBE.DB_PASSWORD, {
  host:ENV_VARIALBE.DB_HOST,
  dialect: 'mysql' ,
  logging: false,
});


export default sequelize;