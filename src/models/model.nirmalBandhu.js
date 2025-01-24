import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const NirmalBandhu = sequelize.define(
    'nirmal_bandhu',
    {
        full_name : {
            type : DataTypes.STRING,
            allowNull : true,
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
        adhar_card_url : {
            type : DataTypes.STRING,
            allowNull : false
        },
        adhar_card_public_id : {
            type : DataTypes.STRING,
            allowNull:false,
        },
        start_date : {
            type : DataTypes.DATEONLY,
            allowNull : false
        },
        ward_no : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        borough_no : {
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


export default NirmalBandhu;