import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest, Role } from "./auth";
import {
    throwInternalServerError,
    throwUnauthorizedError,
} from "../customError/customError";
const db = new PrismaClient();

const doctorAuthMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userId;
    if (!userId) {
        throwUnauthorizedError("Unauthorized");
        return;
    }
    const doctor = await db.doctor.findUnique({
        where: {
            userId: userId,
        },
        select: {
            id: true,
        },
    });
    if (!doctor) {
        throwUnauthorizedError("Not registered as doctor");
        return;
    }
    req.role = Role.Doctor;
    req.id = doctor.id;
    next();
};

export default doctorAuthMiddleware;
