import { statusCode } from "../config/constraint.js";
import NoticeBoard from "../models/model.noticeBoard.js"
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";



export const createNotice = async ( req,res )=>{
    try {
        
        await NoticeBoard.create(req.body);
        
        return res.status(statusCode.CREATED).json({
            success : true,
            message : "notice successfully created.",
        })

    } catch (error) {
        console.log("the error of creating notice : ",error);
        nextDay(error);
    }
}


export const updateNotice = async ( req,res )=>{

    const id = req.params;

    try {
        
        const notice = await NoticeBoard.findByPk(id);
        if (!notice){
            return next( new CustomError("No notice found with this id.",statusCode.NOT_FOUND));
        }
        await NoticeBoard.update(req.body,{where:{id}});
        
    } catch (error) {
        console.log("error updating notice : ",error);
        next(error);
        
    }
}


export const getActiveAllNotice = async ( req,res )=>{
    try {
        const allActiveNotice = await NoticeBoard.findAll({
            where : {
                is_active : true
            }
        })

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


export const deleteNotice = async ( req,res )=>{

    const { id } = req.params;

    try {
        const notice = await NoticeBoard.findByPk(id);
        notice.is_active = false;
        await notice.save();
        return res.status(200).json({
            success : true,
            message : "successfully deleted notice.",
        })

    } catch (error) {
        console.log('error of deleting notice : ',error);
        
    }
}





