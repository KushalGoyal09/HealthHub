import express, { Router, Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { throwInternalServerError } from "../customError/customError";
import authMiddleware from "../middleware/auth";
import patientAuthMiddleware from "../middleware/patientAuth";
import SYSTEM_PROMPT from "../constant/SYSTEM_PROMPT";
import { z } from 'zod';

const MODEL = 'gemini-2.5-flash';

const CONFIG = {
    maxOutputTokens: 1000,
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
};

interface ChatMessage {
    role: string;
    parts: { text: string }[];
}

const router: Router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const systemInstruction = {
    role: "system",
    parts: [{ text: SYSTEM_PROMPT }],
};

const chatMessageSchema = z.object({
    role: z.string(),
    parts: z.array(z.object({
        text: z.string()
    }))
});

const chatHistorySchema = z.object({
    history: z.array(chatMessageSchema).min(1)
});

const validateChatHistory = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = chatHistorySchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: "Invalid chat history format"
        });
    }
    next();
};

router.post(
    "/",
    authMiddleware,
    patientAuthMiddleware,
    validateChatHistory,
    async (req: Request, res: Response) => {
        try {
            const { history } = req.body as { history: ChatMessage[] };

            const model = genAI.getGenerativeModel({
                model: MODEL,
                systemInstruction: systemInstruction,
            });

            const chat = model.startChat({
                history: history,
                generationConfig: CONFIG,
            });

            const lastUserMessage = history[history.length - 1].parts[0].text;

            const result = await chat.sendMessageStream(lastUserMessage);

            res.setHeader("Content-Type", "text/plain");
            res.setHeader("Transfer-Encoding", "chunked");

            try {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    if (!res.writableEnded) {
                        res.write(chunkText);
                    }
                }
                res.end();
            } catch (streamError) {
                console.error("Error in stream processing:", streamError);
                if (!res.writableEnded) {
                    res.status(500).json({
                        error: "Stream processing failed",
                    });
                }
            }
        } catch (error) {
            console.error("Error in chat streaming:", error);
            if (!res.writableEnded) {
                throwInternalServerError(
                    "An error occurred while processing your request."
                );
            }
        }
    }
);

export default router;
