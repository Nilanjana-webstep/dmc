import { statusCode } from "../config/constraint.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { convertCsvToObject } from "../utils/utils.csv.js";


export const createPropertyType = async (req, res, next) => {

    const { property_type } = req.body;

    try {

        const existPropertyType = await PropertyType.findOne({where:{property_type}});

        if ( existPropertyType ){
            return next( new CustomError("Property Type already exist.",statusCode.CONFLICT));
        }

       await PropertyType.create(req.body);
        
       return res.status(statusCode.CREATED).json({
            success: true,
            message: "Property type created successfully.",
       });

    } catch (error) {
        console.log("Error in creating property type : ", error);
        next( error );
    }
};


export const getAllPropertyType = async (req, res, next) => {
    try {

        const allPropertyTypes = await PropertyType.findAll();

        // if ( allPropertyTypes.length < 1 ){

        //     return next ( new CustomError("No property Found.",statusCode.NOT_FOUND));
        // }

        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all Property types successfully.",
            data: allPropertyTypes
        });

    } catch (error) {
       console.log("Error in getting all property type: ", error);
       next(error);
    }
};


export const updatePropertyTypeById = async (req, res, next) => {

    const { id } = req.params;
    const { property_type } = req.body;

    try {
        const PropertyTypeData = await PropertyType.findByPk(id);

        if (!PropertyTypeData) {
           return next( new CustomError("No property type found with the given Id.",statusCode.NOT_FOUND));
        }
       
        if ( property_type != PropertyTypeData.property_type ){

            const existingPropertyType = await PropertyType.findOne({where:{property_type}});

            if ( existingPropertyType){
                return next( new CustomError("Property type name already exist.",statusCode.CONFLICT));
            }
        }

        await PropertyType.update(req.body,{where:{id:id}});

        return res.status(statusCode.OK).json({
            success: true,
            message: "Property type updated successfully.",
        });
    } catch (error) {

        console.log("Error in updating property type : ", error);
        next(error);
    }
};


export const uploadPropertyTypeFromCsv = async (req, res, next) => {
    try {
        
        if (!req.file) {
            return next( new CustomError("No file selected.",statusCode.BAD_REQUEST));
        }

        const propertyType = await convertCsvToObject(req.file,next);
        
        await PropertyType.bulkCreate(propertyType);

        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
        });

    } catch (error) {
        console.log("Error uploading property type  CSV:", error);
        next(error);
    }
};



