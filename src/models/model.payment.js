import { DataTypes, NOW } from "sequelize";
import sequelize from "../config/db.js";
import Customer from "./model.customer.js";

const Payment = sequelize.define(
  'payments',
  {
    payment_id : {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_amount : {
        type : DataTypes.DECIMAL,
        allowNull : false,
    },
    payment_method : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    Payment_date : {
      type : DataTypes.DATE,
      defaultValue  : NOW,
    },
 
  },
  {
    initialAutoIncrement: 1000001,
    freezeTableName: true,
    timestamps: true,
  }
);



Customer.hasMany(Payment,{foreignKey:'customer_id'})
Payment.belongsTo(Customer,{foreignKey:'customer_id'});





export default Payment;