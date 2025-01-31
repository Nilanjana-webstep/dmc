import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



const PropertyType = sequelize.define(
  'property_types',
  {
    property_type: {
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




export default PropertyType;
