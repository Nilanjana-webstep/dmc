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
      type: DataTypes.INTEGER,
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

if ( Customer == sequelize.models.customers ){
  sequelize.query("ALTER TABLE customers AUTO_INCREMENT = 1000001;");
}

export default Customer;



