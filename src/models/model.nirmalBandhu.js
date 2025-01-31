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
            type: DataTypes.INTEGER,
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
        street_2: {
            type : DataTypes.STRING,
            allowNull : true
        },
        landmark : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        adhar_no : {
            type : DataTypes.BIGINT,
            allowNull : false
        },
        adhar_card : {
            type : DataTypes.STRING,
            allowNull : false
        },
        start_date : {
            type : DataTypes.DATEONLY,
            allowNull : false
        },
        ward_no : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        status : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
    }
)

Ward.hasMany(NirmalBandhu);
NirmalBandhu.belongsTo(Ward);


if ( NirmalBandhu == sequelize.models.nirmal_bandhus){
    sequelize.query("ALTER TABLE nirmal_bandhus AUTO_INCREMENT = 1000001;");
}

export default NirmalBandhu;