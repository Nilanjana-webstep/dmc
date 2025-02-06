import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ward from './model.ward.js';
import PropertySubType from './model.propertySubType.js';
import Customer from './model.customer.js';
import PropertyType from './model.propertyType.js';
import Borough from './model.borough.js';
import BillingProfile from './model.billingProfile.js';

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
      allowNull : true,
    },
    property_no : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billing_address : {
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
  },
);


Customer.hasMany(Consumer, { foreignKey: 'customer_id' });
Consumer.belongsTo(Customer, { foreignKey: 'customer_id' });

Ward.hasMany(Consumer);
Consumer.belongsTo(Ward);

Borough.hasMany(Consumer);
Consumer.belongsTo(Borough);

PropertyType.hasMany(Consumer);
Consumer.belongsTo(PropertyType);

PropertySubType.hasMany(Consumer);
Consumer.belongsTo(PropertySubType);

BillingProfile.hasMany(Consumer);
Consumer.belongsTo(BillingProfile);



export default Consumer;
