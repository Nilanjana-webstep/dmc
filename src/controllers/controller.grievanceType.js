import GrievanceType from "../models/model.grievanceType.js";
import { statusCode } from "../config/constraint.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs, { stat } from 'fs';

export const createGrievanceType = async (req, res, next) => {

    const { grievance_type } = req.body;

    try {
        const existingGrievancType = await GrievanceType.findOne({where:{grievance_type}});
        if ( existingGrievancType ){
            return next( new CustomError('This grievance type is already exist.',statusCode.CONFLICT));
        }
        await GrievanceType.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Grievance type created successfully.",
        });
    } catch (error) {
        console.log("Error in creating grievance type : ", error);
        next(error)
    }
};

export const getAllGrievanceType = async (req, res, next) => {
    try {
        const allGrievance = await GrievanceType.findAll();
        if ( allGrievance.length < 1 ){
            return next ( new CustomError('No grievance type is found.',statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all grievance types successfully.",
            data: allGrievance
        });
    } catch (error) {
        console.log("Error in getting all grievance type : ", error);
        next(error);
    }
};

export const updateGrievanceTypeById = async (req, res, next) => {
    const { id } = req.params;
    const { grievance_type } = req.body;
    try {
        const grievanceType = await GrievanceType.findByPk(id);
        if (!grievanceType) {
            return next( new CustomError('No grievance type is found with this id',statusCode.NOT_FOUND));
        }

        if ( grievance_type != grievanceType.grievance_type ){
            const existingGrievancType = await GrievanceType.findOne({where:{grievance_type}});
            if ( existingGrievancType ){
                return next( new CustomError('This grievance type is already exist.',statusCode.CONFLICT));
            }
        }
        
        await GrievanceType.update(req.body,{where:{id}});

        return res.status(200).json({
            success: true,
            message: "grievance type updated successfully.",
        });
    } catch (error) {
        console.log("Error: ", error);
        next(error);
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



