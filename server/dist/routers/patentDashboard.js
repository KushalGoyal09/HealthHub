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
const customError_1 = require("../customError/customError");
const patientAuth_1 = __importDefault(require("../middleware/patientAuth"));
const db = new client_1.PrismaClient();
const patientDashboardRouter = (0, express_1.Router)();
const patientEditProfileBody = zod_1.z.object({
    dob: zod_1.z.coerce.date(),
    medicalHistory: zod_1.z.coerce.string(),
});
const patientMeets = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
const patientProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.id;
    if (!patientId) {
        (0, customError_1.throwUnauthorizedError)("No Patient found");
        return;
    }
    const patient = yield db.patient.findUnique({
        where: {
            id: patientId,
        },
        select: {
            medicalHistory: true,
            dateOfBirth: true,
        },
    });
    if (!patient) {
        (0, customError_1.throwUnauthorizedError)("No patient as such");
        return;
    }
    res.json({
        success: true,
        message: "Patient profile fetched successfully",
        patient: {
            medicalHistory: patient.medicalHistory,
            dob: patient.dateOfBirth,
        },
    });
});
const patientProfileEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.id;
    if (!patientId) {
        (0, customError_1.throwUnauthorizedError)("No patient found");
        return;
    }
    const parsedBody = patientEditProfileBody.safeParse(req.body);
    if (parsedBody.error) {
        (0, customError_1.throwBadRequestError)("Wrong input");
        return;
    }
    const { dob, medicalHistory } = parsedBody.data;
    const patient = yield db.patient.update({
        where: {
            id: patientId,
        },
        data: {
            dateOfBirth: dob,
            medicalHistory: medicalHistory,
        },
        select: {
            dateOfBirth: true,
            medicalHistory: true,
        },
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        patient: {
            dob: patient.dateOfBirth,
            medicalHistory: patient.medicalHistory,
        },
    });
});
const patientAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.id;
    if (!patientId) {
        (0, customError_1.throwUnauthorizedError)("No patient found");
        return;
    }
    const appointments = yield db.appointment.findMany({
        where: {
            patientId: patientId,
        },
        select: {
            doctorId: true,
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
            reason: true,
            status: true,
            createdAt: true,
        },
        orderBy: {
            slot: {
                startTime: "desc",
            },
        },
    });
    res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments: appointments
    });
});
patientDashboardRouter.get("/profile", auth_1.default, patientAuth_1.default, patientProfile);
patientDashboardRouter.post("/edit-profile", auth_1.default, patientAuth_1.default, patientProfileEdit);
patientDashboardRouter.post("/meets", auth_1.default, patientAuth_1.default, patientMeets);
patientDashboardRouter.get("/appointments", auth_1.default, patientAuth_1.default, patientAppointments);
exports.default = patientDashboardRouter;
