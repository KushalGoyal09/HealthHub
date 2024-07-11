import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { throwNotFoundError } from "../customError/customError";
import authMiddleware, { AuthRequest } from "../middleware/auth";
import patientAuthMiddleware from "../middleware/patientAuth";
const db = new PrismaClient();
const doctorDetailRouter = Router();

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

interface ResBody {
    success: boolean;
    message: string;
    doctor: Doctor;
}

const getDoctorDetail = async (
    req: AuthRequest<{ doctorId: string }>,
    res: Response<ResBody>
) => {
    const { doctorId } = req.params;
    const doctor = await db.doctor.findUnique({
        where: {
            id: Number(doctorId),
        },
        select: {
            specialty: true,
            education: true,
            experience: true,
            fees: true,
            id: true,
            preferedTime: {
                select: { startTime: true, endTime: true, duration: true },
            },
            user: { select: { name: true } },
        },
    });
    if (!doctor) {
        throwNotFoundError("No doctor as such");
        return;
    }
    res.status(200).json({
        success: true,
        message: "Doctor details fetched successfully",
        doctor: doctor,
    });
};

doctorDetailRouter.get(
    "/:doctorId",
    authMiddleware,
    getDoctorDetail
);

export default doctorDetailRouter;
