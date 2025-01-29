import BookService from "../models/model.bookService.js"
import NirmalBandhu from "../models/model.nirmalBandhu.js";
import ServiceType from "../models/model.serviceType.js";
import Ward from "../models/model.ward.js";


export const bookService = async (req,res,next)=>{

    const { service_type, address, nirmal_bandhu_full_name,service_date_time,
            nirmal_bandhu_mobile_number, service_description, ward_no } = req.body;

    try {

        const serviceType = await ServiceType.findOne({where : {service_type:service_type}});
        const nirmalBandhu = await NirmalBandhu.findOne({where : { full_name : nirmal_bandhu_full_name,mobile_number:nirmal_bandhu_mobile_number}});
        const ward = await Ward.findOne({where : { ward_no : ward_no}});
        const serviceTypeId = serviceType.dataValues.id;
        const nirmalBandhuId = nirmalBandhu.dataValues.id;
        const wardId = ward.dataValues.id;

        const bookedService = await BookService.create({service_description,wardId,nirmalBandhuId,
                                                            serviceTypeId,address,service_date_time
                                                        });
        if ( bookService ){
            return res.status(200).json({
                success : true,
                message : "successfully booked service",
                data : bookService,
            })
        }
    } catch (error) {
        console.log("the error of booking service : ",error);
        
    }
}

export const getAllBookedServiceOfParticularCustomer = async ( req,res,next)=>{
    
    const { id } = req.params;
    try {
        
        const allServices = await BookService.findAll({where:{customerId:id}});
        
        if ( allServices.length < 1 ){
            return res.status(200).json({
                success : true,
                message : "No service found ."
            })
        }

        return res.status(200).json({
            success : true,
            message : "fetched all service successfully .",
            data : allServices,
        })

    } catch (error) {
        console.log( " error of getting all booked service data for particular customer : ",error);

        
    }
}

export const getAllBookedService = async ( req,res,next)=>{
    try {
        
        const allServices = await BookService.findAll();
        
        if ( allServices.length < 1 ){
            return res.status(200).json({
                success : true,
                message : "No service found ."
            })
        }

        return res.status(200).json({
            success : true,
            message : "fetched all service successfully .",
            data : allServices,
        })

    } catch (error) {
        console.log( " error of getting all booked service data  : ",error);

        
    }
}