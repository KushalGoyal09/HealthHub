import { Request,Response } from "express";

const notFound = (req:Request, res:Response) => {
    res.status(404).json({
        success: false,
        message: 'The requested resource could not be found',
        statusCode: 404,
        discription: "Not Found"
    });
};

export default notFound;