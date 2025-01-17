import Property from "../models/model.property.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";

export const createProperty = async (req, res, next) => {
    console.log("got hit");
    
    try {
        const property = await Property.create(req.body);
        property.consumer_id = property.id+Date.now().toString();
        await property.save();
        return res.status(201).json({
            success: true,
            message: "Property created successfully.",
            data: property
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Property is not created. Please try again.", 500));
    }
};

export const getAllProperty = async (req, res, next) => {
    try {
        const allProperties = await Property.findAll();
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
        const property = await Property.findByPk(property_id);
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
        await property.destroy();
        return res.status(200).json({
            success: true,
            message: "Property deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete property.", 500));
    }
};
