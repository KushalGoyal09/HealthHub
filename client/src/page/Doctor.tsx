import { Calendar } from "@/components/ui/Calender";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    redirect,
    useLoaderData,
    LoaderFunction,
    useParams,
} from "react-router-dom";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "@/recoil/authAtom";
import useRazorpay, { RazorpayOptions } from "@/hooks/useRazorpay";

interface Doctor {
    id: number;
    specialty: string;
    education: string;
    experience: number;
    fees: number;
    user: {
        name: string;
    };
    preferedTime: {
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

interface ReqBody {
    currentDate: Date;
    bookDate: Date;
}

interface Slots {
    startTime: Date;
    endTime: Date;
    duration: number;
}

interface SlotsResponse {
    success: boolean;
    message: string;
    slots: Slots[];
}

interface PaymentReqBody {
    doctorId: number;
    bookTime: Date;
    currentTime: Date;
    reason?: String;
}

interface PaymentResBody {
    success: boolean;
    message: string;
    order: {
        amount: number;
        amount_due: number;
        amount_paid: number;
        attempts: number;
        createdAt: number;
        currency: string;
        id: string;
        receipt: string;
        status: string;
        entity: string;
    };
}

interface BookingReqBody {
    paymentId: string;
    orderId: string;
    signature: string;
}

interface BookingResBody {
    success: boolean;
    message: string;
    slot: {
        id: number;
        startTime: Date;
        endTime: Date;
        duration: number;
    };
}

const Doctor = () => {
    const doctor = useLoaderData() as Doctor;
    const token = useRecoilValue(tokenAtom);
    const user = useRecoilValue(userAtom);
    const { doctorId } = useParams();
    const [Razorpay] = useRazorpay();

    const [availableSlots, setAvailableSlots] = useState<null | Slots[]>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [bookingDate, setBookingDate] = useState<Date | undefined>();
    const [bookingTime, setBookingTime] = useState<Date | undefined>();

    const handlepayment: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (doctorId && bookingTime && user && token) {
            try {
                const { data } = await axios.post<
                    PaymentResBody,
                    AxiosResponse<PaymentResBody>,
                    PaymentReqBody
                >(
                    "/api/pay",
                    {
                        doctorId: Number(doctorId),
                        bookTime: bookingTime,
                        currentTime: new Date(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const options: RazorpayOptions = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    order_id: data.order.id,
                    currency: data.order.currency,
                    name: "Kushal Goyal HealthCare",
                    description: "Payment for appointment booking",
                    image: "/healthhub.png",
                    prefill: {
                        name: user.name,
                        email: user.email,
                    },
                    handler: async (args) => {
                        setError(null);
                        setSuccess(null);
                        try {
                            const { data } = await axios.post<
                                BookingResBody,
                                AxiosResponse<BookingResBody>,
                                BookingReqBody
                            >(
                                "/api/book",
                                {
                                    paymentId: args.razorpay_payment_id,
                                    orderId: args.razorpay_order_id,
                                    signature: args.razorpay_signature,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            setSuccess(
                                `Your appointment with ${
                                    doctor.user.name
                                } has been booked at ${new Date(
                                    data.slot.startTime
                                ).toLocaleTimeString()} on ${new Date(
                                    data.slot.endTime
                                ).toDateString()}`
                            );
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
                    },
                };
                const razorpay = new Razorpay(options);
                razorpay.open();
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
        }
    };

    useEffect(() => {
        if (!bookingDate) {
            return;
        }
        const source = axios.CancelToken.source();
        const getAvailableSlots = async () => {
            setError(null);
            try {
                const { data } = await axios.post<
                    SlotsResponse,
                    AxiosResponse<SlotsResponse>,
                    ReqBody
                >(
                    `/api/doctor-availability/${doctorId}`,
                    {
                        currentDate: new Date(),
                        bookDate: bookingDate,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        cancelToken: source.token,
                    }
                );
                setAvailableSlots(data.slots);
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
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
        getAvailableSlots();
        return () => {
            source.cancel();
        };
    }, [bookingDate]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center mb-6">
                <img
                    src="/doctor.png"
                    alt="Doctor"
                    className="w-32 h-32 rounded-full mr-6"
                />
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {doctor.user.name}
                    </h1>
                    <p className="text-gray-700">
                        <strong>Specialty:</strong> {doctor.specialty}
                    </p>
                    <p className="text-gray-700">
                        <strong>Education:</strong> {doctor.education}
                    </p>
                    <p className="text-gray-700">
                        <strong>Experience:</strong> {doctor.experience} years
                    </p>
                    <p className="text-gray-700">
                        <strong>Fees:</strong> ${doctor.fees}
                    </p>
                    <p className="text-gray-700">
                        <strong>Timing:</strong>{" "}
                        {new Date(
                            doctor.preferedTime.startTime
                        ).toLocaleTimeString()}{" "}
                        -{" "}
                        {new Date(
                            doctor.preferedTime.endTime
                        ).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-700">
                        <strong>Average Time per visit:</strong>{" "}
                        {doctor.preferedTime.duration} mins
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Book an Appointment
                </h2>
                <form onSubmit={handlepayment}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Select Date:
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={
                                        `w-[240px] pl-3 text-left font-normal` +
                                            !bookingDate &&
                                        `text-muted-foreground`
                                    }
                                >
                                    {bookingDate ? (
                                        format(bookingDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={bookingDate}
                                    onSelect={(e) => {
                                        setBookingDate(e);
                                    }}
                                    fromDate={new Date()}
                                    initialFocus
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Select Time Slot:
                        </label>
                        <select
                            name="time"
                            onChange={(e) =>
                                setBookingTime(new Date(e.target.value))
                            }
                            className="border border-gray-300 p-2 rounded w-full"
                            required
                        >
                            <option value="">Select a time slot</option>
                            {availableSlots &&
                                availableSlots.map((slot, index) => (
                                    <option
                                        key={index}
                                        value={slot.startTime.toString()}
                                    >
                                        {new Date(
                                            slot.startTime
                                        ).toLocaleTimeString()}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
                    >
                        Pay{" "}
                        <span className="text-green-600 font-bold">
                            ₹{doctor.fees}
                        </span>
                    </button>
                </form>
            </div>
            <div>
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
        </div>
    );
};

interface DoctorDetailResponse {
    success: boolean;
    message: string;
    doctor: Doctor;
}

export const doctorDetailLoader: LoaderFunction = async ({ params }) => {
    const doctorId = params.doctorId;
    if (!doctorId) {
        return redirect("/");
    }
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.get<DoctorDetailResponse>(
            `/api/doctor/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data.doctor;
    } catch (error) {
        return redirect("/");
    }
};

export default Doctor;
