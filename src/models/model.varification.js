import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Varification = sequelize.define(
  'varification',
  { 
   
    mobile_number : {
      type: DataTypes.INTEGER,
      allowNull : false,
      unique : true,
    },
    captcha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_expire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_authenticate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
   
  },
  {
    freezeTableName: true,
    timestamps: true,
 
  }  
);





export default Varification;
