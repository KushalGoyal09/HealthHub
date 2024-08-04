import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "./ui/use-toast";

const PatientAppointments = () => {
    const appointments = useLoaderData() as Appointment[];
    if(appointments === null) {
        return;
    }
    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Doctor Appointments
                </h1>
                {appointments.length === 0 && (
                    <div className="text-center text-red-600 text-xl">
                        No Previous Appointments
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.length !== 0 &&
                        appointments.map((appointment, index) => (
                            <AppointmentCard key={index} {...appointment} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default PatientAppointments;

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
                    <Link to={`/doctor/${appointment.doctorId}`}>Doctor</Link>
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
            <div className="mt-4">
                <p className="text-gray-600">
                    <strong>Start Time:</strong>{" "}
                    {new Date(appointment.slot.startTime).toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                    <strong>End Time:</strong>{" "}
                    {new Date(appointment.slot.endTime).toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                    <strong>Duration:</strong> {appointment.slot.duration}{" "}
                    minutes
                </p>
            </div>
            <p className="text-gray-600 mt-4">
                <strong>Created At:</strong>{" "}
                {new Date(appointment.createdAt).toDateString()}
            </p>
        </div>
    );
};

type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

interface Appointment {
    doctorId: number;
    reason: string | null;
    status: AppointmentStatus;
    createdAt: Date;
    slot: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface PatientAppointmentsResponse {
    success: boolean;
    message: string;
    appointments: Appointment[];
}

export const patientAppointmentsLoader = async () => {
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.get<PatientAppointmentsResponse>(
            "/api/patient-dashboard/appointments",
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
