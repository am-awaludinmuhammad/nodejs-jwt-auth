import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ResponseError) {
        if (!err) {
            next();
            return;
        }
        
        res.status(err.status).json({
            message: err.message,
            details: err.details
        }).end();
    } else {
        res.status(500).json({
            message: err.message
        });
    }
}

export {
    errorMiddleware
}