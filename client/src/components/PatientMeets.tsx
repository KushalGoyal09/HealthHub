import axios, { AxiosResponse, isAxiosError } from "axios";
import { toast } from "./ui/use-toast";
import { Link, useLoaderData } from "react-router-dom";

const PatietMeets = () => {
    const appointment = useLoaderData() as Appointment;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Meets
            </h1>
            {!appointment && (
                <div className="text-center text-red-600 text-xl">
                    No Meets currently
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointment && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-blue-600">
                                <Link to={`/meet/${appointment.id}`}>
                                    Join Meet
                                </Link>
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-2">
                            <strong>Reason:</strong>{" "}
                            {appointment.reason || "No reason provided"}
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-600">
                                <strong>Start Time:</strong>{" "}
                                {new Date(
                                    appointment.slot.startTime
                                ).toLocaleTimeString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>End Time:</strong>{" "}
                                {new Date(
                                    appointment.slot.endTime
                                ).toLocaleTimeString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Duration:</strong>{" "}
                                {appointment.slot.duration} minutes
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatietMeets;

interface Appointment {
    id: number;
    reason: string | null;
    slot: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface PatientMeetResponse {
    success: boolean;
    message: string;
    appointment: Appointment | null;
}

interface PatientMeetRequest {
    currentDate: Date;
}

export const patientMeetsLoader = async () => {
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.post<
            PatientMeetResponse,
            AxiosResponse<PatientMeetResponse>,
            PatientMeetRequest
        >(
            "/api/patient-dashboard/meets",
            {
                currentDate: new Date(),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data.appointment;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
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
