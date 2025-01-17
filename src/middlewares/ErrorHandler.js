const errorMiddleware = (err, req, res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "BACKEND ERROR";
    const details = err.details || undefined;
  
    if (!details) {
      res.status(statusCode).json({
        success : false,
        message,
      });
    } else {
      res.status(statusCode).json({
        success: false,
        message,
        details: details,
      });
    }
  };
  
  export default errorMiddleware;