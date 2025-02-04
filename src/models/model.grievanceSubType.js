import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import GrievanceType from './model.grievanceType.js';



const GrievanceSubType = sequelize.define(
  'grievance_sub_types',
  {
   
    grievance_sub_type : {
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

GrievanceType.hasMany(GrievanceSubType);
GrievanceSubType.belongsTo(GrievanceType);


export default GrievanceSubType;
