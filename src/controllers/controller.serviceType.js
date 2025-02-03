import ServiceType from "../models/model.serviceType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';

export const createServiceType = async (req, res, next) => {
    try {
        console.log("req body is : ",req.body);
        
        const PropertyType = await ServiceType.create(req.body);
        return res.status(201).json({
            success: true,
            message: "service type created successfully.",
            data: PropertyType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Service type is not created. Please try again.", 500));
    }
};


export const getAllServiceType = async (req, res, next) => {
    try {
        const allServiceType = await ServiceType.findAll();

        if ( allServiceType.length < 1 ){

            return res.status(200).json({
                success: true,
                message: "No service found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Fetched all service types successfully.",
            data: allServiceType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all Consumer types.", 500));
    }
};


export const updateServiceTypeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const serviceType = await ServiceType.findByPk(id);
        if (!serviceType) {
            return res.status(404).json({
                success: false,
                message: "No service type found for this ID."
            });
        }
        const updatedServiceType = updateDatabaseObject(req.body, serviceType);

        await updatedServiceType.save();

        return res.status(200).json({
            success: true,
            message: "Service type updated successfully.",
            data: updatedServiceType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update service type.", 500));
    }
};


export const uploadServiceTypeFromCsv = async (req, res, next) => {
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

        

        const serviceTypes = await ServiceType.bulkCreate(results);

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



