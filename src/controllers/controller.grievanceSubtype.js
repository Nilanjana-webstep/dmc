import GrievanceType from "../models/model.grievanceType.js";
import GrievanceSubType from "../models/model.grievanceSubType.js";
import CustomError from "../utils/util.customError.js";
import { GrievanceSubTypeCreationValidationModel } from "../validations/validation.grievanceModel.js";
import { statusCode } from "../config/constraint.js";
import { convertCsvToObject } from "../utils/utils.csv.js";


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
        
            return res.status(statusCode.CREATED).json({
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


export const uploadGrievanceSubTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        const grievanceSubTypeData = await convertCsvToObject(req.file);

       await GrievanceSubType.bulkCreate(grievanceSubTypeData);

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading grievance sub type  CSV : ", error);
        next(error);
    }
};