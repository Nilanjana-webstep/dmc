import { statusCode } from "../config/constraint.js";
import NoticeBoard from "../models/model.noticeBoard.js"
import CustomError from "../utils/util.customError.js";
import { Op } from "sequelize";



export const createNotice = async ( req,res,next )=>{
    try {
        
        await NoticeBoard.create(req.body);
        
        return res.status(statusCode.CREATED).json({
            success : true,
            message : "notice successfully created.",
        })

    } catch (error) {
        console.log("the error of creating notice : ",error);
        next(error);
    }
}


export const updateNotice = async ( req,res,next )=>{

    const { id } = req.params;
    console.log("got hit ");
    
    
    try {
        
        const notice = await NoticeBoard.findByPk(id);
        if (!notice){
            return next( new CustomError("No notice found with this id.",statusCode.NOT_FOUND));
        }
        await NoticeBoard.update(req.body,{where:{id}});
        res.status(statusCode.OK).json({
            success : true,
            message : "notice board updated successfully.",
        })
        
    } catch (error) {
        console.log("error updating notice : ",error);
        next(error);
        
    }
}


export const getActiveAllNotice = async ( req,res,next )=>{
    try {
        const allActiveNotice = await NoticeBoard.findAll({
            where: {
                is_active: true,
                end_date: {
                    [Op.gt]: new Date() 
                }
            }
        });

        if ( allActiveNotice.length < 1 ){
           return next( new CustomError('No active notice found.',statusCode.NOT_FOUND));
        }

        return res.status(200).json({
            success : true,
            message : "all active notice fetched successfully.",
            data : allActiveNotice,
        })
    } catch (error) {
        console.log("error of getting all active notices : ",error);
        next(error);
        
    }
}








