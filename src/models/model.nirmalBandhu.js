import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Ward from "./model.ward.js";
import Borough from "./model.borough.js";


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
        street_1 : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        street_2 : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        landmark : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        adhar_number : {
            type : DataTypes.STRING,
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
        is_active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        }

    },
    {   
        initialAutoIncrement: 1000001,
        freezeTableName: true,
        timestamps: true,
    }
)

Ward.hasMany(NirmalBandhu);
NirmalBandhu.belongsTo(Ward);

Borough.hasMany(NirmalBandhu);
NirmalBandhu.belongsTo(Borough);




export default NirmalBandhu;