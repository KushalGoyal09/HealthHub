import { Fragment, useMemo } from "react";
import { userAtom } from "@/recoil/authAtom";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface ISection {
    role: "Both" | "Doctor" | "Patient";
    name: string;
    path: string;
}

const DashboardSidebar: React.FC = () => {
    const user = useRecoilValue(userAtom);
    if (user === null) {
        return null;
    }
    const sections = useMemo<ISection[]>(() => {
        return [
            {
                name: "Profile",
                path: "/profile",
                role: "Both",
            },
            {
                name: "Wallet",
                path: "/wallet",
                role: "Doctor",
            },
            {
                name: "Appointments",
                path: "/appointments",
                role: "Both",
            },
            {
                name: "Meets",
                path: "/meets",
                role: "Both",
            },
        ];
    }, []);

    return (
        <div className="w-64 h-full bg-gray-800 text-white">
            <nav className="flex flex-col p-4">
                {sections.map((section) => {
                    if (
                        user.role === "DOCTOR" &&
                        (section.role === "Doctor" || section.role === "Both")
                    ) {
                        return (
                            <Fragment key={section.name}>   
                                <NavLink
                                    to={`/dash${section.path}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block p-4 mb-2 bg-blue-600 rounded text-white"
                                            : "block p-4 mb-2 hover:bg-blue-500 hover:text-white rounded"
                                    }
                                >
                                    {section.name}
                                </NavLink>
                            </Fragment>
                        );
                    }
                    if (
                        user.role === "PATIENT" &&
                        (section.role === "Patient" || section.role === "Both")
                    ) {
                        return (
                            <Fragment key={section.name}>
                                <NavLink
                                    to={`/dashboard${section.path}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block p-4 mb-2 bg-blue-600 rounded text-white"
                                            : "block p-4 mb-2 hover:bg-blue-500 hover:text-white rounded"
                                    }
                                >
                                    {section.name}
                                </NavLink>
                            </Fragment>
                        );
                    }
                })}
            </nav>
        </div>
    );
};

export default DashboardSidebar;
