import React from "react";
import AppointmentCard from "./AppointmentCard";

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

interface IDoctorAppointments {
    appointments: Appointment[];
}

const DoctorAppointment: React.FC<IDoctorAppointments> = ({ appointments }) => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Doctor Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment, index) => (
                    <AppointmentCard key={index} {...appointment}/>
                ))}
            </div>
        </div>
    );
}

export default DoctorAppointment;
