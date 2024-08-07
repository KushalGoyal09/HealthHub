import NotFound from "@/page/NotFound";
import { userAtom } from "@/recoil/authAtom";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type Role = "ADMIN" | "DOCTOR" | "PATIENT" | "USER" | "NULL";

const Protected: React.FC<{ allowedRole: Role[]; children: ReactNode }> = ({
    allowedRole,
    children,
}) => {
    const user = useRecoilValue(userAtom);
    const [role, setRole] = useState<Role>("NULL");

    useEffect(() => {
        if (user) {
            setRole(user.role);
        } else {
            setRole("NULL");
        }
    }, [userAtom]);

    if (allowedRole.includes(role)) {
        return children;
    } else {
        return <NotFound />;
    }
};

export default Protected;
