import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import moment from "moment-timezone";

const NoticeBoard = sequelize.define(
    'notice_boards',
    {   
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('start_date');
                return rawValue ? moment(rawValue).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') : null;
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('end_date');
                return rawValue ? moment(rawValue).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss') : null;
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

export default NoticeBoard;
