import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';
import { PropertySubTypeCreationValidationModel } from "../validations/validation.propertySubTypeModel.js";

export const createPropertySubType = async (req, res, next) => {

    const { property_type_id } = req.body;

    try {
        
            const propertyType = await PropertyType.findByPk(property_type_id);

            if ( !propertyType ){

                return res.status(201).json({
                    success: false,
                    message: "please provide a valid property type Id.",
                });
    
            }

            const propertySubType = await PropertySubType.create({propertyTypeId:propertyType.id,...req.body});
        
            return res.status(201).json({
                success: true,
                message: "Property sub-type created successfully.",
                data: propertySubType
            });


    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Property sub-type is not created. Please try again.", 500));
    }
};

export const getAllPropertySubType = async (req, res, next) => {
    try {
        const allPropertySubTypes = await PropertySubType.findAll();
        return res.status(200).json({
            success: true,
            message: "Fetched all property sub-types successfully.",
            data: allPropertySubTypes
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all property sub-types.", 500));
    }
};

export const getParticularPropertySubTypeById = async (req, res, next) => {
    const { property_sub_type } = req.params;
    try {
        const propertySubType = await PropertySubType.findByPk(property_sub_type);
        if (!propertySubType) {
            return res.status(404).json({
                success: false,
                message: "No property sub-type found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property sub-type successfully.",
            data: propertySubType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property sub-type.", 500));
    }
};


export const getAllPropertySubTypeOfParticularPropertyType = async (req, res, next) => {

    const { property_type } = req.params;
    
    try {
        const allSubProperties = await PropertySubType.findAll({where:{propertyTypeId : property_type}});
        if (!allSubProperties) {
            return res.status(404).json({
                success: false,
                message: "No Sub property  found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property sub-type successfully.",
            data: allSubProperties
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property sub-type.", 500));
    }
};

export const updatePropertySubTypeById = async (req, res, next) => {
    const { property_sub_type } = req.params;
    try {
        const propertySubType = await PropertySubType.findByPk(property_sub_type);
        if (!propertySubType) {
            return res.status(404).json({
                success: false,
                message: "No property sub-type found for this ID."
            });
        }
        const updatedPropertySubType = updateDatabaseObject(req.body, propertySubType);

        await updatedPropertySubType.save();

        return res.status(200).json({
            success: true,
            message: "Property sub-type updated successfully.",
            data: updatedPropertySubType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update property sub-type.", 500));
    }
};

const validateData =  (data,propertyTypesSet) => {

    const { error } = PropertySubTypeCreationValidationModel.validate(data);
    if (error) return error;

    const { property_type } = data;

    if ( !propertyTypesSet.has(property_type.trim())){
        return  new CustomError("no grievance type found",401);
    }

    return null;
};

const processPropertySubType = async ( data )=>{
    try {
        
        const { property_type , property_sub_type } = data;
        const propertyType = await GrievanceType.findOne({where:{property_type}});
        await PropertySubType.create({propertyTypeId:propertyType.dataValues.id,property_sub_type});

    } catch (error) {
        
    }
}

export const uploadPropertySubTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        const results = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        let propertyTypes = await PropertyType.findAll({
            attributes : ['property_type']
        })

        const propertyTypesSet = new Set();
        
        propertyTypes.map((data)=>{
            propertyTypesSet.add(data.dataValues.property_type.trim());
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
        console.error("Error uploading CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",

        });
    }
};