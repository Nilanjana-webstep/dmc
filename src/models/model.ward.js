import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Borough from './model.borough.js';


const Ward = sequelize.define(
  'wards',
  { 
    ward : {
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

Borough.hasMany(Ward);
Ward.belongsTo(Borough);


export default Ward;
