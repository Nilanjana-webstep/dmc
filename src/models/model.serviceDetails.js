import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const ServiceDetail = sequelize.define(
  'service_details',
  {
    service_detail : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_charge : {
      type: DataTypes.DECIMAL,
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




export default ServiceDetail;
