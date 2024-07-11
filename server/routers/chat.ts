import { Request, Response, Router } from "express";
import OpenAI from "openai";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import patientAuthMiddleware from "../middleware/patientAuth";
const openai = new OpenAI();
const chatRouter = Router();

interface message {
    role: "system" | "user" | "assistant",
    content: string
}

interface ReqBody{
    messages: message[]
}

interface ResBody {
    message: string
}

const chat = async (req: AuthRequest<{},{},ReqBody>, res: Response<ResBody>) => {
    const messages = req.body.messages;
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "you are mediBot, a bot that can understands the patients pain points and medical problems that they are facing. Talk to them like a adviser and suggest them what they should do and what type of doctors they should visit. and also the high level doubts they may have. Do not get to technical with them. the next prompts will be a patients conversation only. talk to them like that only. keep your answers short and easy to understand.",
            },
            ...messages
        ],
        model: "gpt-3.5-turbo",
    });
    if(completion.choices[0].message.content === null) {
        res.json({ message: "Sorry our bot is not able to answer this" });
        return;
    }
    res.json({ message: completion.choices[0].message.content });
};

chatRouter.post("/", authMiddleware, patientAuthMiddleware, chat);

export default chatRouter;
