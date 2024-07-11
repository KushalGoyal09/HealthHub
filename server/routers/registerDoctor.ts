import { Request, Response, Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import {
    throwUnauthorizedError,
    throwForbiddenError,
    throwBadRequestError
} from "../customError/customError";
import convertTimeToDate from "../utils/convertTimeToDate";
const registerDoctorRouter = Router();
const db = new PrismaClient();

interface ReqBody {
    specialty: string;
    education: string;
    experience: number;
    fees: number;
    preferedStartTime: string;
    preferedEndTime: string;
    duration?: number;
}

interface ResBody {
    success: boolean;
    message: string;
    id: number;
}

const bodySchema = z.object({
    specialty: z.coerce.string(),
    education: z.coerce.string(),
    experience: z.coerce.number(),
    fees: z.coerce.number(),
    preferedStartTime: z.string(),
    preferedEndTime: z.string(),
    duration: z.coerce.number().default(30),
});

const registerDoctor = async (
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
    const {
        specialty,
        education,
        experience,
        fees,
        preferedStartTime,
        preferedEndTime,
        duration,
    } = parsed.data;

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
    const preferedTime = await db.preferedTime.create({
        data: {
            startTime: convertTimeToDate(preferedStartTime),
            endTime: convertTimeToDate(preferedEndTime),
            duration: duration,
        },
        select: {
            id: true,
        },
    });
    const result = await db.doctor.create({
        data: {
            userId,
            specialty,
            education,
            experience,
            fees,
            preferedTimeId: preferedTime.id,
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
            role: "DOCTOR",
        },
    });
    res.status(200).json({
        success: true,
        message: "Doctor registered Successfully",
        id: result.id,
    });
};

registerDoctorRouter.post("/", authMiddleware, registerDoctor);

export default registerDoctorRouter;
