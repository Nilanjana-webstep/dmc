import GrievanceType from "../models/model.grievanceType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';

export const createGrievanceType = async (req, res, next) => {
    try {
        const grievanceType = await GrievanceType.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Grievance type created successfully.",
            data: grievanceType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Grievance type is not created. Please try again.", 500));
    }
};

export const getAllGrievanceType = async (req, res, next) => {
    try {
        const allGrievance = await GrievanceType.findAll();
        return res.status(200).json({
            success: true,
            message: "Fetched all grievance types successfully.",
            data: allGrievance
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all grievance types.", 500));
    }
};

export const updateGrievanceTypeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const grievanceType = await GrievanceType.findByPk(id);
        if (!grievanceType) {
            return res.status(404).json({
                success: false,
                message: "No grievance type found for this ID."
            });
        }
        const updatedGrievanceType = updateDatabaseObject(req.body, grievanceType);

        await updatedGrievanceType.save();

        return res.status(200).json({
            success: true,
            message: "grievance type updated successfully.",
            data: updatedGrievanceType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update grievance type.", 500));
    }
};

export const uploadGrievanceTypeFromCsv = async (req, res, next) => {
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

        await GrievanceType.bulkCreate(results);

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



