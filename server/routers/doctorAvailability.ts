import { Request, Response, Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import calculateFreeSlots from "../utils/calculateFreeSlots";
import {
    throwBadRequestError,
    throwForbiddenError,
    throwNotFoundError,
} from "../customError/customError";
import authMiddleware from "../middleware/auth";
const db = new PrismaClient();
const availiblityRouter = Router();

interface ReqBody {
    currentDate: Date;
    bookDate: Date;
}

interface Slots {
    startTime: Date;
    endTime: Date;
    duration: number;
}

interface ResBody {
    success: boolean;
    message: string;
    slots: Slots[];
}

const bodySchema = z.object({
    currentDate: z.coerce.date(),
    bookDate: z.coerce.date(),
});

const getAllFreeSlots = async (
    req: Request<{ doctorId: string }, {}, ReqBody>,
    res: Response<ResBody>
) => {
    const parsedBody = bodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        throwBadRequestError("Please provide the current Date");
        return;
    }
    req.params;
    const { doctorId } = req.params;
    const { currentDate, bookDate } = parsedBody.data;
    const doctor = await db.doctor.findUnique({
        where: {
            id: Number(doctorId),
        },
        select: {
            appointments: {
                where: { status: "SCHEDULED" },
                select: { slot: true },
            },
            id: true,
            preferedTime: {
                select: { startTime: true, endTime: true, duration: true },
            },
        },
    });
    if (!doctor) {
        throwNotFoundError("No doctor as such");
        return;
    }
    const freeSlots = calculateFreeSlots(
        doctor.preferedTime,
        doctor.appointments,
        new Date(bookDate),
        new Date(currentDate)
    );
    if (!freeSlots || freeSlots.length < 1) {
        res.status(200).json({
            success: true,
            message: "No slot free",
            slots: [],
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Free slots fetched successfully",
        slots: freeSlots,
    });
};

availiblityRouter.post("/:doctorId", authMiddleware, getAllFreeSlots);

export default availiblityRouter;
