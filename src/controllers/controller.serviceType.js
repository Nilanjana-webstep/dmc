import { statusCode } from "../config/constraint.js";
import ServiceType from "../models/model.serviceType.js";
import CustomError from "../utils/util.customError.js";
import { convertCsvToObject } from "../utils/utils.csv.js";

export const createServiceType = async (req, res, next) => {
    
    const { service_type } = req.body;

    try {
        const existServiceType = await ServiceType.findOne({where:{service_type}});

        if ( existServiceType ){
            return next( new CustomError("This Service Type already exist.",statusCode.CONFLICT));
        }
        
        await ServiceType.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Service type created successfully.",
        });

    } catch (error) {

        console.log("Error in creating service type. : ", error);
        return next(error);
    }
};


export const getAllServiceType = async (req, res, next) => {
    try {
        const allServiceType = await ServiceType.findAll();

        if ( allServiceType.length < 1 ){
            return next ( new CustomError("No service type found.",statusCode.NOT_FOUND));
        }

        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all service types successfully.",
            data: allServiceType
        });
    } catch (error) {
        console.log("Error in fetching all service type : ", error);
        next(error);
    }
};


export const updateServiceTypeById = async (req, res, next) => {
    
    const { id } = req.params;
    const { service_type } = req.body;
    try {
        const serviceType = await ServiceType.findByPk(id);
        if (!serviceType) {
           return next(new CustomError("No service type found with this Id.",statusCode.NOT_FOUND));
        }
        if ( serviceType.service_type != service_type ){
            const existingServiceType = await ServiceType.findOne({where:{service_type}});
            if ( existingServiceType ){
                return next ( new CustomError('Service type name already exist.',statusCode.CONFLICT));
            }
        }
        
        await ServiceType.update(req.body,{where:{id}});

        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Service type updated successfully.",
        });
    } catch (error) {
        console.log("Error in updating service type : ", error);
        next(error);
    }
};


export const uploadServiceTypeFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        const serviceTypesJson = await convertCsvToObject(req.file);

        await ServiceType.bulkCreate(serviceTypesJson);

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
        });
    } catch (error) {
        console.error("Error uploading service type CSV:", error);
        next(error);
    }
};



