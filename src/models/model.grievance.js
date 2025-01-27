import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import GrievanceType from "./model.grievanceType.js";
import GrievanceSubType from "./model.grievanceSubType.js";

const Grievance = sequelize.define(

    'grievance',

    {
        message : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        address : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        grievance_photo : {
            type : DataTypes.STRING,
            allowNull:true,
        },
        is_active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        }


    },
    {
        freezeTableName: true,
        timestamps: true,
    },

)



GrievanceType.hasMany(Grievance)
Grievance.belongsTo(GrievanceType)

GrievanceSubType.hasMany(Grievance)
Grievance.belongsTo(GrievanceSubType)

export default Grievance;