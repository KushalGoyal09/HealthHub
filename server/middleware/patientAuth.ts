import { Request, Response, NextFunction } from "express";
import { AuthRequest, Role } from "./auth";
import {
    throwUnauthorizedError,
    throwInternalServerError,
} from "../customError/customError";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const patientAuthMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userId;
    if (!userId) {
        throwUnauthorizedError("Unauthorized");
        return;
    }
    const patient = await db.patient.findUnique({
        where: {
            userId: userId,
        },
        select: {
            id: true,
        },
    });
    if (!patient) {
        throwUnauthorizedError("Not registered as patient");
        return;
    }
    req.role = Role.Patient;
    req.id = patient.id;
    next();
};

export default patientAuthMiddleware;
