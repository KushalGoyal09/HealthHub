import { Request, Response, Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import { throwForbiddenError } from "../customError/customError";
const doctorSearchRouter = Router();
const db = new PrismaClient();

interface Doctor {
    fees: number;
    id: number;
    specialty: string;
    education: string;
    user: {
        name: string;
    };
    experience: number;
    preferedTime: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface ResBody {
    success: boolean;
    message: string;
    doctors: Doctor[];
}

const querySchema = z.object({
    search: z.string(),
    sortBy: z.enum(["relevance", "experience", "fees"]).default("relevance"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

const doctorSearch = async (req: AuthRequest, res: Response<ResBody>) => {
    const parsedInput = querySchema.safeParse(req.query);
    if (parsedInput.success === false) {
        throwForbiddenError("Input incorrect");
        return;
    }
    const { search, sortBy, sortOrder } = parsedInput.data;

    const result = await db.doctor.findMany({
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
            experience:true,
            user: { select: { name: true } },
            preferedTime: {
                select: { startTime: true, endTime: true, duration: true },
            },
        },
        orderBy:
            sortBy !== "relevance"
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
};

doctorSearchRouter.get("/", authMiddleware, doctorSearch);

export default doctorSearchRouter;
