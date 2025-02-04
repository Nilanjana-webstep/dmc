import ServiceType from "../models/model.serviceType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';
import { convertCsvToObject } from "../utils/utils.csv.js";

export const createServiceType = async (req, res, next) => {
    try {
        const existServiceType = await ServiceType.findOne({where:{property_type}});

        if ( existServiceType ){
            return next( new CustomError("Service Type already exist.",statusCode.CONFLICT));
        }
        
        const serviceType = await ServiceType.create(req.body);

        return res.status(201).json({
            success: true,
            message: "service type created successfully.",
            data: serviceType
        });

    } catch (error) {

        console.log("Error: ", error);
        return next(error);
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
    const { service_type } = req.body;
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

       const serviceTypesJson = await convertCsvToObject(req.file);

        const serviceTypes = await ServiceType.bulkCreate(serviceTypesJson);

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



