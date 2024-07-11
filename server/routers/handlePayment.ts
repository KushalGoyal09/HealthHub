import { Response, Router } from "express";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import Razorpay from "razorpay";
import Secret from "../utils/secrets";
import patientAuthMiddleware from "../middleware/patientAuth";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import {
    throwBadRequestError,
    throwForbiddenError,
    throwInternalServerError,
    throwUnauthorizedError,
} from "../customError/customError";
import isSlotValid from "../utils/isSlotValid";
import { Orders } from "razorpay/dist/types/orders";
const paymentRouter = Router();
const db = new PrismaClient();

interface ReqBody {
    doctorId: number;
    bookTime: Date;
    currentTime: Date;
    reason?: String;
}

interface ResBody {
    success: boolean;
    message: string;
    order: Orders.RazorpayOrder;
}

const bodySchema = z.object({
    doctorId: z.coerce.number(),
    bookTime: z.coerce.date(),
    currentTime: z.coerce.date(),
    reason: z.coerce.string().default("General"),
});

const handlePayment = async (
    req: AuthRequest<{}, {}, ReqBody>,
    res: Response<ResBody>
) => {
    const parsedBody = bodySchema.safeParse(req.body);
    if (parsedBody.error) {
        throwForbiddenError("Wrong Input");
        return;
    }
    const { doctorId, bookTime, currentTime, reason } = parsedBody.data;
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("Please register as patient first");
        return;
    }
    if (bookTime < currentTime) {
        throwBadRequestError("Cannot book the slot in past");
        return;
    }
    const doctor = await db.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            preferedTime: true,
            fees: true,
            id: true,
        },
    });
    if (!doctor) {
        throwBadRequestError("No doctor found with the given Id");
        return;
    }
    if (!isSlotValid(bookTime, doctor.preferedTime)) {
        throwBadRequestError("Slot is not according to doctor's preference");
        return;
    }
    const slot = await db.slot.findFirst({
        where: {
            appointment: {
                doctorId: doctorId,
            },
            startTime: bookTime,
        },
    });
    if (slot) {
        throwBadRequestError("Slot is already booked");
        return;
    }
    const razorpay = new Razorpay({
        key_id: Secret.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });
    try {
        const order = await razorpay.orders.create({
            amount: doctor.fees * 100,
            currency: "INR",
            receipt: `order_doctorId{${doctorId}}_${bookTime.valueOf()}`,
        });
           
        res.status(200).json({
            success: true,
            message: "Order generated successfully",
            order: order,
        });
        await db.order.create({
            data: {
                id: order.id,
                reason: reason,
                bookTime: bookTime,
                endTime: new Date(
                    bookTime.valueOf() + doctor.preferedTime.duration * 60000
                ),
                duration: doctor.preferedTime.duration,
                doctorId: doctor.id,
                patientId: patientId,
                amount: doctor.fees,
            },
        });
    } catch (error) {
        throwInternalServerError("Razorpay Error");
    }
};

paymentRouter.post("/", authMiddleware, patientAuthMiddleware, handlePayment);

export default paymentRouter;
