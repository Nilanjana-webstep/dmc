const errorMiddleware = (err, req, res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "BACKEND ERROR";

    
    return  res.status(statusCode).json({
                success : false,
                message,
            })    
     
  };
  
  export default errorMiddleware;