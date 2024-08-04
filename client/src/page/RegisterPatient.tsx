import axios, { AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { tokenAtom, userAtom } from "../recoil/authAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

interface IRegisterPatientInput {
    dateOfBirth: Date;
    medicalHistory?: string;
}

interface RegisterPatientResponse {
    success: boolean;
    message: string;
    id: number;
}

const RegisterPatient = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const token = useRecoilValue(tokenAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const { handleSubmit, register } = useForm<IRegisterPatientInput>();

    const registerAsPatient: SubmitHandler<IRegisterPatientInput> = async (
        data
    ) => {
        setError("");
        setMessage("");
        if (!user) {
            setError("Login First to register");
            return;
        }
        try {
            const { data: response } = await axios.post<
                RegisterPatientResponse,
                AxiosResponse<RegisterPatientResponse>,
                IRegisterPatientInput
            >("/api/register-patient", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.message);
            setUser({
                ...user,
                patientId: response.id,
                role: "PATIENT"
            });
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register Patient
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(registerAsPatient)}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="dateOfBirth" className="sr-only">
                                Date of Birth
                            </label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                         border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Date of Birth"
                                {...register("dateOfBirth", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalDetails" className="sr-only">
                                Medical Details
                            </label>
                            <textarea
                                id="medicalDetails"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                            border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                            focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Medical Details"
                                {...register("medicalHistory")}
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

export default RegisterPatient;
