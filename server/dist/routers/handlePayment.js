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
const auth_1 = __importDefault(require("../middleware/auth"));
const razorpay_1 = __importDefault(require("razorpay"));
const secrets_1 = __importDefault(require("../utils/secrets"));
const patientAuth_1 = __importDefault(require("../middleware/patientAuth"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const customError_1 = require("../customError/customError");
const isSlotValid_1 = __importDefault(require("../utils/isSlotValid"));
const paymentRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const bodySchema = zod_1.z.object({
    doctorId: zod_1.z.coerce.number(),
    bookTime: zod_1.z.coerce.date(),
    currentTime: zod_1.z.coerce.date(),
    reason: zod_1.z.coerce.string().default("General"),
});
const handlePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = bodySchema.safeParse(req.body);
    if (parsedBody.error) {
        (0, customError_1.throwForbiddenError)("Wrong Input");
        return;
    }
    const { doctorId, bookTime, currentTime, reason } = parsedBody.data;
    const patientId = req.id;
    if (!patientId) {
        (0, customError_1.throwUnauthorizedError)("Please register as patient first");
        return;
    }
    if (bookTime < currentTime) {
        (0, customError_1.throwBadRequestError)("Cannot book the slot in past");
        return;
    }
    const doctor = yield db.doctor.findUnique({
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
        (0, customError_1.throwBadRequestError)("No doctor found with the given Id");
        return;
    }
    if (!(0, isSlotValid_1.default)(bookTime, doctor.preferedTime)) {
        (0, customError_1.throwBadRequestError)("Slot is not according to doctor's preference");
        return;
    }
    const slot = yield db.slot.findFirst({
        where: {
            appointment: {
                doctorId: doctorId,
            },
            startTime: bookTime,
        },
    });
    if (slot) {
        (0, customError_1.throwBadRequestError)("Slot is already booked");
        return;
    }
    const razorpay = new razorpay_1.default({
        key_id: secrets_1.default.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });
    try {
        const order = yield razorpay.orders.create({
            amount: doctor.fees * 100,
            currency: "INR",
            receipt: `order_doctorId{${doctorId}}_${bookTime.valueOf()}`,
        });
        res.status(200).json({
            success: true,
            message: "Order generated successfully",
            order: order,
        });
        yield db.order.create({
            data: {
                id: order.id,
                reason: reason,
                bookTime: bookTime,
                endTime: new Date(bookTime.valueOf() + doctor.preferedTime.duration * 60000),
                duration: doctor.preferedTime.duration,
                doctorId: doctor.id,
                patientId: patientId,
                amount: doctor.fees,
            },
        });
    }
    catch (error) {
        (0, customError_1.throwInternalServerError)("Razorpay Error");
    }
});
paymentRouter.post("/", auth_1.default, patientAuth_1.default, handlePayment);
exports.default = paymentRouter;
