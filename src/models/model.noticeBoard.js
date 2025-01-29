import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NoticeBoard = sequelize.define(
    'notice_boards',
    {
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        content : {
            type : DataTypes.TEXT,
            allowNull: false,
        },
        start_date : {
            type: DataTypes.DATE,
            allowNull : false,
        },
        end_date : {
            type : DataTypes.DATE,
            allowNull : true,
        },
        is_active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        },
        
    },
    {
        timestamps : true,
        freezeTableName: true,
    },
)


export default NoticeBoard;