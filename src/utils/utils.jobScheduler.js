import { scheduleJob } from "node-schedule";



export const billGenerationFirstDayOfMonth = async ()=>{

    scheduleJob('* * * 1 * *',async ()=>{
        // should send bill to all user.
    })
}