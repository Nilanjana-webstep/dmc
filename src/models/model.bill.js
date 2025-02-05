import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Consumer from "./model.consumer.js";
import Customer from "./model.customer.js";

const Bill = sequelize.define(
  'bills',
  {
    bill_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    bill_month : {
      type : DataTypes.DATEONLY,
      allowNull : false,
    },
    paid_status : {
      type : DataTypes.BOOLEAN,
      defaultValue : false,
    }
  },
  {
    initialAutoIncrement: 1000001,
    freezeTableName: true,
    timestamps: true,
  }
);


Consumer.hasMany(Bill, { foreignKey: 'consumer_id' });
Bill.belongsTo(Consumer, { foreignKey: 'consumer_id' });

Customer.hasMany(Bill, { foreignKey: 'customer_id' });
Bill.belongsTo(Customer, { foreignKey: 'customer_id' });




export default Bill;