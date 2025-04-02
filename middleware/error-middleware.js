/*import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    logger.error(`[ERROR] ${err.message}`);

    // Default error status
    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export default errorHandler;*/
