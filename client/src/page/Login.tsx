import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../recoil/authAtom";

interface ILoginInputs {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
}

const Login = () => {
    const { handleSubmit, register } = useForm<ILoginInputs>();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const setToken = useSetRecoilState(tokenAtom);
 
    const login: SubmitHandler<ILoginInputs> = async (userData) => {
        setError("");
        setSuccess("");
        try {
            const { data } = await axios.post<LoginResponse>("/api/login", {
                email: userData.email,
                password: userData.password,
            });
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setSuccess(data.message);
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error)) {
                if(error.response?.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("Somthing is wrong");
                }
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-black">
                        Login to Your Account
                    </h2>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit(login)}
                    >
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    type="email"
                                    autoComplete="email"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    {...register("email", { required: true })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link
                                    to="/signup"
                                    className="font-medium text-gray-800 hover:underline"
                                >
                                    Don't have a account? signup
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            >
                                Sign in
                            </button>
                        </div>
                        <div>
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                        {success && (
                            <div className="mb-4 text-green-500">{success}</div>
                        )}
                        <div>
                            {success && (
                                <Link
                                    to="/"
                                    className="font-medium text-blue-500 hover:underline"
                                >
                                    Go to home page{" "}
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
