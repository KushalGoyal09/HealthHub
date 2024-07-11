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
const doctorSearchRouter = (0, express_1.Router)();
const db = new client_1.PrismaClient();
const querySchema = zod_1.z.object({
    search: zod_1.z.string(),
    sortBy: zod_1.z.enum(["relevance", "experience", "fees"]).default("relevance"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("asc"),
});
const doctorSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = querySchema.safeParse(req.query);
    if (parsedInput.success === false) {
        (0, customError_1.throwForbiddenError)("Input incorrect");
        return;
    }
    const { search, sortBy, sortOrder } = parsedInput.data;
    const result = yield db.doctor.findMany({
        where: {
            OR: [
                {
                    specialty: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    education: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    user: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        },
        select: {
            id: true,
            specialty: true,
            education: true,
            fees: true,
            experience: true,
            user: { select: { name: true } },
            preferedTime: {
                select: { startTime: true, endTime: true, duration: true },
            },
        },
        orderBy: sortBy !== "relevance"
            ? {
                [sortBy]: sortOrder,
            }
            : undefined,
    });
    if (!result || result.length === 0) {
        res.status(200).json({
            success: true,
            message: "No Doctor found",
            doctors: [],
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Doctor found",
        doctors: result,
    });
});
doctorSearchRouter.get("/", auth_1.default, doctorSearch);
exports.default = doctorSearchRouter;
