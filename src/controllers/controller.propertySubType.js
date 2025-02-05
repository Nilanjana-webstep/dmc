import { statusCode } from "../config/constraint.js";
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { convertCsvToObject } from "../utils/utils.csv.js";



export const createPropertySubType = async (req, res, next) => {

    const { property_type_id , property_sub_type  } = req.body;

    try {
        
            const propertyType = await PropertyType.findByPk(property_type_id);

            if ( !propertyType ){
                return next( new CustomError('No property type found with this given id.',statusCode.NOT_FOUND));
            }

            const existingPropertySubType = await PropertySubType.findOne({where:{property_sub_type}});

            if ( existingPropertySubType ){
                return next ( new CustomError("This Property Sub type already exist",statusCode.CONFLICT));
            }

            await PropertySubType.create({...req.body,propertyTypeId:property_type_id});
        
            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Property sub-type created successfully.",
            });


    } catch (error) {
        console.log("Error in creating property sub type : ", error);
        next ( error );
    }
};


export const getAllPropertySubType = async (req, res, next) => {
    try {

       
        const allPropertySubTypes = await PropertySubType.findAll();

        if ( allPropertySubTypes.length < 1 ){
            return next ( new CustomError("No property sub type Found.",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all property sub-types successfully.",
            data: allPropertySubTypes
        });
    } catch (error) {
        console.log("Error in getting all property sub type :  ", error);
        next ( error);
    }
};


export const getAllPropertySubTypeByPropertyType = async (req, res, next) => {

    const { id } = req.params;
    
    try {
        const allSubProperties = await PropertySubType.findAll({where:{propertyTypeId : id}});
        if ( allSubProperties.length < 1 ) {
           return next ( new CustomError("No sub property found for this property type ",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Fetched property sub-type successfully.",
            data: allSubProperties
        });
    } catch (error) {
        console.log("Error in all sub property type for particular property type : ", error);
        next ( error);
    }
};


export const updatePropertySubTypeById = async (req, res, next) => {

    const { id } = req.params;
    const { property_type_id , property_sub_type } = req.body;

    try {

        const propertySubType = await PropertySubType.findByPk(id);

        if (!propertySubType) {
           return next( new CustomError("No property sub type found .",statusCode.NOT_FOUND));
        }

        const propertyType = await PropertyType.findOne({where:{id:property_type_id}});

        if ( !propertyType){
              return next ( new CustomError("No property type found with this given id.",statusCode.NOT_FOUND));
           }
        
        if ( property_sub_type != propertySubType.property_sub_type ){
            const existingPropertySubType = await PropertySubType.findOne({where:{property_sub_type}});

            if ( existingPropertySubType){
                return next ( new CustomError("Property Sub type name already exist.",statusCode.CONFLICT));
            }
        }

        await PropertySubType.update({...req.body,propertyTypeId:property_type_id},{where:{id:id}});

        return res.status(200).json({
            success: true,
            message: "Property sub-type updated successfully.",
        });
    } catch (error) {
        console.log("Error in updating property sub type : ", error);
        next(error);
    }
};


export const uploadPropertySubTypeFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const propertySubTypeData = await convertCsvToObject(req.file,next);

        const createdPropertySubTypeData = await PropertySubType.bulkCreate(propertySubTypeData);


        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading property sub type CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};