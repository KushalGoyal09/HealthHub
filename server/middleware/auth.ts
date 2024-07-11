import { Request, Response, NextFunction } from "express";
import {
    throwForbiddenError,
    throwUnauthorizedError,
} from "../customError/customError";
import { getUserId } from "../utils/jwt";

export enum Role {
    Doctor = "DOCTOR",
    Patient = "PATIENT",
    User = "USER",
    Admin = "ADMIN",
}

export interface AuthRequest<T = {}, P = {}, R = {}> extends Request<T, P, R> {
    userId?: string;
    role?: Role;
    id?: number;
}

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        throwUnauthorizedError("No Token Found");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        throwUnauthorizedError("No Token Found");
        return;
    }

    try {
        const payload = getUserId(token);
        if (typeof payload === "string") {
            req.userId = payload;
            req.role = Role.User;
            next();
        }
    } catch (error) {
        throwForbiddenError("Invalid token");
    }
};

export default authMiddleware;
