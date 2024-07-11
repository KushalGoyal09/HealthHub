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
const customError_1 = require("../customError/customError");
const client_1 = require("@prisma/client");
const meRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = req.userId;
    if (!userId) {
        (0, customError_1.throwUnauthorizedError)("Unauthorized");
        return;
    }
    try {
        const user = yield db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                Doctor: { select: { id: true } },
                Patient: { select: { id: true } },
                role: true,
            },
        });
        if (!user) {
            (0, customError_1.throwUnauthorizedError)("Unauthorized");
            return;
        }
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                patientId: (_a = user.Patient) === null || _a === void 0 ? void 0 : _a.id,
                doctorId: (_b = user.Doctor) === null || _b === void 0 ? void 0 : _b.id,
            },
        });
    }
    catch (error) {
        (0, customError_1.throwInternalServerError)();
    }
});
meRouter.get("/", auth_1.default, userInfo);
exports.default = meRouter;
