import Grievance from "../models/model.grievance.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";
import GrievanceType from "../models/model.grievanceType.js";
import GrievanceSubType from "../models/model.grievanceSubType.js";
import { statusCode } from "../config/constraint.js";



export const createGrievance = async (req,res,next)=>{

    const customer_id = 1000001;
    try {

        const filePath =  req.file?req.file.path:null;
        
        const { grievance_type_id , grievance_sub_type_id } = req.body;

        const grievanceType = await GrievanceType.findByPk(grievance_type_id);
        if ( !grievanceType ){
            return next( new CustomError('No grievance type found with this id.',statusCode.NOT_FOUND));
        } 
        const grievanceTypeId = grievance_type_id;
        const grievanceSubType = await GrievanceSubType.findByPk(grievance_sub_type_id);
        if ( !grievanceSubType){
            return next( new CustomError('No grievance sub type found with this id.',statusCode.NOT_FOUND));
        }
        const grievanceSubTypeId = grievance_sub_type_id;

        // customer id will be added 

        const grievance = await Grievance.create({...req.body,grievanceTypeId,customer_id,grievanceSubTypeId,grievance_photo:filePath});
       
        return res.status(statusCode.CREATED).json({
            success : true,
            message : "successfully created grievance.",
            data : grievance
        })
    } catch (error) {

        console.log("error creating grievance : ",error);
        next(error);
    }
}


export const getAllGrievance = async (req,res,next)=>{
    try {
        
        const allGrievance = await Grievance.findAll();

        if ( allGrievance.length < 1 ){

            return res.status(200).json({
                success : true,
                message : "No grievance found."
            })
        }

        return res.status(200).json({
            success : true,
            message : "All Grievance fetched  successfully.",
            data : allGrievance
        })
    } catch (error) {
        console.log("Error getting all grievance data :  ",error);
        next(error);
        
    }
}


export const getAllGrievanceByCustomerId = async (req, res, next) => {
    
    const { customer_id } = req.params;
    
    try {
        const allGrievance = await Grievance.findAll({
            where: { customer_id},            
          });

        if (allGrievance.length == 0) {
            return res.status(200).json({
                success: false,
                message: "No grievance found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched all grievance successfully.",
            data: allGrievance
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch grievance.", 500));
    }
};


export const updateGrievanceById = async (req,res,next)=>{

    const { id } = req.params;
    try {
        
        const grievance = await Grievance.findByPk(id);

        const updatedGrievance = updateDatabaseObject(req.body,grievance);
        await updatedGrievance.save();

        return res.status(200).json({
            success : true,
            message : "successfully update grievance.",
            data : updatedGrievance
        })

    } catch (error) {
        console.log("Error to update grievance : ",error);
        
    }
}


export const deleteGrievanceById = async (req,res,next)=>{

    const { id } = req.params;

    try {
        
        const grievance = await Grievance.findByPk(id);

        grievance.is_active = false;
        await grievance.save();

        return res.status(200).json({
            success : true,
            message : "successfully delete grievance.",
            
        })

    } catch (error) {
        console.log("Error to delete grievance : ",error);
        
        
    }
}