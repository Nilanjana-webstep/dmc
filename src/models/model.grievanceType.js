import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const GrievanceType = sequelize.define(
  'grievance_types',
  {
   
    grievance_type: {
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




export default GrievanceType;
