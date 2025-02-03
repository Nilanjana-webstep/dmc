import { statusCode } from "../config/constraint.js";
import sequelize from "../config/db.js";
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import { convertCsvToObject } from "../utils/utils.csv.js";



export const createPropertySubType = async (req, res, next) => {

    const { property_type_id , property_sub_type  } = req.body;

    try {
        
            const propertyType = await PropertyType.findByPk(property_type_id);

            if ( !propertyType ){
                return next( new CustomError('No property type found.',statusCode.NOT_FOUND));
            }

            const existingPropertySubType = await PropertySubType.findOne({where:{property_sub_type}});

            if ( existingPropertySubType ){
                return next ( new CustomError("This Property Sub type already exist",statusCode.CONFLICT));
            }

            const propertySubType = await PropertySubType.create({...req.body,propertyTypeId:property_type_id});
        
            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Property sub-type created successfully.",
                data: propertySubType
            });


    } catch (error) {
        console.log("Error in creating property sub type : ", error);
        next ( error );
    }
};


export const getAllPropertySubType = async (req, res, next) => {
    try {

        const sql = " SELECT st.* , t.property_type as property_type from property_sub_types st JOIN property_types t on st.propertyTypeId = t.id"
        const [allPropertySubTypes] = await sequelize.query(sql);

        if ( allPropertySubTypes.length < 1 ){
            return next ( new CustomError("No property sub type Found.",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all property sub-types successfully.",
            data: allPropertySubTypes
        });
    } catch (error) {
        console.log("Error in getting all property sub type :  ", error);
        next ( error);
    }
};


export const getAllPropertySubTypeOfParticularPropertyType = async (req, res, next) => {

    const { id } = req.params;
    
    try {
        const allSubProperties = await PropertySubType.findAll({where:{propertyTypeId : id}});
        if ( allSubProperties.length < 1 ) {
           return next ( new CustomError("No sub property found for this property type ",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Fetched property sub-type successfully.",
            data: allSubProperties
        });
    } catch (error) {
        console.log("Error in all sub property type for particular property type : ", error);
        next ( error);
    }
};


export const updatePropertySubTypeById = async (req, res, next) => {

    const { id } = req.params;
    const { property_type_id , property_sub_type } = req.body;


    try {

        const propertySubType = await PropertySubType.findByPk(id);

        if (!propertySubType) {
           return next( new CustomError("No property sub type found .",statusCode.NOT_FOUND));
        }

        if ( property_type_id ){
            const propertyType = await PropertyType.findOne({where:{id:property_type_id}});
            if ( !propertyType){
                return next ( new CustomError("No property type found.",statusCode.NOT_FOUND));
            }
        }

        if ( property_sub_type){
            const existingPropertySubType = await PropertySubType.findOne({where:{property_sub_type}});

            if ( existingPropertySubType){
                return next ( new CustomError("Property Sub type already exist.",statusCode.CONFLICT));
            }
        }

       
        const updatedPropertySubType = updateDatabaseObject(req.body, propertySubType);

        await updatedPropertySubType.save();

        return res.status(200).json({
            success: true,
            message: "Property sub-type updated successfully.",
            data: updatedPropertySubType
        });
    } catch (error) {
        console.log("Error in updating property sub type : ", error);
        next(error);
    }
};

// const validateData =  (data,PropertyTypeSet) => {

//     const { error } = PropertySubTypeCreationValidationModelForCsv.validate(data);
//     if (error) return error;

//     const { property_type } = data;

//     if ( !PropertyTypeSet.has(property_type.trim())){
//         return  new CustomError("no Property type found",401);
//     }

//     return null;
// };

// const processPropertySubType = async ( data )=>{
//     try {
        
//         const { property_type , property_sub_type } = data;
//         const PropertyType = await PropertyType.findOne({where:{property_type}});
//         await PropertySubType.create({propertyTypeId:PropertyType.dataValues.id,property_sub_type});

//     } catch (error) {
        
//     }
// }

export const uploadPropertySubTypeFromCsv = async (req, res, next) => {
    try {

        if (!req.file) {
            return next ( new CustomError('No file found.',statusCode.BAD_REQUEST));
        }

        const propertySubTypeData = await convertCsvToObject(req.file,next);

        const createdPropertySubTypeData = await PropertySubType.bulkCreate(propertySubTypeData);


        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Uploaded CSV successfully",
            data : createdPropertySubTypeData,
        });
    } catch (error) {
        console.error("Error uploading property sub type CSV:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload CSV",
        });
    }
};