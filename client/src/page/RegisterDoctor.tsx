import axios, { AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { tokenAtom, userAtom } from "../recoil/authAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

interface IRegisterDoctorInput {
    specialty: string;
    education: string;
    experience: number;
    fees: number;
    preferedStartTime: Date;
    preferedEndTime: Date;
    duration?: number;
}

interface RegisterDoctorResponse {
    success: boolean;
    message: string;
    id: number;
}

const RegisterDoctor = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const token = useRecoilValue(tokenAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const { handleSubmit, register } = useForm<IRegisterDoctorInput>();

    const registerAsDoctor: SubmitHandler<IRegisterDoctorInput> = async (
        data
    ) => {
        setError("");
        setMessage("");
        if (!user) {
            setError("You need to login First");
            return;
        }
        try {
            const { data: response } = await axios.post<
                RegisterDoctorResponse,
                AxiosResponse<RegisterDoctorResponse>,
                IRegisterDoctorInput
            >("api/register-doctor", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.message);
            setUser({
                ...user,
                doctorId: response.id,
                role: "DOCTOR",
            });
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register Doctor
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(registerAsDoctor)}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="specialty" className="sr-only">
                                Specialty
                            </label>
                            <input
                                id="specialty"
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Specialization"
                                {...register("specialty", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="education" className="sr-only">
                                Education
                            </label>
                            <input
                                id="education"
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Education"
                                {...register("education", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="experience" className="sr-only">
                                Experience (in years)
                            </label>
                            <input
                                id="experience"
                                type="number"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Experience (in years)"
                                {...register("experience", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="Fees" className="sr-only">
                                Fees
                            </label>
                            <input
                                id="Fees"
                                type="number"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Fees in Rupees"
                                {...register("fees", { required: true })}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="preferredStartTime"
                                className="sr-only"
                            >
                                Preferred Start Time (HH:MM)
                            </label>
                            <input
                                id="preferredStartTime"
                                type="time"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Preferred Start Time (HH:MM)"
                                {...register("preferedStartTime", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="preferredEndTime"
                                className="sr-only"
                            >
                                Preferred End Time (HH:MM)
                            </label>
                            <input
                                id="preferredEndTime"
                                type="time"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Preferred End Time (HH:MM)"
                                {...register("preferedEndTime", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="preferredDuration"
                                className="sr-only"
                            >
                                Preferred Duration (in minutes)
                            </label>
                            <input
                                id="preferredDuration"
                                type="number"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Preferred Duration (in minutes)"
                                {...register("duration")}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-red-500 text-xs italic">{error}</p>
                        <p className="text-green-500 text-xs italic">
                            {message}
                        </p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border 
            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterDoctor;
