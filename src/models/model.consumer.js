import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ward from './model.ward.js';
import PropertySubType from './model.PropertySubType.js';
import Customer from './model.customer.js';
import PropertyType from './model.propertyType.js';

const Consumer = sequelize.define(
  'consumers',
  {
    consumer_id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true,
    },
    street_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_2: {
      type: DataTypes.STRING,
    },
    property_no : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    pincode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    billing_address : {
      type : DataTypes.STRING,
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
  },
);


Customer.hasMany(Consumer, { foreignKey: 'customer_id' });
Consumer.belongsTo(Customer, { foreignKey: 'customer_id' });

Ward.hasMany(Consumer);
Consumer.belongsTo(Ward);

PropertyType.hasMany(Consumer);
Consumer.belongsTo(PropertyType);

PropertySubType.hasMany(Consumer);
Consumer.belongsTo(PropertySubType);




export default Consumer;
