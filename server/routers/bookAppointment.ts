import { Response, Router } from "express";
import { z } from "zod";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { PrismaClient } from "@prisma/client";
import {
    throwBadRequestError,
    throwForbiddenError,
    throwInternalServerError,
    throwUnauthorizedError,
} from "../customError/customError";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import patientAuthMiddleware from "../middleware/patientAuth";
import Secret from "../utils/secrets";
const db = new PrismaClient();
const bookAppointmentRouter = Router();

interface ReqBody {
    paymentId: string;
    orderId: string;
    signature: string;
}

interface ResBody {
    success: boolean;
    message: string;
    slot: {
        id: number;
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

const bodySchema = z.object({
    paymentId: z.coerce.string(),
    orderId: z.coerce.string(),
    signature: z.coerce.string(),
});

const bookAppointment = async (
    req: AuthRequest<{}, {}, ReqBody>,
    res: Response<ResBody>
) => {
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("Not register as patient");
        return;
    }
    const parsed = bodySchema.safeParse(req.body);
    if (parsed.success === false) {
        throwForbiddenError("Wrong Input");
        return;
    }
    const { paymentId, orderId, signature } = parsed.data;
    const isValid = validatePaymentVerification(
        {
            order_id: orderId,
            payment_id: paymentId,
        },
        signature,
        Secret.KEY_SECRET
    );
    if (!isValid) {
        throwBadRequestError("Payment was not successful");
        return;
    }
    try {
        const order = await db.order.update({
            where: {
                id: orderId,
                patientId: patientId,
            },
            data: {
                status: "PAID",
            },
        });
        const slot = await db.slot.create({
            data: {
                startTime: order.bookTime,
                endTime: order.endTime,
                duration: order.duration,
            },
        });
        await db.appointment.create({
            data: {
                doctorId: order.doctorId,
                patientId: order.patientId,
                slotId: slot.id,
                reason: order.reason,
            },
        });
        await db.doctor.update({
            where: {
                id: order.doctorId,
            },
            data: {
                wallet: { increment: order.amount },
            },
        });
        res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
            slot: slot,
        });
    } catch (error) {
        throwInternalServerError("Can not book the appointment");
    }
};

bookAppointmentRouter.post(
    "/",
    authMiddleware,
    patientAuthMiddleware,
    bookAppointment
);

export default bookAppointmentRouter;
