import { Response, Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import {
    throwBadRequestError,
    throwForbiddenError,
    throwUnauthorizedError,
} from "../customError/customError";
const registerPatientRouter = Router();
const db = new PrismaClient();

interface ReqBody {
    dateOfBirth: Date;
    medicalHistory?: string;
}

interface ResBody {
    success: boolean;
    message: string;
    id: number;
}

const bodySchema = z.object({
    dateOfBirth: z.coerce.date(),
    medicalHistory: z.string().default(""),
});

const registerPatient = async (
    req: AuthRequest<{}, {}, ReqBody>,
    res: Response<ResBody>
) => {
    const userId = req.userId;
    if (!userId) {
        throwUnauthorizedError("You are not logged in");
        return;
    }
    const parsed = bodySchema.safeParse(req.body);
    if (parsed.success === false) {
        throwForbiddenError("Wrong input");
        return;
    }
    const { dateOfBirth, medicalHistory } = parsed.data;
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            role: true,
        },
    });
    if (!user) {
        throwUnauthorizedError("No user found");
        return;
    }
    if (user.role === "DOCTOR") {
        throwBadRequestError("you are already registered as doctor");
        return;
    }
    if (user.role === "PATIENT") {
        throwBadRequestError("you are already registered as patient");
        return;
    }
    const result = await db.patient.create({
        data: {
            userId,
            dateOfBirth,
            medicalHistory,
        },
        select: {
            id: true,
        },
    });
    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            role: "PATIENT",
        },
    });
    res.status(200).json({
        success: true,
        message: "Patient registered Successfully",
        id: result.id,
    });
};

registerPatientRouter.post("/", authMiddleware, registerPatient);

export default registerPatientRouter;
