import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link
                to="/"
                className="text-lg text-gray-600 hover:text-gray-800 transition"
            >
                Go back to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
