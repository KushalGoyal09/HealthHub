import React from "react";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
}

interface PreferedTime {
    startTime: Date;
    endTime: Date;
    duration: number;
}

interface Doctor {
    fees: number;
    id: number;
    specialty: string;
    education: string;
    experience: number;
    user: User;
    preferedTime: PreferedTime;
}

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <div
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 cursor-pointer"
            onClick={() => navigate(`/doctor/${doctor.id}`)}
        >
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                    {doctor.user.name}
                </h2>
                <p className="text-gray-800 mb-3">
                    <strong>Education:</strong> {doctor.education}
                </p>
                <p className="text-gray-800 mb-3">
                    <strong>Specialty:</strong> {doctor.specialty}
                </p>
                <p className="text-gray-800 mb-3">
                    <strong>Fees:</strong> ₹{doctor.fees}
                </p>
                <p className="text-gray-800 mb-3">
                    <strong>Experience:</strong> {doctor.experience} years
                </p>
                <p className="text-gray-800 mb-3">
                    <strong>Timing:</strong>{" "}
                    {new Date(
                        doctor.preferedTime.startTime
                    ).toLocaleTimeString()}{" "}
                    -{" "}
                    {new Date(doctor.preferedTime.endTime).toLocaleTimeString()}
                </p>
                <p className="text-gray-800 mb-3">
                    <strong>Average Time per visit:</strong>{" "}
                    {doctor.preferedTime.duration} mins
                </p>
                <button
                    className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                >
                    Get details
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;
