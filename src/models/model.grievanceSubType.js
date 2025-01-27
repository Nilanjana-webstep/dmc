import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';



const GrievanceSubType = sequelize.define(
  'grievance_sub_type',
  {
   
    grievance_sub_type_name : {
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




export default GrievanceSubType;
