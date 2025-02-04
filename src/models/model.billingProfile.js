import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import PropertyType from './model.propertyType.js'
import PropertySubType from './model.propertySubType.js'


const BillingProfile = sequelize.define(
  'billing_profiles',
  { 
   
    billing_start_date : {
      type: DataTypes.DATEONLY,
      allowNull : false,
    },
    billing_due_date : {
      type: DataTypes.DATEONLY,
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


PropertyType.hasMany(BillingProfile);
BillingProfile.belongsTo(PropertyType);

PropertySubType.hasMany(BillingProfile);
BillingProfile.belongsTo(PropertySubType);


export default BillingProfile;



