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
    freezeTableName: true,
    timestamps: true,
  }
);



// Customer.hasMany(Payment)
// Payment.belongsTo(Customer);

// if ( Payment == sequelize.models.payments ){
//   sequelize.query("ALTER TABLE payments AUTO_INCREMENT = 1000001;");
// }



export default Payment;