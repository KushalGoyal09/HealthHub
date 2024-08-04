import React from "react";
import AppointmentCard from "./AppointmentCard";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toast } from "./ui/use-toast";

interface Appointment {
    reason: string | null;
    slot: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
    createdAt: Date;
    patient: {
        user: {
            name: string;
        };
        dateOfBirth: Date;
        medicalHistory: string;
    };
}

const DoctorAppointment: React.FC = () => {
    const appointments = useLoaderData() as Appointment[];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Doctor Appointments
            </h1>
            {appointments.length === 0 && <div className="text-center text-red-600 text-xl"> No Previous Appointments</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.length !== 0 && appointments.map((appointment, index) => (
                    <AppointmentCard key={index} {...appointment} />
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointment;

interface AppointmentResponse {
    success: boolean;
    message: string;
    appointments: Appointment[];
}

export const doctorAppointmentsLoader = async () => {
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.get<AppointmentResponse>(
            "/api/doctor-dashboard/appointment",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data.appointments;
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
