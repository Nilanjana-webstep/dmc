import ServiceDetail from "../models/model.serviceDetails";
import ServiceType from "../models/model.serviceType";

export const createServiceDetails = async ( req,res,next)=>{

    const { service_type_id , service_detail  } = req.body;

    try {
        
            const serviceType = await ServiceType.findByPk(service_type_id);

            if ( !serviceType ){
                return next( new CustomError('No service type found with this given id.',statusCode.NOT_FOUND));
            }

            const existingServiceDetail = await ServiceDetail.findOne({where:{service_detail}});

            if ( existingServiceDetail ){
                return next ( new CustomError("This service detail already exist",statusCode.CONFLICT));
            }

            await ServiceDetail.create({...req.body,serviceTypeId:service_type_id});
        
            return res.status(statusCode.CREATED).json({
                success: true,
                message: "Service detail created successfully.",
            });


    } catch (error) {
        console.log("Error in creating service detail type : ", error);
        next ( error );
    }
}


export const updateServiceDetails = async ( req,res,next)=>{
    const { id } = req.params;
    const { service_type_id , service_detail  } = req.body;

    try {

        const serviceDetails = await ServiceDetail.findByPk(id);

        if (!serviceDetails) {
           return next( new CustomError("No service details found .",statusCode.NOT_FOUND));
        }

        const serviceType = await ServiceType.findByPk(service_type_id);

        if ( !serviceType){
              return next ( new CustomError("No service type found with this given id.",statusCode.NOT_FOUND));
           }
        
        if ( service_detail != serviceDetails.service_detail ){
            const existingServiceDetails = await ServiceDetail.findOne({where:{service_detail}});

            if ( existingServiceDetails){
                return next ( new CustomError("Service Details already exist.",statusCode.CONFLICT));
            }
        }

        await ServiceDetail.update({...req.body,serviceTypeId:service_type_id},{where:{id:id}});

        return res.status(200).json({
            success: true,
            message: "service details updated successfully.",
        });
    } catch (error) {
        console.log("Error in updating service details : ", error);
        next(error);
    }
}
export const getServiceDetailsByServiceTypes = async ( req,res,next)=>{
    const { id } = req.params;
    
    try {
        const getAllServiceDetails = await ServiceDetail.findAll({where:{serviceTypeId : id}});
        if ( getAllServiceDetails.length < 1 ) {
           return next ( new CustomError("No service details found for this service type ",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.CREATED).json({
            success: true,
            message: "Fetched service details successfully.",
            data: getAllServiceDetails
        });
    } catch (error) {
        console.log("Error in all service details for particular service type : ", error);
        next ( error);
    }
}
export const getAllServiceDetails = async ( req,res,next)=>{
    try {

        const allServiceDetails = await ServiceDetail.findAll();

        if ( allServiceDetails.length < 1 ){
            return next ( new CustomError("No service details Found.",statusCode.NOT_FOUND));
        }
        return res.status(statusCode.OK).json({
            success: true,
            message: "Fetched all service details successfully.",
            data: allServiceDetails
        });
    } catch (error) {
        console.log("Error in getting all service details sub type :  ", error);
        next ( error);
    }
}