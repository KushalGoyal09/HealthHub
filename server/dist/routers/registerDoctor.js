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
const auth_1 = __importDefault(require("../middleware/auth"));
const customError_1 = require("../customError/customError");
const convertTimeToDate_1 = __importDefault(require("../utils/convertTimeToDate"));
const registerDoctorRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const bodySchema = zod_1.z.object({
    specialty: zod_1.z.coerce.string(),
    education: zod_1.z.coerce.string(),
    experience: zod_1.z.coerce.number(),
    fees: zod_1.z.coerce.number(),
    preferedStartTime: zod_1.z.string(),
    preferedEndTime: zod_1.z.string(),
    duration: zod_1.z.coerce.number().default(30),
});
const registerDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        (0, customError_1.throwUnauthorizedError)("You are not logged in");
        return;
    }
    const parsed = bodySchema.safeParse(req.body);
    if (parsed.success === false) {
        (0, customError_1.throwForbiddenError)("Wrong input");
        return;
    }
    const { specialty, education, experience, fees, preferedStartTime, preferedEndTime, duration, } = parsed.data;
    const user = yield db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            role: true,
        },
    });
    if (!user) {
        (0, customError_1.throwUnauthorizedError)("No user found");
        return;
    }
    if (user.role === "DOCTOR") {
        (0, customError_1.throwBadRequestError)("you are already registered as doctor");
        return;
    }
    if (user.role === "PATIENT") {
        (0, customError_1.throwBadRequestError)("you are already registered as patient");
        return;
    }
    const preferedTime = yield db.preferedTime.create({
        data: {
            startTime: (0, convertTimeToDate_1.default)(preferedStartTime),
            endTime: (0, convertTimeToDate_1.default)(preferedEndTime),
            duration: duration,
        },
        select: {
            id: true,
        },
    });
    const result = yield db.doctor.create({
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
    yield db.user.update({
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
});
registerDoctorRouter.post("/", auth_1.default, registerDoctor);
exports.default = registerDoctorRouter;
