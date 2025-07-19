import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import Markdown from "react-markdown";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "@/recoil/authAtom";
import LoadingIndicator from "@/components/LoadingIndicator";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

const INITIAL_GREETING: Message = {
    role: "model",
    parts: [
        {
            text: "Hello! I'm MediBot, your personal health assistant from HealthHub. How are you feeling today? Please describe any symptoms or health concerns you have.",
        },
    ],
};

export default function App() {
    const token = useRecoilValue(tokenAtom);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages([INITIAL_GREETING]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userInput: Message = { role: "user", parts: [{ text: input }] };
        setMessages((prev) => [...prev, userInput]);
        setInput("");
        setIsLoading(true);

        try {
            const chatHistory = messages.filter(
                (msg) => msg !== INITIAL_GREETING
            );

            setMessages((prev) => [
                ...prev,
                { role: "model", parts: [{ text: "" }] },
            ]);

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ history: [...chatHistory, userInput] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error("No response body reader available");
            }

            let streamResponse = "";

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                streamResponse += chunk;

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].parts[0].text = streamResponse;
                    return updated;
                });
            }
        } catch (error) {
            setMessages((prev) => {
                const updated = [...prev];
                if (updated[updated.length - 1].parts[0].text === "") {
                    updated.pop(); 
                }
                return [
                    ...updated,
                    {
                        role: "model",
                        parts: [
                            {
                                text: "I'm sorry, but I'm having trouble connecting to my services right now. Please try again in a moment.",
                            },
                        ],
                    },
                ];
            });
            console.error("Chat Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center">
                    <Bot className="w-8 h-8 text-blue-600" />
                    <div className="ml-3">
                        <h1 className="text-lg font-semibold text-gray-800">
                            MediBot
                        </h1>
                        <p className="text-sm text-gray-500">
                            Your HealthHub AI Assistant
                        </p>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && <LoadingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center space-x-3"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your symptoms..."
                            disabled={isLoading}
                            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-blue-600 text-white rounded-full disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                        MediBot is an AI assistant. For medical emergencies,
                        please call your local emergency number.
                    </p>
                </div>
            </footer>
        </div>
    );
}

const ChatMessage = ({ message }: { message: Message }) => {
    const isModel = message.role === "model";
    return (
        <div
            className={`flex items-start gap-3 ${isModel ? "" : "justify-end"}`}
        >
            {isModel && (
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={20} />
                </div>
            )}
            <div
                className={`max-w-xl px-4 py-3 rounded-2xl ${
                    isModel
                        ? "bg-white shadow-sm border border-gray-100 rounded-tl-none"
                        : "bg-blue-50 text-gray-800 rounded-br-none"
                }`}
            >
                <article className="prose prose-sm max-w-none">
                    <Markdown>{message.parts[0].text}</Markdown>
                </article>
            </div>
            {message.role === "user" && (
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={20} />
                </div>
            )}
        </div>
    );
};
