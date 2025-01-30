import { scheduleJob } from "node-schedule";
import { deactivateExpiredNotices } from "../controllers/controller.noticeBoard.js";


export const billGenerationFirstDayOfMonth = async ()=>{

    scheduleJob('* * * 1 * *',async ()=>{
        // should send bill to all user.
    })
}