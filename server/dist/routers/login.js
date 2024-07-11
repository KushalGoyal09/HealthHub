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
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = require("bcrypt");
const client_1 = require("@prisma/client");
const customError_1 = require("../customError/customError");
const jwt_1 = require("../utils/jwt");
const db = new client_1.PrismaClient();
const loginRouter = (0, express_1.Router)();
const bodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (bodySchema.safeParse(req.body).success === false) {
        (0, customError_1.throwForbiddenError)("wrong input");
        return;
    }
    const { email, password } = req.body;
    try {
        const user = yield db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                password: true,
            },
        });
        if (!user) {
            (0, customError_1.throwUnauthorizedError)("User not found");
            return;
        }
        if (yield (0, bcrypt_1.compare)(password, user.password)) {
            const token = (0, jwt_1.getToken)(user.id);
            res.status(200).json({
                success: true,
                message: "User logged in Successfully",
                token: token,
            });
        }
        else {
            (0, customError_1.throwUnauthorizedError)("Incorrect password");
            return;
        }
    }
    catch (error) {
        (0, customError_1.throwUnauthorizedError)("User not found");
        return;
    }
});
loginRouter.post("/", login);
exports.default = loginRouter;
