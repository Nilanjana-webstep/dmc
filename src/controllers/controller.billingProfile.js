import { statusCode } from "../config/constraint.js";
import sequelize from "../config/db.js";
import BillingProfile from "../models/model.billingProfile.js"
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { convertCsvToObject } from "../utils/utils.csv.js";


export const createBillingProfile = async(req,res,next)=>{
    
    const { property_type_id , property_sub_type_id } = req.body;

    try {
            const propertyType = await PropertyType.findByPk(property_type_id);

            if ( !propertyType ){
                return next( new CustomError('No property type found with this id.',statusCode.NOT_FOUND));
            }

            const propertySubType = await PropertySubType.findByPk(property_sub_type_id);

            if ( !propertySubType ){
                return next ( new CustomError("No Property Sub type found with this id",statusCode.NOT_FOUND));
            }

            await BillingProfile.create({...req.body,propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id});
        
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
        const sql = ` SELECT * FROM billing_profiles bp JOIN property_types pt ON pt.id = bp.propertyTypeId JOIN property_sub_types pst ON pst.id = bp.propertySubTypeId`
        const [allBillingProfiles] = await sequelize.query(sql);
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


export const editBillingProfile = async (req, res, next) => {

    const { id } = req.params;
    const { property_type_id , property_sub_type_id } = req.body;

    try {

        const billingProfile = await BillingProfile.findByPk(id);

        if (!billingProfile) {
           return next( new CustomError("No billing profile found with this id .",statusCode.NOT_FOUND));
        }

        const propertyType = await PropertyType.findByPk(property_type_id);
        if ( !propertyType){
             return next ( new CustomError("No property type found with this id.",statusCode.NOT_FOUND));
        }
       
        const propertySubType = await PropertySubType.findByPk(property_sub_type_id);

        if ( !propertySubType){
            return next ( new CustomError("Property Sub type not found with this id.",statusCode.NOT_FOUND));
        }
        
        await BillingProfile.update({...req.body,propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id},{where:{id:id}});

        return res.status(statusCode.OK).json({
            success: true,
            message: "Billing profile updated successfully.",
        });
    } catch (error) {
        console.log("Error in updating billing profile : ", error);
        next(error);
    }
};


export const getBillingProfilesByPropertyType = async ( req,res,next)=>{
    
    const { property_type_id , property_sub_type_id } = req.query;

    try {

        const billingProfiles = await BillingProfile.findAll({where:{propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id}});
        if ( billingProfiles.length < 1 ){
            return next( new CustomError("No billing profile Found.",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success : true,
            message : 'successfully fetch all billings profile.',
            data : billingProfiles
        })
    } catch (error) {
        console.log("error in fetching billings profile by property type : ",error);
        next(error);
        
    }
}

export const uploadBillingProfileFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const billingProfileData = await convertCsvToObject(req.file,next);

        const createdBillingProfileData = await BillingProfile.bulkCreate(billingProfileData);


        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading billing profile CSV:", error);
        next(error);
    }
};




