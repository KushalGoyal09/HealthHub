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
const client_1 = require("@prisma/client");
const customError_1 = require("../customError/customError");
const auth_1 = __importDefault(require("../middleware/auth"));
const db = new client_1.PrismaClient();
const doctorDetailRouter = (0, express_1.Router)();
const getDoctorDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const doctor = yield db.doctor.findUnique({
        where: {
            id: Number(doctorId),
        },
        select: {
            specialty: true,
            education: true,
            experience: true,
            fees: true,
            id: true,
            preferedTime: {
                select: { startTime: true, endTime: true, duration: true },
            },
            user: { select: { name: true } },
        },
    });
    if (!doctor) {
        (0, customError_1.throwNotFoundError)("No doctor as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Doctor details fetched successfully",
        doctor: doctor,
    });
});
doctorDetailRouter.get("/:doctorId", auth_1.default, getDoctorDetail);
exports.default = doctorDetailRouter;
