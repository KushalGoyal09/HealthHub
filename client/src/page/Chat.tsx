import { Button } from "@/components/ui/button";
import { tokenAtom } from "@/recoil/authAtom";
import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

interface message {
    role: "user" | "assistant";
    content: string;
}

interface ReqBody {
    messages: message[];
}

interface ResBody {
    message: string;
    success: boolean;
}

interface ImessageInput {
    message: string;
}

const Chat = () => {
    const token = useRecoilValue(tokenAtom);
    const [messages, setMessages] = useState<message[]>([
        {
            role: "assistant",
            content: "I am MediBot, How may i help you?",
        },
    ]);
    const [disable, setDisable] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const { handleSubmit, register, setValue } = useForm<ImessageInput>();

    const handleSendMessage: SubmitHandler<ImessageInput> = async (data) => {
        if (!token) {
            toast({
                title: "Please Login Firts to access the chatbot",
                action: (
                    <ToastAction altText="Login">
                        <Button onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </ToastAction>
                ),
            });
            return;
        }
        const message = data.message.trim();
        if (!message) {
            return;
        }
        if (disable) {
            return;
        }
        setValue("message", "");
        setDisable(() => true);
        setMessages((prev) => {
            const updatedMessages: message[] = [
                ...prev,
                {
                    role: "user",
                    content: message,
                },
            ];
            sendMessage(updatedMessages);
            return updatedMessages;
        });
        setDisable(() => false);
    }; 

    const sendMessage = useCallback(
        async (messages: message[]) => {
            try {
                const { data } = await axios.post<
                    ResBody,
                    AxiosResponse<ResBody>,
                    ReqBody
                >(
                    "/api/chat",
                    { messages },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!data.success) {
                    setError(data.message);
                    return;
                }
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.message,
                    },
                ]);
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    if (error.response?.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError("Somthing is wrong");
                    }
                }
            }
        },
        [messages, token]
    );

    const setError = useCallback((error: string) => {
        toast({
            description: error,
        });
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-grow p-4 overflow-auto">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg max-w-screen-lg ${
                                msg.role === "user"
                                    ? "bg-slate-800 self-end text-slate-200"
                                    : "bg-gray-300 self-start text-slate-900"
                            }`}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-gray-700">
                <form onSubmit={handleSubmit(handleSendMessage)}>
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-grow p-2 rounded-l-lg bg-gray-600 text-white outline-none"
                            placeholder="Message Medibot"
                            {...register("message", { required: true })}
                        />
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
