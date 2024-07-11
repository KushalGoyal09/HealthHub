import { Request, Response, NextFunction } from "express";
import { CustomError } from "../customError/customError";

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            description: err.discription || "Internal server error",
            statusCode: err.statusCode || 500,
        });
    }
    return res.status(500).json({
        success: false,
        message: "somthing is wrong",
        description: "Internal server error",
        statusCode: 500,
    });
};

export default errorHandler;
