import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Property from './model.property.js';
import Grievance from './model.grievance.js';
import BookService from './model.bookService.js';

const Customer = sequelize.define(
  'customers',
  { 
   
    customer_id : {
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
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    address : {
      type : DataTypes.STRING,
      allowNull : false,
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


Customer.hasMany(Grievance);
Grievance.belongsTo(Customer);

Customer.hasMany(BookService);
BookService.belongsTo(Customer);

export default Customer;



