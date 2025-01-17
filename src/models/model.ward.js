import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Ward = sequelize.define(
  'ward',
  {
   
    ward_no: {
      type: DataTypes.INTEGER,
      unique : true
    },
    boroghs_no: {
      type: DataTypes.INTEGER,
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





export default Ward;
