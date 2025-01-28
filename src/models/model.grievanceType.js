import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import GrievanceSubType from './model.grievanceSubType.js';


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


GrievanceType.hasMany(GrievanceSubType);
GrievanceSubType.belongsTo(GrievanceType);

export default GrievanceType;
