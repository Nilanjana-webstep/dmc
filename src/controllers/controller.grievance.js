import Grievance from "../models/model.grievance.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";
import GrievanceType from "../models/model.grievanceType.js";
import GrievanceSubType from "../models/model.grievanceSubType.js";



export const createGrievance = async (req,res,next)=>{

    try {
        
        const { type , sub_type } = req.body;

        const grievanceType = await GrievanceType.findOne({where:{type:type}});
        const grievanceTypeId = grievanceType.dataValues.id;
        const grievanceSubType = await GrievanceSubType.findOne({where:{sub_type:sub_type}});
        const grievanceSubTypeId = grievanceSubType.dataValues.id;

        const grievance = await Grievance.create({...req.body,customerId:customer_id,grievance_photo:req.file.path});
       
        
        return res.json({
            success : true,
            message : "successfully created grievance.",
            data : grievance
        })

        
    } catch (error) {
        console.log("error creating grievance : ",error);
        return next( new CustomError("Sorry not createing grievance",500))
        
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
            message : "All nirmal bandhu fetched  successfully.",
            data : allGrievance
        })
    } catch (error) {
        console.log("Error getting all grievance data :  ",error);
        
    }
}


export const getAllGrievanceByPartucularCustomerId = async (req, res, next) => {
    
    
    const { id } = req.params;
    
    
    try {
        const allGrievance = await Grievance.findAll({
            where: { customerId: id },            
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