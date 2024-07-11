import React, { useEffect, useState } from "react";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashBoard from "./PatientDashboard";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/authAtom";
import { useNavigate } from "react-router-dom";

type role = "ADMIN" | "DOCTOR" | "PATIENT" | "USER";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);
    const [role, setRole] = useState<role | null>(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (user.role === "DOCTOR") {
            setRole("DOCTOR");
        } else if (user.role === "PATIENT") {
            setRole("PATIENT");
        } else if (user.role === "USER") {
            navigate("/login");
        }
    }, [user]);

    return (
        <>
            {role === "DOCTOR" && <DoctorDashboard />}
            {role === "PATIENT" && <PatientDashBoard />}
        </>
    );
};

export default Dashboard;
