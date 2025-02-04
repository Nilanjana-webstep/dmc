import Ward from "../models/model.ward.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";
import { statusCode } from "../config/constraint.js";
import { convertCsvToObject } from "../utils/utils.csv.js";
import Borough from "../models/model.borough.js";
import sequelize from "../config/db.js";

export const createWard = async (req,res,next)=>{

    const { ward,borough_id } = req.body;

    try {

        const borough = await Borough.findByPk(borough_id);

        if ( !borough ){
            return next ( new CustomError("No borough found for this borough Id.",statusCode.NOT_FOUND));
        }
        
        const existWard = await Ward.findOne({where : {ward:ward}});

        if ( existWard ){
           return next( new CustomError("This ward name  already exist",statusCode.CONFLICT));
        }

        await Ward.create({...req.body,boroughId:borough_id});

        return res.status(statusCode.CREATED).json({
            success : true,
            message : " ward created successfully.",
        })

    } catch (error) {

        console.log("error in creating ward : ",error);
        next(error);
    }
}


export const getAllWard = async (req,res,next)=>{

    try {
                
        const  allWard  = await Ward.findAll();

        if ( allWard.length < 1 ){
            return next( new CustomError("No ward found.",statusCode.NOT_FOUND));
        }

        return res.status(statusCode.OK).json({
            success : true,
            message : "fetched all wards successfully.",
            data : allWard
        })
    } catch (error) {
        
        console.log("error in getting all ward : ",error);
        next(error)
    }
}


export const updateWardById = async (req,res,next)=>{

    const { id } = req.params;
    const { ward,borough_id } = req.body;

    try {

        const wardData = await Ward.findByPk(id);

        if ( !wardData ){
            return next( new CustomError('Ward with the given ID not found.',statusCode.NOT_FOUND));
        }

        if ( ward != wardData.ward ){
            const existingWard = await Ward.findOne({where:{ward:ward}});
            if (existingWard){
                return next( new CustomError('Ward name already exist.',statusCode.CONFLICT));
            }
        }

        const borough = await Borough.findByPk(borough_id);

        if ( !borough ){
            return next ( new CustomError("No borough found for this borough Id.",statusCode.NOT_FOUND));
        }

        await Ward.update(req.body,{where:{id:id}});

        return res.status(statusCode.OK).json({
            success : true,
            message : " update ward successfully.",
        })
       
    } catch (error) {
        
        console.log("error in updationg ward : ",error);
        return next (error);
    }
}


export const getAllWardForParticularBorough = async(req,res,next)=>{
    
    const { borough_id } = req.params;

    try {

        const allWards = await Ward.findAll({where:{boroughId:borough_id}});

        if ( allWards.length < 1 ){
            return next( new CustomError("No ward found for this borough.",statusCode.NOT_FOUND));
        }   

        return res.status(statusCode.OK).json({
            success : true,
            message : "All ward fetched successfull.",
            data : allWards,
        })
    } catch (error) {
        console.log('error to get all ward for particular borough : ',error);
        next(error);
        
    }
}

export const uploadWardFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const wardData = await convertCsvToObject(req.file,next);

        await Ward.bulkCreate(wardData);


        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading ward CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};
