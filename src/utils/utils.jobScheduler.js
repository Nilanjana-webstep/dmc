import { scheduleJob } from "node-schedule";
import { deactivateExpiredNotices } from "../controllers/controller.noticeBoard.js";

export const expireNoticeJob = async( )=>{
    try {
        
        scheduleJob('*/5 * * * * *', async() => {
            await deactivateExpiredNotices();
        });
        
        
    } catch (error) {
        
    }
} 