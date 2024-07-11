"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
const client_1 = require("@prisma/client");
const customError_1 = require("../customError/customError");
const auth_1 = __importDefault(require("../middleware/auth"));
const patientAuth_1 = __importDefault(require("../middleware/patientAuth"));
const secrets_1 = __importDefault(require("../utils/secrets"));
const db = new client_1.PrismaClient();
const bookAppointmentRouter = (0, express_1.Router)();
const bodySchema = zod_1.z.object({
    paymentId: zod_1.z.coerce.string(),
    orderId: zod_1.z.coerce.string(),
    signature: zod_1.z.coerce.string(),
});
const bookAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.id;
    if (!patientId) {
        (0, customError_1.throwUnauthorizedError)("Not register as patient");
        return;
    }
    const parsed = bodySchema.safeParse(req.body);
    if (parsed.success === false) {
        (0, customError_1.throwForbiddenError)("Wrong Input");
        return;
    }
    const { paymentId, orderId, signature } = parsed.data;
    const isValid = (0, razorpay_utils_1.validatePaymentVerification)({
        order_id: orderId,
        payment_id: paymentId,
    }, signature, secrets_1.default.KEY_SECRET);
    if (!isValid) {
        (0, customError_1.throwBadRequestError)("Payment was not successful");
        return;
    }
    try {
        const order = yield db.order.update({
            where: {
                id: orderId,
                patientId: patientId,
            },
            data: {
                status: "PAID",
            },
        });
        const slot = yield db.slot.create({
            data: {
                startTime: order.bookTime,
                endTime: order.endTime,
                duration: order.duration,
            },
        });
        yield db.appointment.create({
            data: {
                doctorId: order.doctorId,
                patientId: order.patientId,
                slotId: slot.id,
                reason: order.reason,
            },
        });
        yield db.doctor.update({
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
    }
    catch (error) {
        (0, customError_1.throwInternalServerError)("Can not book the appointment");
    }
});
bookAppointmentRouter.post("/", auth_1.default, patientAuth_1.default, bookAppointment);
exports.default = bookAppointmentRouter;
