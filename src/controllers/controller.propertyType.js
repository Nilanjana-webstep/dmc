import { statusCode } from "../config/constraint.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import { convertCsvToObject } from "../utils/utils.csv.js";


export const createPropertyType = async (req, res, next) => {
    try {
        const PropertyType = await PropertyType.create(req.body);
        
        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Property type created successfully.",
            data: PropertyType
        });

    } catch (error) {
        console.log("Error in creating property type : ", error);
        next( error );
    }
};


export const getAllPropertyType = async (req, res, next) => {
    try {

        const allPropertyTypes = await PropertyType.findAll();

        if ( allPropertyTypes.length < 1 ){

            return next ( new CustomError("No property Found.",statusCode.NOT_FOUND));
        }

        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all Property types successfully.",
            data: allPropertyTypes
        });

    } catch (error) {
       console.log("Error: ", error);
       next(error);
    }
};


export const updatePropertyTypeById = async (req, res, next) => {

    const { id } = req.params;
    try {
        const PropertyType = await PropertyType.findByPk(id);

        if (!PropertyType) {
           return next( new CustomError("No property found.",statusCode.NOT_FOUND));
        }

        const updatedConsumerType = updateDatabaseObject(req.body, PropertyType);

        await updatedConsumerType.save();

        return res.status(statusCode.OK).json({
            success: true,
            message: "Consumer type updated successfully.",
            data: updatedConsumerType
        });
    } catch (error) {

        console.log("Error in updating property type : ", error);
        next(error);
    }
};


export const uploadPropertyTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return next("No file selected.",statusCode.BAD_REQUEST);
        }

        const propertyType = convertCsvToObject(req.file,next);
        
        await PropertyType.bulkCreate(propertyType);

        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
        });

    } catch (error) {
        console.error("Error uploading property type  CSV:", error);
        next(error);
    }
};



