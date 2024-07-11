import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import {
    throwForbiddenError,
    throwInternalServerError,
} from "../customError/customError";
import { getToken } from "../utils/jwt";
const signupRouter = Router();
const db = new PrismaClient();

interface ReqBody {
    name: string;
    email: string;
    password: string;
}

interface ResBody {
    success: boolean;
    message: string;
    token: string;
}

const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

const signup = async (
    req: Request<{}, {}, ReqBody>,
    res: Response<ResBody>
) => {
    if (bodySchema.safeParse(req.body).success === false) {
        throwForbiddenError("wrong input");
    }
    const { name, email, password } = req.body;
    const isExist = await db.user.findUnique({
        where: { email },
    });
    if (isExist) {
        throwForbiddenError("User Already exist");
    }
    const userid = await db.user.create({
        data: {
            name,
            email,
            password: await hash(password, 10),
        },
        select: {
            id: true,
        },
    });
    const token = getToken(userid.id);
    return res.status(200).json({
        success: true,
        message: "User created Successfully",
        token: token,
    });
};

signupRouter.post("/", signup);

export default signupRouter;
