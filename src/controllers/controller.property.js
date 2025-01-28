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
                    attributes: ['property_type'] 
                },
                {
                    model: PropertySubType,
                    attributes: ['property_sub_type'] 
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


export const getParticularPropertyByConsumerId = async (req, res, next) => {
    const { consumer_id } = req.params;
    try {
        const property = await Property.findByPk(consumer_id,
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
                        attributes: ['property_type'] 
                    },
                    {
                        model: PropertySubType,
                        attributes: ['property_sub_type'] 
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
    
    
    try {
        const allProperties = await Property.findAll({
            where: { customerId: id },
            attributes:{exclude:['wardId','propertyTypeId','propertySubTypeId']},
             
            include: [
              {
                model: Ward,
                attributes: ['ward_no']
              },
              {
                model: PropertyType,
                attributes: ['property_type']
              },
              {
                model: PropertySubType,
                attributes: ['property_sub_type']
              }
            ],
            
          });

        if (allProperties.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No property found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property successfully.",
            data: allProperties
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property.", 500));
    }
};


export const updatePropertyById = async (req, res, next) => {
    
    const { id } = req.params;
    
    try {
        const property = await Property.findByPk(id);

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

    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);

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




