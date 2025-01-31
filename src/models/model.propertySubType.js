import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import PropertyType from './model.propertyType.js';



const PropertySubType = sequelize.define(
  'property_sub_types',
  {
    property_sub_type : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    charge : {
      type : DataTypes.DECIMAL,
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



PropertyType.hasMany(PropertySubType);
PropertySubType.belongsTo(PropertyType);

export default PropertySubType;
