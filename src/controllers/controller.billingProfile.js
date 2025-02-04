import { statusCode } from "../config/constraint.js";
import BillingProfile from "../models/model.billingProfile.js"
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import { updateDatabaseObject } from "../utils/util.database.js";

export const createBillingProfile = async(req,res,next)=>{
    
    const { property_type_id , property_sub_type_id } = req.body;

    try {
            const propertyType = await PropertyType.findByPk(property_type_id);

            if ( !propertyType ){
                return next( new CustomError('No property type found.',statusCode.NOT_FOUND));
            }

            const existingPropertySubType = await PropertySubType.findOne({where:{property_sub_type}});

            if ( existingPropertySubType ){
                return next ( new CustomError("This Property Sub type already exist",statusCode.CONFLICT));
            }

            const billingProfile = await BillingProfile.create({...req.body,propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id});
        
            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Billing Profile created successfully.",
            });
    } catch (error) {
        console.log("Error creating billing profile : ",error);
        next(error)
    }
}



export const getAllBillingProfile = async(req,res,next)=>{
    try {
        const allBillingProfiles = await BillingProfile.findAll();
        if ( allBillingProfiles.length < 1 ){
            return res.status(statusCode.NOT_FOUND).json({
                success : false,
                message : "No billing profile found.",
            })
        }
        return res.status(statusCode.OK).json({
            success : true,
            message : " All billing profile fetched successfully.",
            data : allBillingProfiles
        })
    } catch (error) {
        console.log("error to fetching  billing profile : ",error);
        next(error)
    }
}




export const editBillingProfile = async(req,res,next)=>{

    const { id } = req.params;
    const { property_type_id , property_sub_type_id } = req.body;

    try {
        const propertyType = await PropertyType.findByPk(property_type_id);

        if ( !propertyType ){
            return next( new CustomError('No property type found.',statusCode.NOT_FOUND));
        }

        const propertySubType = await PropertySubType.findByPk(property_sub_type_id);

        if ( !propertySubType ){
            return next ( new CustomError("No Property Sub type found",statusCode.NOT_FOUND));
        }

        const billingProfile = await BillingProfile.findByPk(id);
        const updatedBillingProfile = updateDatabaseObject(req.body,billingProfile);
        await updatedBillingProfile.save();

        return res.status(statusCode.OK).json({
            success : true,
            message : "Data updated successfully."
        })

    } catch (error) {
        console.log("Error in updating billing profile.");
        next(error)
    }
}

