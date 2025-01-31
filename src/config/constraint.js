import moment from 'moment-timezone';

export const currentISTDate = ()=>{
    const date = moment().tz('Asia/Kolkata').toDate();
    console.log("the date is : ",date);
    
    return date;
}

export const statusCode = {
    OK: 200,
    CREATED: 201, 
    NO_CONTENT_SEND: 204, 
    BAD_REQUEST: 400, 
    UNAUTHORIZED: 401,
    FORBIDDEN: 403, 
    NOT_FOUND: 404, 
    CONFLICT: 409, 
  };
  

