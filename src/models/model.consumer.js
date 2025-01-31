import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ward from './model.ward.js';
import PropertySubType from './model.PropertySubType.js';
import Customer from './model.customer.js';
import PropertyType from './model.propertyType.js';

const Consumer = sequelize.define(
  'consumers',
  {
    consumer_id : {
      type : DataTypes.BIGINT,
      primaryKey : true,
      autoIncrement : true,
    },
    street_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_2: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    billing_address : {
      type : DataTypes.STRING,
      allowNull : false,
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


Customer.hasMany(Consumer, { foreignKey: 'customer_id' });
Consumer.belongsTo(Customer, { foreignKey: 'customer_id' });

Ward.hasMany(Consumer)
Consumer.belongsTo(Ward)

PropertyType.hasMany(Consumer)
Consumer.belongsTo(PropertyType)

PropertySubType.hasMany(Consumer)
Consumer.belongsTo(PropertySubType)

if ( Consumer == sequelize.models.consumers){
  sequelize.query("ALTER TABLE consumers AUTO_INCREMENT = 1000001;");
}


export default Consumer;
