import { statusCode } from "../config/constraint.js";
import PropertySubType from "../models/model.PropertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import { convertCsvToObject } from "../utils/utils.csv.js";
import {  
    PropertySubTypeCreationValidationModelForCsv,
} from "../validations/validation.propertySubTypeModel.js";



export const createPropertySubType = async (req, res, next) => {

    const { property_type_id } = req.body;

    try {
        
            const PropertyType = await PropertyType.findByPk(property_type_id);

            if ( !PropertyType ){
                return next( new CustomError('No property type found.',statusCode.NOT_FOUND));
    
            }

            const PropertySubType = await PropertySubType.create({propertyTypeId:property_type_id,...req.body});
        
            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Property sub-type created successfully.",
                data: PropertySubType
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


export const getAllPropertySubTypeOfParticularPropertyType = async (req, res, next) => {

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
    try {

        const PropertySubType = await PropertySubType.findByPk(id);

        if (!PropertySubType) {
           return next( new CustomError("No property sub type found .",statusCode.NOT_FOUND));
        }
        const updatedPropertySubType = updateDatabaseObject(req.body, PropertySubType);

        await updatedPropertySubType.save();

        return res.status(200).json({
            success: true,
            message: "Property sub-type updated successfully.",
            data: updatedPropertySubType
        });
    } catch (error) {
        console.log("Error in updating property sub type : ", error);
        next(error);
    }
};

const validateData =  (data,PropertyTypeSet) => {

    const { error } = PropertySubTypeCreationValidationModelForCsv.validate(data);
    if (error) return error;

    const { property_type } = data;

    if ( !PropertyTypeSet.has(property_type.trim())){
        return  new CustomError("no Property type found",401);
    }

    return null;
};

const processPropertySubType = async ( data )=>{
    try {
        
        const { property_type , property_sub_type } = data;
        const PropertyType = await PropertyType.findOne({where:{property_type}});
        await PropertySubType.create({propertyTypeId:PropertyType.dataValues.id,property_sub_type});

    } catch (error) {
        
    }
}

export const uploadPropertySubTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return next( new CustomError("not file selected.",statusCode.NOT_FOUND));
        }

        const propertySubTypeJsonData = await convertCsvToObject(req.file,next);

        let propertyTypes = await PropertyType.findAll({
            attributes : ['Consumer_type']
        })

        const propertyTypesSet = new Set();
        
        propertyTypes.map((data)=>{
            propertyTypesSet.add(data.dataValues.Consumer_type.trim());
        });

        const errorData = [];
        
        for (const data of results) {
            
            const error =  validateData(data,propertyTypesSet);

            if (error) {
                console.log("the error is : ",error);
                errorData.push(data);
                continue;
            }

            await processPropertySubType(data);
        }

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
            error_data_length : errorData.length,
            error_data : errorData

        });
    } catch (error) {
        console.error("Error uploading property sub type  CSV:", error);
        next(error);
    }
};