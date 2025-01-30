import NoticeBoard from "../models/model.noticeBoard.js"
import { updateDatabaseObject } from "../utils/util.database.js";
import { Op } from "sequelize";
import { currentISTDate } from "../config/constraint.js";


export const createNotice = async ( req,res )=>{
    try {
        
        const notice = await NoticeBoard.create(req.body);
        
        return res.status(200).json({
            success : true,
            message : "notice successfully created.",
            data : notice,
        })

    } catch (error) {
        console.log("the error of creating notice : ",error);
        
    }
}


export const updateNotice = async ( req,res )=>{

    const id = req.params;

    try {
        
        const notice = await NoticeBoard.findByPk(id);
        const updatedNotice = updateDatabaseObject(req.body,notice);
        await updatedNotice.save();
        
    } catch (error) {
        console.log("error updating notice : ",error);
        
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
            return res.status(200).json({
                success : true,
                message : "No active notice found.",
            })
        }

        return res.status(200).json({
            success : true,
            message : "all active notice fetched successfully.",
            data : allActiveNotice,
        })
    } catch (error) {
        console.log("error of getting all active notices : ",error);
        
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





