import { Bot } from "lucide-react";

const LoadingIndicator = () => (
    <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
            <Bot size={20} />
        </div>
        <div className="max-w-xl px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100 rounded-tl-none">
            <div className="flex items-center space-x-1">
                <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0s" }}
                ></span>
                <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                ></span>
            </div>
        </div>
    </div>
);


export default LoadingIndicator;