import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Ward = sequelize.define(
  'wards',
  {
    ward_no: {
      type: DataTypes.INTEGER,
      unique : true
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





export default Ward;
