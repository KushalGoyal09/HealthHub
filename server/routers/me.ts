import { Request, Response, Router } from "express";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import {
    throwInternalServerError,
    throwUnauthorizedError,
} from "../customError/customError";
import { PrismaClient } from "@prisma/client";
const meRouter = Router();
const db = new PrismaClient();

interface ResBody {
    success: boolean;
    message: string;
    user: {
        name: string;
        email: string;
        role: "ADMIN" | "DOCTOR" | "PATIENT" | "USER";
        patientId: number | undefined;
        doctorId: number | undefined;
    };
}

const userInfo = async (req: AuthRequest, res: Response<ResBody>) => {
    const userId = req.userId;
    if (!userId) {
        throwUnauthorizedError("Unauthorized");
        return;
    }
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                Doctor: { select: { id: true } },
                Patient: { select: { id: true } },
                role: true,
            },
        });
        if (!user) {
            throwUnauthorizedError("Unauthorized");
            return;
        }
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                patientId: user.Patient?.id,
                doctorId: user.Doctor?.id,
            },
        });
    } catch (error) {
        throwInternalServerError();
    }
};

meRouter.get("/", authMiddleware, userInfo);

export default meRouter;