import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Consumer from "./model.Consumer.js";

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
    bill_amount : {
      type : DataTypes.DECIMAL,
      allowNull : false,
    },
    due_date : {
      type : DataTypes.DATEONLY,
      allowNull : false,
    },
    paid_status : {
      type : DataTypes.BOOLEAN,
      defaultValue : false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);


// Consumer.hasMany(Bill, { foreignKey: 'consumer_id' });
// Bill.belongsTo(Consumer, { foreignKey: 'consumer_id' });




// if ( Bill == sequelize.models.bills ){
//   sequelize.query("ALTER TABLE bills AUTO_INCREMENT = 1000001;");
// }



export default Bill;