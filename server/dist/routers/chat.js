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
const openai_1 = __importDefault(require("openai"));
const auth_1 = __importDefault(require("../middleware/auth"));
const patientAuth_1 = __importDefault(require("../middleware/patientAuth"));
const openai = new openai_1.default();
const chatRouter = (0, express_1.Router)();
const chat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    const completion = yield openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "you are mediBot, a bot that can understands the patients pain points and medical problems that they are facing. Talk to them like a adviser and suggest them what they should do and what type of doctors they should visit. and also the high level doubts they may have. Do not get to technical with them. the next prompts will be a patients conversation only. talk to them like that only. keep your answers short and easy to understand.",
            },
            ...messages
        ],
        model: "gpt-3.5-turbo",
    });
    if (completion.choices[0].message.content === null) {
        res.json({ message: "Sorry our bot is not able to answer this" });
        return;
    }
    res.json({ message: completion.choices[0].message.content });
});
chatRouter.post("/", auth_1.default, patientAuth_1.default, chat);
exports.default = chatRouter;
