import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import GrievanceSubType from './model.grievanceSubType.js';


const GrievanceType = sequelize.define(
  'grievance_type',
  {
   
    grievance_type_name: {
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

export default GrievanceType;
