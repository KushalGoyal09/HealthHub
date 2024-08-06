import { Request, Response, Router } from "express";
import { z } from "zod";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import {
    throwBadRequestError,
    throwUnauthorizedError,
} from "../customError/customError";
import patientAuthMiddleware from "../middleware/patientAuth";
const db = new PrismaClient();
const patientDashboardRouter = Router();

interface PatientProfileResponse {
    success: boolean;
    message: string;
    patient: {
        dob: Date;
        medicalHistory: string;
    };
}

interface PatientEditProfileRequest {
    dob: Date;
    medicalHistory: string;
}

const patientEditProfileBody = z.object({
    dob: z.coerce.date(),
    medicalHistory: z.coerce.string(),
});

interface PatientEditProfileResponse {
    success: boolean;
    message: string;
    patient: {
        dob: Date;
        medicalHistory: string;
    };
}

interface PatientAppointmentsResponse {
    success: boolean;
    message: string;
    appointments: {
        doctorId: number;
        reason: string | null;
        status: AppointmentStatus;
        createdAt: Date;
        slot: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
    }[];
}

interface PatientMeetResponse {
    success: boolean;
    message: string;
    appointment: {
        id: number,
        reason: string | null;
        slot: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
    } | null;
}
 
interface PatientMeetRequest {
    currentDate : Date
}

const patientMeetBodySchema = z.object({
    currentDate: z.coerce.date()
})

const patientMeets = async (req: AuthRequest<PatientMeetRequest>, res: Response<PatientMeetResponse>) => {
    const parsedData = patientMeetBodySchema.safeParse(req.body);
    if(!parsedData.success) {
        throwBadRequestError("currentDate not found");
        return;
    }
    const {currentDate} = parsedData.data;
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("Please register as doctor fisrt");
        return;
    }
    const appointments = await db.appointment.findFirst({
        where: {
            patientId: patientId,
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

const patientProfile = async (
    req: AuthRequest,
    res: Response<PatientProfileResponse>
) => {
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("No Patient found");
        return;
    }
    const patient = await db.patient.findUnique({
        where: {
            id: patientId,
        },
        select: {
            medicalHistory: true,
            dateOfBirth: true,
        },
    });
    if (!patient) {
        throwUnauthorizedError("No patient as such");
        return;
    }
    res.json({
        success: true,
        message: "Patient profile fetched successfully",
        patient: {
            medicalHistory: patient.medicalHistory,
            dob: patient.dateOfBirth,
        },
    });
};

const patientProfileEdit = async (
    req: AuthRequest<{}, {}, PatientEditProfileRequest>,
    res: Response<PatientEditProfileResponse>
) => {
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("No patient found");
        return;
    }
    const parsedBody = patientEditProfileBody.safeParse(req.body);
    if (parsedBody.error) {
        throwBadRequestError("Wrong input");
        return;
    }
    const { dob, medicalHistory } = parsedBody.data;
    const patient = await db.patient.update({
        where: {
            id: patientId,
        },
        data: {
            dateOfBirth: dob,
            medicalHistory: medicalHistory,
        },
        select: {
            dateOfBirth: true,
            medicalHistory: true,
        },
    });
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        patient: {
            dob: patient.dateOfBirth,
            medicalHistory: patient.medicalHistory,
        },
    });
};

const patientAppointments = async (req: AuthRequest, res: Response<PatientAppointmentsResponse>) => {
    const patientId = req.id;
    if (!patientId) {
        throwUnauthorizedError("No patient found");
        return;
    }
    const appointments = await db.appointment.findMany({
        where: {
            patientId: patientId,
        },
        select: {
            doctorId: true,
            slot: {
                select: {
                    startTime: true,
                    endTime: true,
                    duration: true,
                },
            },
            reason: true,
            status: true,
            createdAt: true,
        },
        orderBy: {
            slot: {
                startTime: "desc",
            },
        },
    });
    res.status(200).json({
        success:true,
        message: "Appointments fetched successfully",
        appointments: appointments
    })
};

patientDashboardRouter.get(
    "/profile",
    authMiddleware,
    patientAuthMiddleware,
    patientProfile
);

patientDashboardRouter.post(
    "/edit-profile",
    authMiddleware,
    patientAuthMiddleware,
    patientProfileEdit
);
patientDashboardRouter.post(
    "/meets",
    authMiddleware,
    patientAuthMiddleware,
    patientMeets
);
patientDashboardRouter.get(
    "/appointments",
    authMiddleware,
    patientAuthMiddleware,
    patientAppointments
);

export default patientDashboardRouter;
