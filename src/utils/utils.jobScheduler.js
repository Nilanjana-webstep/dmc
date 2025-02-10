import { scheduleJob } from "node-schedule";


export const billGenerateJob = async ()=>{

    scheduleJob('0 5 * * *',async ()=>{
        // should send bill to all user.
    })
}