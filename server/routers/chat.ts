import { Response, Router } from "express";
import OpenAI from "openai";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import patientAuthMiddleware from "../middleware/patientAuth";
import { z } from "zod";
import { throwBadRequestError } from "../customError/customError";
const openai = new OpenAI();
const chatRouter = Router();

interface message {
    role: "system" | "user" | "assistant";
    content: string;
}

const bodySchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
        })
    ),
});

interface ReqBody {
    messages: message[];
}

interface ResBody {
    message: string;
    success: boolean;
}

const chat = async (
    req: AuthRequest<{}, {}, ReqBody>,
    res: Response<ResBody>
) => {
    const parsedData = bodySchema.safeParse(req.body);
    if (parsedData.error) {
        throwBadRequestError("Wrong input");
        return;
    }
    const { messages } = parsedData.data;
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "you are mediBot, a bot that can understands the patients pain points and medical problems that they are facing. Talk to them like a adviser and suggest them what they should do and what type of doctors they should visit. and also the high level doubts they may have. Do not get to technical with them. the next prompts will be a patients conversation only. talk to them like that only. keep your answers short and easy to understand.",
            },
            ...messages,
        ],
        model: "gpt-3.5-turbo-0125",
    });
    if (completion.choices[0].message.content === null) {
        res.json({
            message: "Sorry our bot is not able to answer this",
            success: false,
        });
        return;
    }
    res.json({
        message: completion.choices[0].message.content,
        success: true,
    });
};

chatRouter.post("/", authMiddleware, patientAuthMiddleware, chat);

export default chatRouter;
