import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import PropertySubType from './model.propertySubType.js';


const PropertyType = sequelize.define(
  'property_type',
  {
   
    property_type_name: {
      type: DataTypes.STRING,
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
  },
);


PropertyType.hasMany(PropertySubType);
PropertySubType.belongsTo(PropertyType);

export default PropertyType;
