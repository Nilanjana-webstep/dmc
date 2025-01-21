import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Property from './model.property.js';

const Customer = sequelize.define(
  'customer',
  { 
   
    consumer_id : {
      type: DataTypes.STRING,
      allowNull : true,
      unique : true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique : true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sex: {
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


Customer.hasMany(Property)
Property.belongsTo(Customer)


export default Customer;
