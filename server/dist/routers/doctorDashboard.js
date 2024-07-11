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
const auth_1 = __importDefault(require("../middleware/auth"));
const client_1 = require("@prisma/client");
const doctorAuth_1 = __importDefault(require("../middleware/doctorAuth"));
const customError_1 = require("../customError/customError");
const db = new client_1.PrismaClient();
const doctorDashboardRouter = (0, express_1.Router)();
const doctorProfileEditBodySchema = zod_1.z.object({
    specialty: zod_1.z.coerce.string(),
    education: zod_1.z.coerce.string(),
    experience: zod_1.z.coerce.number(),
    fees: zod_1.z.coerce.number(),
    preferedTime: zod_1.z.object({
        startTime: zod_1.z.coerce.date(),
        endTime: zod_1.z.coerce.date(),
        duration: zod_1.z.coerce.number(),
    }),
});
const doctorAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.id;
    if (!doctorId) {
        (0, customError_1.throwUnauthorizedError)("Please register as doctor first");
        return;
    }
    const appointments = yield db.appointment.findMany({
        where: {
            doctorId: doctorId,
        },
        select: {
            patient: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    dateOfBirth: true,
                    medicalHistory: true,
                },
            },
            status: true,
            createdAt: true,
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
            reason: true,
        },
        orderBy: [
            {
                slot: {
                    startTime: "desc",
                },
            },
        ],
    });
    res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments: appointments,
    });
});
const doctorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.id;
    if (!doctorId) {
        (0, customError_1.throwUnauthorizedError)("Please register as doctor first");
        return;
    }
    const doctor = yield db.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            specialty: true,
            experience: true,
            education: true,
            fees: true,
            preferedTime: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
        },
    });
    if (!doctor) {
        (0, customError_1.throwUnauthorizedError)("No Doctor as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        doctor: doctor,
    });
});
const doctorEditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.id;
    if (!doctorId) {
        (0, customError_1.throwUnauthorizedError)("No doctor id found");
        return;
    }
    const parsedBody = doctorProfileEditBodySchema.safeParse(req.body);
    if (parsedBody.error) {
        (0, customError_1.throwBadRequestError)("Wrong input");
        return;
    }
    const { specialty, education, experience, fees, preferedTime } = parsedBody.data;
    const doctor = yield db.doctor.update({
        where: {
            id: doctorId,
        },
        data: {
            specialty,
            education,
            experience,
            fees,
            preferedTime: {
                update: {
                    data: preferedTime,
                },
            },
        },
        select: {
            specialty: true,
            experience: true,
            education: true,
            fees: true,
            preferedTime: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
        },
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: doctor
    });
});
const doctorWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.id;
    if (!doctorId) {
        (0, customError_1.throwUnauthorizedError)("Please register as doctor first");
        return;
    }
    const doctor = yield db.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            wallet: true,
            Order: {
                where: {
                    status: "PAID",
                },
                select: {
                    amount: true,
                    updatedAt: true,
                },
                orderBy: {
                    updatedAt: "desc",
                },
            },
        },
    });
    if (!doctor) {
        (0, customError_1.throwUnauthorizedError)("No doctor found as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Wallet information fetched",
        data: doctor,
    });
});
const doctorMeets = (req, res) => {
};
doctorDashboardRouter.get("/appointment", auth_1.default, doctorAuth_1.default, doctorAppointment);
doctorDashboardRouter.get("/wallet", auth_1.default, doctorAuth_1.default, doctorWallet);
doctorDashboardRouter.get("/profile", auth_1.default, doctorAuth_1.default, doctorProfile);
doctorDashboardRouter.post("/edit-profile", auth_1.default, doctorAuth_1.default, doctorEditProfile);
doctorDashboardRouter.post("/meets", auth_1.default, doctorAuth_1.default, doctorMeets);
exports.default = doctorDashboardRouter;
