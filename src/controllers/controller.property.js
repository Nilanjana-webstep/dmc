import Customer from "../models/model.customer.js";
import Property from "../models/model.property.js";
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import Ward from "../models/model.ward.js";
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



export const uploadPropertyTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        console.log('The file is here:', req.file);

        const results = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        console.log("Parsed data:", results);

        const wardData = await PropertyType.bulkCreate(results);

        console.log("Ward data is:", wardData);

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};
