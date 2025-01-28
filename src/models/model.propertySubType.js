import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



const PropertySubType = sequelize.define(
  'property_sub_types',
  {
   
    property_sub_type : {
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




export default PropertySubType;
