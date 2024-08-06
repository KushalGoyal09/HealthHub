import { Request, Response, Router } from "express";
import { z } from "zod";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import doctorAuthMiddleware from "../middleware/doctorAuth";
import {
    throwBadRequestError,
    throwUnauthorizedError,
} from "../customError/customError";
const db = new PrismaClient();
const doctorDashboardRouter = Router();

interface AppointmentResponse {
    success: boolean;
    message: string;
    appointments: {
        reason: string | null;
        slot: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
        status: AppointmentStatus;
        createdAt: Date;
        patient: {
            user: {
                name: string;
            };
            dateOfBirth: Date;
            medicalHistory: string;
        };
    }[];
}

interface DoctorProfileResponse {
    success: boolean;
    message: string;
    doctor: {
        specialty: string;
        education: string;
        experience: number;
        fees: number;
        preferedTime: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
    };
}

interface DoctorProfileEditRequest {
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

const doctorProfileEditBodySchema = z.object({
    specialty: z.coerce.string(),
    education: z.coerce.string(),
    experience: z.coerce.number(),
    fees: z.coerce.number(),
    preferedTime: z.object({
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        duration: z.coerce.number(),
    }),
});

interface DoctorProfileEditResponse {
    success: boolean;
    message: string;
    profile: {
        specialty: string;
        education: string;
        experience: number;
        fees: number;
        preferedTime: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
    };
}

interface DoctorWalletResponse {
    success: boolean;
    message: string;
    data: {
        Order: {
            updatedAt: Date;
            amount: number;
        }[];
        wallet: number;
    };
}

interface DoctorMeetResponse {
    success: boolean;
    message: string;
    appointment: {
        id: number;
        reason: string | null;
        slot: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
        patient: {
            dateOfBirth: Date;
            medicalHistory: string;
            user: {
                name: string;
            };
        };
    } | null;
}

interface DoctorMeetRequest {
    currentDate: Date;
}

const doctorMeetBodySchema = z.object({
    currentDate: z.coerce.date(),
});

const doctorAppointment = async (
    req: AuthRequest,
    res: Response<AppointmentResponse>
) => {
    const doctorId = req.id;
    if (!doctorId) {
        throwUnauthorizedError("Please register as doctor first");
        return;
    }
    const appointments = await db.appointment.findMany({
        where: {
            doctorId: doctorId,
        },
        select: {
            patient: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    dateOfBirth: true,
                    medicalHistory: true,
                },
            },
            status: true,
            createdAt: true,
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
            reason: true,
        },
        orderBy: [
            {
                slot: {
                    startTime: "desc",
                },
            },
        ],
    });
    res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments: appointments,
    });
};

const doctorProfile = async (
    req: AuthRequest,
    res: Response<DoctorProfileResponse>
) => {
    const doctorId = req.id;
    if (!doctorId) {
        throwUnauthorizedError("Please register as doctor first");
        return;
    }
    const doctor = await db.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            specialty: true,
            experience: true,
            education: true,
            fees: true,
            preferedTime: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
        },
    });
    if (!doctor) {
        throwUnauthorizedError("No Doctor as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        doctor: doctor,
    });
};

const doctorEditProfile = async (
    req: AuthRequest<{}, {}, DoctorProfileEditRequest>,
    res: Response<DoctorProfileEditResponse>
) => {
    const doctorId = req.id;
    if (!doctorId) {
        throwUnauthorizedError("No doctor id found");
        return;
    }
    const parsedBody = doctorProfileEditBodySchema.safeParse(req.body);
    if (parsedBody.error) {
        throwBadRequestError("Wrong input");
        return;
    }
    const { specialty, education, experience, fees, preferedTime } =
        parsedBody.data;
    const doctor = await db.doctor.update({
        where: {
            id: doctorId,
        },
        data: {
            specialty,
            education,
            experience,
            fees,
            preferedTime: {
                update: {
                    data: preferedTime,
                },
            },
        },
        select: {
            specialty: true,
            experience: true,
            education: true,
            fees: true,
            preferedTime: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
        },
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: doctor,
    });
};

const doctorWallet = async (
    req: AuthRequest,
    res: Response<DoctorWalletResponse>
) => {
    const doctorId = req.id;
    if (!doctorId) {
        throwUnauthorizedError("Please register as doctor first");
        return;
    }
    const doctor = await db.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            wallet: true,
            Order: {
                where: {
                    status: "PAID",
                },
                select: {
                    amount: true,
                    updatedAt: true,
                },
                orderBy: {
                    updatedAt: "desc",
                },
            },
        },
    });
    if (!doctor) {
        throwUnauthorizedError("No doctor found as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Wallet information fetched",
        data: doctor,
    });
};

const doctorMeets = async (
    req: AuthRequest<{}, {}, DoctorMeetRequest>,
    res: Response<DoctorMeetResponse>
) => {
    const parsedBody = doctorMeetBodySchema.safeParse(req.body);
    if (parsedBody.success === false) {
        throwBadRequestError("currentDate not found");
        return;
    }
    const doctorId = req.id;
    if (!doctorId) {
        throwUnauthorizedError("Please register as doctor fisrt");
        return;
    }
    const { currentDate } = parsedBody.data;

    const appointments = await db.appointment.findFirst({
        where: {
            doctorId: doctorId,
            slot: {
                startTime: {
                    gte: currentDate,
                },
                endTime: {
                    lte: currentDate,
                },
            },
        },
        select: {
            id: true,
            reason: true,
            patient: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    dateOfBirth: true,
                    medicalHistory: true,
                },
            },
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
        },
    });
    if(!appointments) {
        res.json({
            success: true,
            message: "No Appointments found for the given time",
            appointment: null
        });
        return;
    }
    res.json({
        success: true,
        message: "meets fetched successfully",
        appointment: appointments
    });
};

doctorDashboardRouter.get(
    "/appointment",
    authMiddleware,
    doctorAuthMiddleware,
    doctorAppointment
);

doctorDashboardRouter.get(
    "/wallet",
    authMiddleware,
    doctorAuthMiddleware,
    doctorWallet
);

doctorDashboardRouter.get(
    "/profile",
    authMiddleware,
    doctorAuthMiddleware,
    doctorProfile
);

doctorDashboardRouter.post(
    "/edit-profile",
    authMiddleware,
    doctorAuthMiddleware,
    doctorEditProfile
);

doctorDashboardRouter.post(
    "/meets",
    authMiddleware,
    doctorAuthMiddleware,
    doctorMeets
);

export default doctorDashboardRouter;
