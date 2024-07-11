import { Router, Request, Response } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
    throwForbiddenError,
    throwUnauthorizedError,
} from "../customError/customError";
import { getToken } from "../utils/jwt";
const db = new PrismaClient();
const loginRouter = Router();

interface ReqBody {
    email: string;
    password: string;
}

interface ResBody {
    success: boolean;
    message: string;
    token: string;
}

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const login = async (req: Request<{}, {}, ReqBody>, res: Response<ResBody>) => {
    if (bodySchema.safeParse(req.body).success === false) {
        throwForbiddenError("wrong input");
        return;
    }
    const { email, password } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                password: true,
            },
        });
        if (!user) {
            throwUnauthorizedError("User not found");
            return;
        }
        if (await compare(password, user.password)) {
            const token = getToken(user.id);
            res.status(200).json({
                success: true,
                message: "User logged in Successfully",
                token: token,
            });
        } else {
            throwUnauthorizedError("Incorrect password");
            return;
        }
    } catch (error) {
        throwUnauthorizedError("User not found");
        return;
    }
};

loginRouter.post("/", login);

export default loginRouter;
