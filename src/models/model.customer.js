import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Customer = sequelize.define(
  'customers',
  { 
    customer_id : {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement : true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    address : {
      type : DataTypes.TEXT,
      allowNull : false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
   
  },
  {
    initialAutoIncrement: 1000001,
    freezeTableName: true,
    timestamps: true,
  }  
);



export default Customer;



