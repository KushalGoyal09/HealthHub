import axios, { AxiosResponse, isAxiosError } from "axios";
import { toast } from "./ui/use-toast";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "@/recoil/authAtom";

interface IInputs {
    dob: string,
    medicalHistory: string;
}
interface PatientEditProfileResponse {
    success: boolean;
    message: string;
    patient: {
        dob: Date;
        medicalHistory: string;
    };
}

const PatietProfile = () => {
    const [patient, setPatient] = useState<null | Patient>(
        useLoaderData() as Patient
    );
    if (patient === null) {
        return;
    } 
    const [isEditing, setIsEditing] = useState(false);
    const token = useRecoilValue(tokenAtom);
    const { register, handleSubmit } = useForm<IInputs>({
        defaultValues: {
            dob: new Date(patient.dob).toISOString().substr(0,10),
            medicalHistory: patient.medicalHistory,
        },
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave: SubmitHandler<IInputs> = async (data) => {
        try {
            const { data: res } = await axios.post<
                PatientEditProfileResponse,
                AxiosResponse<PatientEditProfileResponse>,
                Patient
            >(
                "/api/patient-dashboard/edit-profile",
                {
                    dob: new Date(data.dob),
                    medicalHistory: data.medicalHistory,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPatient(res.patient);
            setIsEditing(false);
            toast({
                title: "Profile updated successfully",
            });
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                if (error.response?.data.message) {
                    toast({
                        title: error.response.data.message,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Somthing is wrong",
                        variant: "destructive",
                    });
                }
            }
        }
    };
    return (
        <div className="bg-gray-100 text-black min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Pateint Profile
                </h1>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Medical History:
                    </label>
                    {isEditing ? (
                        <textarea
                            {...register("medicalHistory", { required: true })}
                            className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="bg-gray-200 p-2 rounded">
                            {patient.medicalHistory}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Date of Birth:
                    </label>
                    {isEditing ? (
                        <input
                            type="date"
                            {...register("dob", { required: true })}
                            className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="bg-gray-200 p-2 rounded">
                            {new Date(patient.dob).toDateString()}
                        </p>
                    )}
                </div>
                <div className="flex justify-end">
                    {isEditing ? (
                        <button
                            type="button"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit(handleSave)}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatietProfile;

interface Patient {
    dob: Date;
    medicalHistory: string;
}
interface PatientProfileResponse {
    success: boolean;
    message: string;
    patient: Patient;
}

export const patientProfileLoader = async () => {
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.get<PatientProfileResponse>(
            "/api/patient-dashboard/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data.patient;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response?.data) {
                toast({
                    title: error.response.data.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Somthing is wrong",
                    variant: "destructive",
                });
            }
        }
        return null;
    }
};
