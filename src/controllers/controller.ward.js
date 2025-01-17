import Ward from "../models/model.ward.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";



export const createWard = async (req,res,next)=>{

    try {
      
        const ward = await Ward.create(req.body);

        return res.json({
            success : true,
            message : " ward created successfully.",
            data : ward
        })

    } catch (error) {

        console.log("error is : ",error);
        return next ( new CustomError(" ward is not created.Please try again.",500));

    }
}


export const getAllWard = async (req,res,next)=>{

    try {

        const allWard = await Ward.findAll();

        return res.json({
            success : true,
            message : " fetched all wards successfully.",
            data : allWard
        })

      
    } catch (error) {
        
        console.log("error is : ",error);
        return next ( new CustomError(" can not fetched all ward",500));

    }
}


export const getParticularWardById = async (req,res,next)=>{

    const { ward_id } = req.params;

    try {

        const ward  = await Ward.findByPk(ward_id);

        if ( !ward ){

            return res.json({
                success : false,
                message : "no  ward found.",
            })
        }

        return res.json({
            success : true,
            message : " fetched wards successfully.",
            data : ward
        })
      
    } catch (error) {
        
        console.log("error is : ",error);
        return next ( new CustomError(" can not fetched  ward",500));

    }
}


export const updateWardById = async (req,res,next)=>{

    const { ward_id } = req.params;

    console.log("the id is : ",ward_id);
    

    try {

        const ward = await Ward.findByPk(ward_id);

        if ( !ward ){

            return res.json({
                success : false,
                message : " no ward found for this id.",
            })

        }

        const updatedWard = updateDatabaseObject(req.body,ward);

        await updatedWard.save();

        return res.json({
            success : true,
            message : " update ward successfully.",
            data : updatedWard
        })
       
      
    } catch (error) {
        
        console.log("error is : ",error);
        return next ( new CustomError(" can not updated  ward",500));

    }
}


export const deleteWardById = (req,res,next)=>{



    try {


      
    } catch (error) {


        
    }
}