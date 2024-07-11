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
const client_1 = require("@prisma/client");
const calculateFreeSlots_1 = __importDefault(require("../utils/calculateFreeSlots"));
const customError_1 = require("../customError/customError");
const auth_1 = __importDefault(require("../middleware/auth"));
const db = new client_1.PrismaClient();
const availiblityRouter = (0, express_1.Router)();
const bodySchema = zod_1.z.object({
    currentDate: zod_1.z.coerce.date(),
    bookDate: zod_1.z.coerce.date(),
});
const getAllFreeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = bodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        (0, customError_1.throwBadRequestError)("Please provide the current Date");
        return;
    }
    req.params;
    const { doctorId } = req.params;
    const { currentDate, bookDate } = parsedBody.data;
    const doctor = yield db.doctor.findUnique({
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
        (0, customError_1.throwNotFoundError)("No doctor as such");
        return;
    }
    const freeSlots = (0, calculateFreeSlots_1.default)(doctor.preferedTime, doctor.appointments, new Date(bookDate), new Date(currentDate));
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
});
availiblityRouter.post("/:doctorId", auth_1.default, getAllFreeSlots);
exports.default = availiblityRouter;
