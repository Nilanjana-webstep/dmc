import Customer from "../models/model.customer.js";
import Property from "../models/model.property.js";
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import Ward from "../models/model.ward.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";


export const getAllProperty = async (req, res, next) => {
    try {
        const allProperties = await Property.findAll({
            include: [
                {
                    model : Customer,
                },
                {
                    model: Ward,
                    attributes: ['ward_no'] 
                },
                {
                    model: PropertyType,
                    attributes: ['property_type_name'] 
                },
                {
                    model: PropertySubType,
                    attributes: ['property_sub_type_name'] 
                }
            ]
        });
        return res.status(200).json({
            success: true,
            message: "Fetched all properties successfully.",
            data: allProperties
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all properties.", 500));
    }
};


export const getParticularPropertyById = async (req, res, next) => {
    const { property_id } = req.params;
    try {
        const property = await Property.findByPk(property_id,
            {
                include: [
                    {
                        model : Customer,
                    },
                    {
                        model: Ward,
                        attributes: ['ward_no'] 
                    },
                    {
                        model: PropertyType,
                        attributes: ['property_type_name'] 
                    },
                    {
                        model: PropertySubType,
                        attributes: ['property_sub_type_name'] 
                    }
                ]
            }
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "No property found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property successfully.",
            data: property
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property.", 500));
    }
};


export const getAllPropertyByPartucularCustomerId = async (req, res, next) => {
    const { id } = req.params;
    console.log("the id is : ",id);
    
    try {
        const property = await Property.findAll({customerId:id},
            {
                include: [
                    {
                        model : Customer,
                    },
                    {
                        model: Ward,
                        attributes: ['ward_no'] 
                    },
                    {
                        model: PropertyType,
                        attributes: ['property_type_name'] 
                    },
                    {
                        model: PropertySubType,
                        attributes: ['property_sub_type_name'] 
                    }
                ]
            }
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "No property found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property successfully.",
            data: property
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property.", 500));
    }
};


export const updatePropertyById = async (req, res, next) => {
    const { property_id } = req.params;
    try {
        const property = await Property.findByPk(property_id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "No property found for this ID."
            });
        }

        const updatedProperty = updateDatabaseObject(req.body, property);
        await updatedProperty.save();

        return res.status(200).json({
            success: true,
            message: "Property updated successfully.",
            data: updatedProperty
        });

    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update property.", 500));
    }
};


export const deletePropertyById = async (req, res, next) => {

    const { property_id } = req.params;

    try {
        const property = await Property.findByPk(property_id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "No property found for this ID."
            });
        }
        
        property.is_active = false;

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete property.", 500));
    }
};




