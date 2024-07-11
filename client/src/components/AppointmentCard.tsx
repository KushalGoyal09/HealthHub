import React from "react";

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

const statusColors = {
    SCHEDULED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

const AppointmentCard: React.FC<Appointment> = (appointment) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {appointment.patient.user.name}
                </h2>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[appointment.status]
                    }`}
                >
                    {appointment.status}
                </span>
            </div>
            <p className="text-gray-600 mb-2">
                <strong>Reason:</strong>{" "}
                {appointment.reason || "No reason provided"}
            </p>
            <p className="text-gray-600 mb-2">
                <strong>Date of Birth:</strong>{" "}
                {appointment.patient.dateOfBirth.toDateString()}
            </p>
            <p className="text-gray-600 mb-2">
                <strong>Medical History:</strong>{" "}
                {appointment.patient.medicalHistory}
            </p>
            <div className="mt-4">
                <p className="text-gray-600">
                    <strong>Start Time:</strong>{" "}
                    {appointment.slot.startTime.toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                    <strong>End Time:</strong>{" "}
                    {appointment.slot.endTime.toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                    <strong>Duration:</strong> {appointment.slot.duration}{" "}
                    minutes
                </p>
            </div>
            <p className="text-gray-600 mt-4">
                <strong>Created At:</strong>{" "}
                {appointment.createdAt.toDateString()}
            </p>
        </div>
    );
};

export default AppointmentCard;
