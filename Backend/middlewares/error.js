const errorMiddleware = (err, req, res, next) => {
    err.message ||= "internal server error"
    err.statusCode ||= 500;
    return res.status(err.statusCode).json({message:err.message})
}


export { errorMiddleware }; 