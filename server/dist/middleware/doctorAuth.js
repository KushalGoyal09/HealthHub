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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_1 = require("./auth");
const customError_1 = require("../customError/customError");
const db = new client_1.PrismaClient();
const doctorAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        (0, customError_1.throwUnauthorizedError)("Unauthorized");
        return;
    }
    const doctor = yield db.doctor.findUnique({
        where: {
            userId: userId,
        },
        select: {
            id: true,
        },
    });
    if (!doctor) {
        (0, customError_1.throwUnauthorizedError)("Not registered as doctor");
        return;
    }
    req.role = auth_1.Role.Doctor;
    req.id = doctor.id;
    next();
});
exports.default = doctorAuthMiddleware;
