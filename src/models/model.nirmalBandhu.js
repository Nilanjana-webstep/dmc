import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Ward from "./model.ward.js";


const NirmalBandhu = sequelize.define(
    'nirmal_bandhus',
    {   
        nirmal_bandhu_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        full_name : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true,
        },
        date_of_birth : {
            type : DataTypes.DATEONLY,
            allowNull : false,
        },
        gender : {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
        },
        address : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        adhar_no : {
            type : DataTypes.BIGINT,
            allowNull : false
        },
        adhar_card_photo : {
            type : DataTypes.STRING,
            allowNull : false
        },
        start_date : {
            type : DataTypes.DATEONLY,
            allowNull : false
        },
        status : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        }

    },
    {   
        initialAutoIncrement: 1000000,
        freezeTableName: true,
        timestamps: true,
    }
)

Ward.hasMany(NirmalBandhu);
NirmalBandhu.belongsTo(Ward);




export default NirmalBandhu;