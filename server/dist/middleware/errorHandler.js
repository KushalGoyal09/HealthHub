"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../customError/customError");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof customError_1.CustomError) {
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
exports.default = errorHandler;
