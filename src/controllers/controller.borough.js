import Borough from "../models/model.borough.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";
import { statusCode } from "../config/constraint.js";
import { convertCsvToObject } from "../utils/utils.csv.js";

export const createBorough = async (req,res,next)=>{

    const { borough } = req.body;

    try {
        
        const existBorough = await Borough.findOne({where : {borough}});

        if ( existBorough ){
           return next( new CustomError("This borough  already exist",statusCode.CONFLICT));
        }

        const newBorough= await Borough.create(req.body);

        return res.status(statusCode.CREATED).json({
            success : true,
            message : " Borough created successfully.",
            data : newBorough
        })

    } catch (error) {

        console.log("error in creating borough : ",error);
        next(error);
    }
}


export const getAllBorough = async (req,res,next)=>{

    try {

        const allBorough = await Borough.findAll({where:{is_active : true}});

        if ( allBorough.length < 1 ){
            return next( new CustomError("No borough found.",statusCode.NOT_FOUND));
        }

        return res.status(statusCode.OK).json({
            success : true,
            message : " fetched all borough successfully.",
            data : allBorough
        })
    } catch (error) {
        
        console.log("error in getting all borough : ",error);
        next(error)
    }
}


export const updateBoroughById = async (req,res,next)=>{

    const { id } = req.params;
    const { borough } = req.body;

    try {

        if ( borough ){
            const existingBorough = await Borough.findOne({where:{borough}});
            if ( existingBorough){
                return res.status(statusCode.CONFLICT).json({
                    success : false,
                    message : "Borough already exist!",
                })
            }
        }

        const boroughData = await Borough.findByPk(id);

        if ( !boroughData ){
            return next( new CustomError('No borough found.',statusCode.NOT_FOUND));
        }

        const updatedBorough = updateDatabaseObject(req.body,boroughData);

        await updatedBorough.save();

        return res.status(statusCode.OK).json({
            success : true,
            message : " update borough successfully.",
            data : updatedBorough
        })
       
    } catch (error) {
        
        console.log("error in updationg borough : ",error);
        return next (error);
    }
}


export const uploadBoroughFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const boroughData = await convertCsvToObject(req.file,next);

        const createdBorough = await Borough.bulkCreate(boroughData);

        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
            data : createdBorough,
        });
    } catch (error) {
        console.error("Error uploading borough CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};
