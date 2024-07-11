import { tokenAtom } from "@/recoil/authAtom";
import axios, { AxiosResponse, isAxiosError } from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface IInputs {
    specialty: string;
    education: string;
    experience: number;
    fees: number;
    preferedStartTime: string;
    preferedEndTime: string;
    duration: number;
}

interface Doctor {
    specialty: string;
    education: string;
    experience: number;
    fees: number;
    preferedTime: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface DoctorProfileEditResponse {
    success: boolean;
    message: string;
    profile: Doctor;
}

type DoctorProfileEditRequest = Doctor;

interface IDoctorProfile {
    doctor: Doctor;
}

const convertTimeToDate = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};

const formatTime = (date: Date) => {
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
};

const DoctorProfile: React.FC<IDoctorProfile> = ({ doctor }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState<null | string>(null);
    const token = useRecoilValue(tokenAtom);

    const { register, handleSubmit } = useForm<IInputs>({
        defaultValues: {
            specialty: doctor.specialty,
            education: doctor.education,
            experience: doctor.experience,
            fees: doctor.fees,
            preferedStartTime: formatTime(doctor.preferedTime.startTime),
            preferedEndTime: formatTime(doctor.preferedTime.endTime),
            duration: doctor.preferedTime.duration,
        },
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave: SubmitHandler<IInputs> = async (data) => {
        try {
            const { data: res } = await axios.post<
                DoctorProfileEditResponse,
                AxiosResponse<DoctorProfileEditResponse>,
                DoctorProfileEditRequest
            >("/api/doctor-dashboard/edit-profile", {
                specialty: data.specialty,
                education: data.education,
                experience: data.experience,
                fees: data.fees,
                preferedTime: {
                    startTime: convertTimeToDate(data.preferedStartTime),
                    endTime: convertTimeToDate(data.preferedEndTime),
                    duration: data.duration,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            doctor = res.profile;
            setIsEditing(false);
            setSuccess("Profile updated successfully");
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                if (error.response?.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("Somthing is wrong");
                }
            }
        }
    };

    return (
        <>
            <div className="bg-gray-100 text-black min-h-screen flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        Doctor Profile
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Specialty:
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                {...register("specialty", { required: true })}
                                className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.specialty}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Education:
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                {...register("education", { required: true })}
                                className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.education}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Experience (years):
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                {...register("experience", { required: true })}
                                className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.experience}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Fees ($):
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                {...register("fees", { required: true })}
                                className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.fees}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Preferred Time:
                        </label>
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <input
                                    type="time"
                                    {...register("preferedStartTime", {
                                        required: true,
                                    })}
                                    className="w-1/2 p-2 bg-white text-black border border-gray-300 rounded"
                                />
                                <input
                                    type="time"
                                    {...register("preferedEndTime", {
                                        required: true,
                                    })}
                                    className="w-1/2 p-2 bg-white text-black border border-gray-300 rounded"
                                />
                            </div>
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.preferedTime.startTime.toLocaleTimeString()}{" "}
                                -{" "}
                                {doctor.preferedTime.endTime.toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Duration (minutes):
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                {...register("duration", { required: true })}
                                className="w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        ) : (
                            <p className="bg-gray-200 p-2 rounded">
                                {doctor.preferedTime.duration} minutes
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
            <div className="flex items-center justify-center">
                {success && (
                    <p
                        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4 rounded"
                        role="alert"
                    >
                        {success}
                    </p>
                )}
                {error && (
                    <p
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        </>
    );
};

export default DoctorProfile;
