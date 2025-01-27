import GrievanceType from "../models/model.grievanceType.js";
import GrievanceSubType from "../models/model.grievanceSubType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';

export const createGrievanceSubType = async (req, res, next) => {

    const { grievance_type_name } = req.body;

    try {
            const grievanceType = await GrievanceType.findOne({where:{grievance_type_name}});

            if ( !grievanceType ){

                return res.status(401).json({
                    success: false,
                    message: "please provide a valid grievance type name.",
                });
    
            }

            const grievanceSubType = await GrievanceSubType.create({grievanceTypeId:grievanceType.id,...req.body});
        
            return res.status(201).json({
                success: true,
                message: "Grievance sub-type created successfully.",
                data: grievanceSubType
            });


    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Grievance sub-type is not created. Please try again.", 500));
    }
};

export const getAllGrievanceSubType = async (req, res, next) => {
    try {
        const allGrievanceSubTypes = await GrievanceSubType.findAll();
        return res.status(200).json({
            success: true,
            message: "Fetched all grievance sub-types successfully.",
            data: allGrievanceSubTypes
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all grievance sub-types.", 500));
    }
};


export const getAllGrievanceSubTypeOfParticularGrievanceType = async (req, res, next) => {

    const { grievance_type_id } = req.params;
    
    try {
        const allSubGrievanceTypes = await GrievanceSubType.findAll({where:{grievanceTypeId:grievance_type_id}});
        if (allSubGrievanceTypes.length < 1 ) {
            return res.status(200).json({
                success: true,
                message: "No Sub grievance type found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched grievance sub-type successfully.",
            data: allSubGrievanceTypes
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch grievance sub-type.", 500));
    }
};

export const updateGrievanceSubTypeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const grievanceSubType = await GrievanceSubType.findByPk(id);
        if (!grievanceSubType) {
            return res.status(404).json({
                success: false,
                message: "No property sub-type found for this ID."
            });
        }
        const updatedGrievanceSubType = updateDatabaseObject(req.body, grievanceSubType);

        await updatedGrievanceSubType.save();

        return res.status(200).json({
            success: true,
            message: "Grievance sub-type updated successfully.",
            data: updatedGrievanceSubType
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update grievance sub-type.", 500));
    }
};

export const uploadGrievanceSubTypeFromCsv = async (req, res, next) => {
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

        

        // await GrievanceSubType.bulkCreate(results);

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