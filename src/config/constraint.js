import moment from 'moment-timezone';

export const currentISTDate = ()=>{
    const date = moment().tz('Asia/Kolkata').toDate();
    console.log("the date is : ",date);
    
    return date;
}

