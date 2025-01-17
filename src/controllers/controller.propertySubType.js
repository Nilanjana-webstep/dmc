import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";

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


export const getAllPropertiesOfParticularPropertyType = async (req, res, next) => {

    const { property_type } = req.params;
    property_type
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

export const deletePropertySubTypeById = async (req, res, next) => {
    const { propertySubType_id } = req.params;
    try {
        const propertySubType = await PropertySubType.findByPk(propertySubType_id);
        if (!propertySubType) {
            return res.status(404).json({
                success: false,
                message: "No property sub-type found for this ID."
            });
        }
        await propertySubType.destroy();
        return res.status(200).json({
            success: true,
            message: "Property sub-type deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete property sub-type.", 500));
    }
};
