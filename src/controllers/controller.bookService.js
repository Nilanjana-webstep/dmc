import { statusCode } from "../config/constraint.js";
import BookService from "../models/model.bookService.js"
import Borough from "../models/model.borough.js";
import NirmalBandhu from "../models/model.nirmalBandhu.js";
import ServiceType from "../models/model.serviceType.js";
import Ward from "../models/model.ward.js";
import CustomError from "../utils/util.customError.js";


export const bookService = async (req,res,next)=>{

    const { service_type_id , address, nirmal_bandhu_full_name,service_date_time,
            nirmal_bandhu_mobile_number, service_description,borough_id, ward_id } = req.body;
    
    const customer_id = 1000002;

    try {

        const serviceType = await ServiceType.findByPk(service_type_id);
        if ( !serviceType){
            return next( new CustomError("No service type found with this Id.",statusCode.NOT_FOUND));
        }
        const nirmalBandhu = await NirmalBandhu.findOne({where : { full_name : nirmal_bandhu_full_name,mobile_number:nirmal_bandhu_mobile_number}});
        if ( !nirmalBandhu){
            return next( new CustomError("No nirmal bandhu found with this mobile number and name.",statusCode.NOT_FOUND));
        }
        const ward = await Ward.findByPk(ward_id);
        if ( !ward ){
            return next( new CustomError("No ward found with this mobile number.",statusCode.NOT_FOUND));
        }
        const borough = await Borough.findByPk(borough_id);
        if ( !borough ){
            return next( new CustomError("No borough found with this mobile number.",statusCode.NOT_FOUND));
        }
        const serviceTypeId = service_type_id;
        const nirmal_bandhu_id = nirmalBandhu.dataValues.nirmal_bandhu_id;
        const wardId = ward_id;
        const boroughId = borough_id;

        await BookService.create({service_description,wardId,nirmal_bandhu_id,boroughId,
                                    serviceTypeId,address,service_date_time,customer_id
                                });
        
        return res.status(statusCode.CREATED).json({
            success : true,
            message : "successfully booked service",
        })
        
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

        // const sql = ` 
        //             SELECT bs.*,c.full_name as customer_name,nb.full_name as nirmal_bandhu_full_name
        //             FROM booked_services bs 
        //             JOIN customers c on bs.customer_id = c.customer_id
        //             JOIN nirmal_bandhus nb on nb.nirmal_bandhu_id = bs.nirmal_bandhu_id
        //             JOIN wards w on w.id = bs.wardId
        //             JOIN boroughs b on b.id = bs.boroughId
        //             JOIN service_types st on st.id = bs.serviceTypeId

        //             `
        
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