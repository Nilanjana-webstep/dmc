import NirmalBandhu from "../models/model.nirmalBandhu.js";
import CustomError from "../utils/util.customError.js";
import { statusCode } from "../config/constraint.js";
import Ward from "../models/model.ward.js";
import Borough from "../models/model.borough.js";
import sequelize from "../config/db.js";
import fs from 'fs';


export const createNirmalBandhu = async (req,res,next)=>{

    const { mobile_number, ward_id, borough_id } = req.body;

    try {

        const existingNirmalBandhu = await NirmalBandhu.findOne({where:{mobile_number}});

        if ( existingNirmalBandhu ){
            return next( new CustomError("This Nirmal Bandhu with this number already exist.",statusCode.CONFLICT));
        }

        const ward = await Ward.findByPk(ward_id);

        if ( !ward ){
            return next( new CustomError("No ward found.",statusCode.NOT_FOUND));
        }

        const wardId = ward_id;

        const borough = await Borough.findByPk(borough_id);

        if ( !borough ){
            return next( new CustomError("No Borough found.",statusCode.NOT_FOUND));
        }

        const boroughId = borough_id;

        if ( ward.boroughId != borough_id ){
            return next( new CustomError( "Ward not found with this borough.",statusCode.NOT_FOUND));
        }
       
        await NirmalBandhu.create({...req.body,wardId,boroughId,adhar_card_photo:req.file.path});
        
        return res.status(statusCode.CREATED).json({
            success : true,
            message : "successfully created nirmal bandhu.",
        })

    } catch (error) {
        console.log("error creating nirmal bandhu : ",error);
        next(error);
        
    }
}


export const getAllNirmalBandhu = async (req,res,next)=>{
    try {
        
        const sql = ` SELECT nb.*, w.ward,b.borough
                      FROM nirmal_bandhus nb 
                      JOIN wards w on w.id = nb.wardId
                      JOIN boroughs b on b.id = nb.boroughId
                      ORDER BY createdAt DESC
                    `
        const [ allNirmalBandhu ] = await sequelize.query(sql);
        
        if ( allNirmalBandhu.length < 1 ){

            return res.json({
                success : true,
                message : "No Nirmal bandhu found.",
                data:allNirmalBandhu
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
        const sql = ` SELECT nb.*,w.ward,b.borough
                      FROM nirmal_bandhus nb 
                      JOIN wards w on w.id = nb.wardId
                      JOIN boroughs b on b.id = nb.boroughId
                      WHERE nb.nirmal_bandhu_id = ${id};
                    `
        const [nirmalBandhu] = await sequelize.query(sql);

        if ( nirmalBandhu.length < 1 ){
            return next( new CustomError('No Nirmal bandhu found.',statusCode.NOT_FOUND));
        }

        return res.json({
            success : true,
            message : " Successfully find Nirmal Bandhu",
            data : nirmalBandhu
        })

    } catch (error) {
        
        console.log("Error getting particular nirmal bandhu : ",error);
        next(error);
    }
}


export const updateNirmalBandhuById = async (req,res,next)=>{

    const { id } = req.params;
    const { mobile_number, ward_id, borough_id } = req.body;

    let updatedNirmalBandhuData = { ...req.body };

    try {
        
        const nirmalBandhu = await NirmalBandhu.findByPk(id);

        if ( !nirmalBandhu ){
            return next( new CustomError("This Nirmal Bandhu with this id not found.",statusCode.NOT_FOUND));
        }

        if ( nirmalBandhu.mobile_number != mobile_number ){
            const existingNirmalBandhu = await NirmalBandhu.findOne({where:{mobile_number}});
            if ( existingNirmalBandhu ){
                return next( new CustomError("This Nirmal Bandhu with this number already exist.",statusCode.CONFLICT));
            }
        }

        const ward = await Ward.findByPk(ward_id);

        if ( !ward ){
            return next( new CustomError("No ward found.",statusCode.NOT_FOUND));
        }

        const wardId = ward_id;

        const borough = await Borough.findByPk(borough_id);

        if ( !borough ){
            return next( new CustomError("No Borough found.",statusCode.NOT_FOUND));
        }

        const boroughId = borough_id;

        if ( ward.boroughId != borough_id ){
            return next( new CustomError( "Ward not found with this borough.",statusCode.NOT_FOUND));
        }

        updatedNirmalBandhuData = {...updatedNirmalBandhuData,wardId,boroughId};

        if ( req.file){
            if (nirmalBandhu.adhar_card_photo) {
                fs.unlink(nirmalBandhu.adhar_card_photo, (err) => {
                    if (err) {
                        console.error(`Failed to delete old photo: ${err.message}`);
                    } else {
                        console.log('Old photo deleted successfully');
                    }
                });
            }
            updatedNirmalBandhuData = { ...updatedNirmalBandhuData,adhar_card_photo:req.file.path};
            
        }
        
        await NirmalBandhu.update(updatedNirmalBandhuData,{where:{nirmal_bandhu_id:id}});

        return res.status(statusCode.OK).json({
            success : true,
            message : "successfully update nirmal bandhu.",
        })

    } catch (error) {
        console.log("Error to update nirmal bandhu : ",error);
        next(error);
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