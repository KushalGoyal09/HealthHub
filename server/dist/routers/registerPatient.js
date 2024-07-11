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
const registerPatientRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const bodySchema = zod_1.z.object({
    dateOfBirth: zod_1.z.coerce.date(),
    medicalHistory: zod_1.z.string().default(""),
});
const registerPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { dateOfBirth, medicalHistory } = parsed.data;
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
    const result = yield db.patient.create({
        data: {
            userId,
            dateOfBirth,
            medicalHistory,
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
            role: "PATIENT",
        },
    });
    res.status(200).json({
        success: true,
        message: "Patient registered Successfully",
        id: result.id,
    });
});
registerPatientRouter.post("/", auth_1.default, registerPatient);
exports.default = registerPatientRouter;
