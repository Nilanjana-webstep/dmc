import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";

export const createPropertyType = async (req, res, next) => {
    try {
        const propertyType = await PropertyType.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Property type created successfully.",
            data: propertyType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Property type is not created. Please try again.", 500));
    }
};

export const getAllPropertyType = async (req, res, next) => {
    try {
        const allPropertyTypes = await PropertyType.findAll();
        return res.status(200).json({
            success: true,
            message: "Fetched all property types successfully.",
            data: allPropertyTypes
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all property types.", 500));
    }
};

export const getParticularPropertyTypeById = async (req, res, next) => {
    const { property_type_id } = req.params;
    try {
        const propertyType = await PropertyType.findByPk(property_type_id);
        if (!propertyType) {
            return res.status(404).json({
                success: false,
                message: "No property type found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched property type successfully.",
            data: propertyType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch property type.", 500));
    }
};

export const updatePropertyTypeById = async (req, res, next) => {
    const { property_type_id } = req.params;
    try {
        const propertyType = await PropertyType.findByPk(property_type_id);
        if (!propertyType) {
            return res.status(404).json({
                success: false,
                message: "No property type found for this ID."
            });
        }
        const updatedPropertyType = updateDatabaseObject(req.body, propertyType);

        await updatedPropertyType.save();

        return res.status(200).json({
            success: true,
            message: "Property type updated successfully.",
            data: updatedPropertyType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update property type.", 500));
    }
};


export const deletePropertyTypeById = async (req, res, next) => {

    const { propertyType_id } = req.params;
    try {
        const propertyType = await PropertyType.findByPk(propertyType_id);
        if (!propertyType) {
            return res.status(404).json({
                success: false,
                message: "No property type found for this ID."
            });
        }
        await propertyType.destroy();
        return res.status(200).json({
            success: true,
            message: "Property type deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete property type.", 500));
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
