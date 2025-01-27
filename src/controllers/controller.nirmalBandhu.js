import NirmalBandhu from "../models/model.nirmalBandhu.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import CustomError from "../utils/util.customError.js";



export const createNirmalBandhu = async (req,res,next)=>{

    try {
    
        const nirmalBandhu = await NirmalBandhu.create({...req.body,adhar_card:req.file.path});
        nirmalBandhu.nirmal_bandhu_id = 100000 + nirmalBandhu.id;
        await nirmalBandhu.save();
        
        return res.json({
            success : true,
            message : "successfully created nirmal bandhu.",
            data : nirmalBandhu
        })

        
    } catch (error) {
        console.log("error creating nirmal bandhu : ",error);
        return next( new CustomError("Sorry not createing Nirmal Bandhu",500))
        
    }
}


export const getAllNirmalBandhu = async (req,res,next)=>{
    try {
        
        const allNirmalBandhu = await NirmalBandhu.findAll();

        if ( allNirmalBandhu.length < 1 ){

            return res.json({
                success : true,
                message : "No Nirmal bandhu found."
            })
        }

        return res.json({
            success : true,
            message : "All nirmal bandhu fetched  successfully.",
            data : allNirmalBandhu
        })
    } catch (error) {
        console.log("Error getting all the nirmall bandhu data :  ",error);
        
    }
}


export const getParticularNirmalBandhuById = async (req,res,next)=>{

    const { id }  = req.params;

    try {
        
        const nirmalBandhu = await NirmalBandhu.findByPk(id);

        if ( !nirmalBandhu ){
            
            return res.json({
                success : true,
                message : "No Nirmal bandhu found."
            })
        }


        return res.json({
            success : true,
            message : " Successfully find Nirmal Bandhu",
            data : nirmalBandhu
        })

    } catch (error) {
        
        console.log("Error getting nirmal bandhu : ",error);
        
    }
}


export const updateNirmalBandhuById = async (req,res,next)=>{

    const { id } = req.params;
    try {
        
        const nirmalBandhu = await NirmalBandhu.findByPk(id);

        const updatedNirmalBandhu = updateDatabaseObject(req.body,nirmalBandhu);
        await updatedNirmalBandhu.save();

        return res.json({
            success : true,
            message : "successfully update nirmal bandhu.",
            data : updatedNirmalBandhu
        })

    } catch (error) {
        console.log("Error to update nirmal bandhu : ",error);
        
        
    }
}


export const deleteNirmalBandhuById = async (req,res,next)=>{

    const { id } = req.params;

    try {
        
        const nirmalBandhu = await NirmalBandhu.findByPk(id);

        nirmalBandhu.status = false;
        await nirmalBandhu.save();

        return res.json({
            success : true,
            message : "successfully delete nirmal bandhu.",
            
        })

    } catch (error) {
        console.log("Error to delete nirmal bandhu : ",error);
        
        
    }
}