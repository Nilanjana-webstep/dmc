import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const PropertyOwner = sequelize.define(
  'property_owner',
  { 
   
    property_id : {
      type: DataTypes.STRING,
      allowNull : true,
      unique : true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    property_register_number : {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
    },
    property_area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    adhar_no : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    ward_no : {
        type : DataTypes.INTEGER,
        allowNull:false
    },    
    sex: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    address : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
   
  },
  {
    freezeTableName: true,
    timestamps: true,
  }  
);





export default PropertyOwner;



