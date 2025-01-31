import Ward from "../models/model.ward.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";

import { statusCode } from "../config/constraint.js";
import { convertCsvToObject } from "../utils/utils.csv.js";

export const createWard = async (req,res,next)=>{

    try {
        
        const existWard = await Ward.findOne({where : {ward_no}});

        if ( existWard ){
           return next( new CustomError("Ward no already exist",statusCode.CONFLICT));
        }

        const ward = await Ward.create(req.body);

        return res.status(statusCode.CREATED).json({
            success : true,
            message : " ward created successfully.",
            data : ward
        })

    } catch (error) {

        console.log("error in creating ward : ",error);
        next(error);
    }
}


export const getAllWard = async (req,res,next)=>{

    try {

        const allWard = await Ward.findAll();

        if ( allWard.length < 1 ){
            return next( new CustomError("No ward found.",statusCode.NOT_FOUND));
        }

        return res.status(statusCode.OK).json({
            success : true,
            message : " fetched all wards successfully.",
            data : allWard
        })
    } catch (error) {
        
        console.log("error in getting all ward : ",error);
        next(error)
    }
}


export const updateWardById = async (req,res,next)=>{

    const { id } = req.params;

    try {

        const ward = await Ward.findByPk(id);

        if ( !ward ){
            return next( new CustomError('No ward found.',statusCode.NOT_FOUND));
        }

        const updatedWard = updateDatabaseObject(req.body,ward);

        await updatedWard.save();

        return res.status(statusCode.OK).json({
            success : true,
            message : " update ward successfully.",
            data : updatedWard
        })
       
    } catch (error) {
        
        console.log("error in updationg ward : ",error);
        return next (error);
    }
}


export const uploadWardFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const wardData = await convertCsvToObject(req.file,next);

        const createdWardData = await Ward.bulkCreate(results);

        console.log("Ward data is:", wardData);

        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
            data : createdWardData,
        });
    } catch (error) {
        console.error("Error uploading ward CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};
