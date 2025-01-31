import {  DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Varification = sequelize.define(
    'varifications',
    {
        mobile_number: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expire_in: {
            type: DataTypes.DATE,
            
        }
    },
    {
        freezeTableName: true,
        hooks: {
            beforeCreate: (varification) => {
                varification.expire_in = new Date(Date.now() + 5 * 60 * 1000); 
            }
        }
    }
);

export default Varification;
