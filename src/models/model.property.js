import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import PropertyType from './model.propertyType.js';
import Ward from './model.ward.js';
import PropertySubType from './model.propertySubType.js';

const Property = sequelize.define(
  'property',
  {
    consumer_id : {
      type : DataTypes.STRING,
      allowNull : true,
      unique : true,
    },
    property_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_2: {
      type: DataTypes.STRING,
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
    freezeTableName: true,
    timestamps: true,
  },
);

Ward.hasMany(Property)
Property.belongsTo(Ward)

PropertyType.hasMany(Property)
Property.belongsTo(PropertyType)

PropertySubType.hasMany(Property)
Property.belongsTo(PropertySubType)




export default Property;
