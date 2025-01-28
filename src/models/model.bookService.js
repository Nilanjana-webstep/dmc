import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ServiceType from './model.serviceType.js';
import Ward from './model.ward.js';
import NirmalBandhu from './model.nirmalBandhu.js';


const BookService = sequelize.define(
  'booked_services',
  { 
   
    address : {
      type: DataTypes.TEXT,
      allowNull : true,
    },
    service_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    service_description : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    is_paid : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
   
  },
  {
    freezeTableName: true,
    timestamps: true,
  }  
);


ServiceType.hasMany(BookService)
BookService.belongsTo(ServiceType)

Ward.hasMany(BookService)
BookService.belongsTo(Ward)

NirmalBandhu.hasMany(BookService)
BookService.belongsTo(NirmalBandhu)


export default BookService;



