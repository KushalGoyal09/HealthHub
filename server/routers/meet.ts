import { Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import {
    throwBadRequestError,
    throwUnauthorizedError,
} from "../customError/customError";
import { z } from "zod";
import isMeetValid from "../utils/isMeetValid";
const db = new PrismaClient();
const meetRouter = Router();

interface MeetResponse {
    success: boolean;
    valid: boolean;
}

interface MeetReq {
    currentDate: Date;
}

const meetBodySchema = z.object({
    currentDate: z.coerce.date(),
});

const handleMeet = async (
    req: AuthRequest<{ meetId: string }, {}, MeetReq>,
    res: Response<MeetResponse>
) => {
    const userId = req.userId;
    const meetId = req.params.meetId;
    let appointmentId = 0;
    try {
        appointmentId = Number(meetId);
    } catch (error) {
        throwBadRequestError("MeetId Invalid");
        return;
    }
    if (!userId) {
        throwUnauthorizedError("No user");
        return;
    }
    const parsedData = meetBodySchema.safeParse(req.body);
    if (!parsedData.success) {
        throwBadRequestError("currentDate not found");
        return;
    }
    const { currentDate } = parsedData.data;
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            role: true,
            Doctor: {
                select: {
                    id: true,
                },
            },
            Patient: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!user || user.role === "USER" || (user.Doctor && user.Patient)) {
        throwUnauthorizedError("Unauthorized");
        return;
    }
    const doctorId = user.Doctor?.id;
    const patientId = user.Patient?.id;
    const appointment = await db.appointment.findUnique({
        where: {
            id: appointmentId,
        },
        select: {
            doctorId: true,
            patientId: true,
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                },
            },
        },
    });
    if (!appointment) {
        throwBadRequestError("No appointment as such");
        return;
    }
    if (doctorId && appointment.doctorId !== doctorId) {
        res.json({
            success: true,
            valid: false,
        });
        return;
    }
    if (patientId && appointment.patientId !== patientId) {
        res.json({
            success: true,
            valid: false,
        });
    }
    res.json({
        success: true,
        valid: isMeetValid(currentDate, appointment.slot),
    });
};

meetRouter.get("/:meetId", authMiddleware, handleMeet);

export default meetRouter;