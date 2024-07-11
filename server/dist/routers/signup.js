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
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = require("bcrypt");
const customError_1 = require("../customError/customError");
const jwt_1 = require("../utils/jwt");
const signupRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const bodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (bodySchema.safeParse(req.body).success === false) {
        (0, customError_1.throwForbiddenError)("wrong input");
    }
    const { name, email, password } = req.body;
    const isExist = yield db.user.findUnique({
        where: { email },
    });
    if (isExist) {
        (0, customError_1.throwForbiddenError)("User Already exist");
    }
    const userid = yield db.user.create({
        data: {
            name,
            email,
            password: yield (0, bcrypt_1.hash)(password, 10),
        },
        select: {
            id: true,
        },
    });
    const token = (0, jwt_1.getToken)(userid.id);
    return res.status(200).json({
        success: true,
        message: "User created Successfully",
        token: token,
    });
});
signupRouter.post("/", signup);
exports.default = signupRouter;
