import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const ServiceType = sequelize.define(
  'service_types',
  {
   
    service_type : {
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




export default ServiceType;
