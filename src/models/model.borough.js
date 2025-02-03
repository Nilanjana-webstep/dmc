import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Borough = sequelize.define(
  'boroughs',
  { 
    borough : {
      type: DataTypes.STRING,
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




export default Borough;
