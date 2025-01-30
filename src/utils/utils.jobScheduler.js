import { scheduleJob } from "node-schedule";
import { deactivateExpiredNotices } from "../controllers/controller.noticeBoard.js";

export const expireNoticeJob = async( )=>{
    try {
        
        scheduleJob('* * 0 * * *', async() => {
            await deactivateExpiredNotices();
        });
        
        
    } catch (error) {
        
    }
} 


export const billGenerationFirstDayOfMonth = async ()=>{

    scheduleJob('* * * 1 * *',async ()=>{
        // should send bill to all user.
    })
}