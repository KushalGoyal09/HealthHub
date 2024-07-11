"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'The requested resource could not be found',
        statusCode: 404,
        discription: "Not Found"
    });
};
exports.default = notFound;
