import GrievanceType from "../models/model.grievanceType.js";
import GrievanceSubType from "../models/model.grievanceSubType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import csv  from 'csv-parser';
import fs from 'fs';
import { GrievanceSubTypeCreationValidationModel } from "../validations/validation.grievanceModel.js";
import { statusCode } from "../config/constraint.js";


export const createGrievanceSubType = async (req, res, next) => {

    const { grievance_type_id,grievance_sub_type } = req.body;

    try {
            const grievanceType = await GrievanceType.findByPk(grievance_type_id);

            if ( !grievanceType ){
                return next ( new CustomError('No grievance type found with this id',statusCode.NOT_FOUND));
            }

            const existingGrievanceSubType = await GrievanceSubType.findOne({where:{grievance_sub_type}})

            if ( existingGrievanceSubType ){
                return next ( new CustomError('Grievance sub type name already exist.',statusCode.CONFLICT));
            }

            await GrievanceSubType.create({grievanceTypeId:grievance_type_id,...req.body});
        
            return res.status(201).json({
                success: true,
                message: "Grievance sub-type created successfully.",
            });


    } catch (error) {
        console.log("Error in creating grievance sub type : ", error);
        next(error);
    }
};

export const getAllGrievanceSubType = async (req, res, next) => {
    try {
        const allGrievanceSubTypes = await GrievanceSubType.findAll();

        if ( allGrievanceSubTypes.length < 1 ){
            return next( new CustomError("No grievance sub type found.",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all grievance sub-types successfully.",
            data: allGrievanceSubTypes
        });
    } catch (error) {
        console.log("Error: ", error);
        next(error);
    }
};


export const getAllGrievanceSubTypeOfParticularGrievanceType = async (req, res, next) => {

    const { grievance_type_id } = req.params;
    
    try {
        const allSubGrievanceTypes = await GrievanceSubType.findAll({where:{grievanceTypeId:grievance_type_id}});
        if (allSubGrievanceTypes.length < 1 ) {
           return next ( new CustomError('No grievance sub type found.',statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched grievance sub-type successfully.",
            data: allSubGrievanceTypes
        });
    } catch (error) {
        console.log("Error in fetching grievance sub type : ", error);
        next(error);
    }
};

export const updateGrievanceSubTypeById = async (req, res, next) => {
    const { id } = req.params;
    const { grievance_type_id,grievance_sub_type } = req.body;
    try {
        const grievanceSubType = await GrievanceSubType.findByPk(id);
        if (!grievanceSubType) {
           return next ( new CustomError('No grievance sub type found with this id.',statusCode.NOT_FOUND));
        }
        
        const grievanceType = await GrievanceType.findByPk(grievance_type_id);

        if ( !grievanceType ){
            return next ( new CustomError('No grievance type found with this id',statusCode.NOT_FOUND));
        }   

        if ( grievanceSubType.grievance_sub_type != grievance_sub_type ){
            const existingGrievanceSubType = await GrievanceSubType.findOne({where:{grievance_sub_type}})
            if ( existingGrievanceSubType ){
                return next ( new CustomError('Grievance sub type name already exist.',statusCode.CONFLICT));
            }   
        }
         

        await GrievanceSubType.update({...req.body,grievanceTypeId:grievance_type_id},{where:{id}})
        return res.status(200).json({
            success: true,
            message: "Grievance sub-type updated successfully.",
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update grievance sub-type.", 500));
    }
};


const validateData =  (data,grievanceTypesSet) => {

    const { error } = GrievanceSubTypeCreationValidationModel.validate(data);
    if (error) return error;

    const { grievance_type } = data;

    if ( !grievanceTypesSet.has(grievance_type.trim())){
        return  new CustomError("no grievance type found",401);
    }

    return null;
};

const processGrievanceSubType = async ( data )=>{
    try {
        
        const { grievance_type , grievance_sub_type } = data;
        const grievanceType = await GrievanceType.findOne({where:{grievance_type}});
        await GrievanceSubType.create({grievanceTypeId:grievanceType.dataValues.id,grievance_sub_type});

    } catch (error) {
        
    }
}

export const uploadGrievanceSubTypeFromCsv = async (req, res, next) => {
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

        let grievanceTypes = await GrievanceType.findAll({
            attributes : ['grievance_type']
        })

        const grievanceTypesSet = new Set();
        
        grievanceTypes.map((data)=>{
            grievanceTypesSet.add(data.dataValues.grievance_type.trim());
        });

        const errorData = [];
        
        for (const data of results) {
            
            const error =  validateData(data,grievanceTypesSet);

            if (error) {
                console.log("the error is : ",error);
                errorData.push(data);
                continue;
            }

            await processGrievanceSubType(data);
        }

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
            error_data_length : errorData.length,
            error_data : errorData

        });
    } catch (error) {
        console.error("Error uploading CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",

        });
    }
};