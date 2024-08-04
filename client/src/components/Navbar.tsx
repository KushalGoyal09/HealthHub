import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "@/recoil/authAtom";
import { Button } from "./ui/button";

type Role = "ADMIN" | "DOCTOR" | "PATIENT" | "USER" | "NUll";

const Navbar: React.FC = () => {
    const userLoadable = useRecoilValueLoadable(userAtom);

    const [role, setRole] = useState<Role>("NUll");

    useEffect(() => {
        if (userLoadable.state === "hasValue") {
            const user = userLoadable.contents;
            if (user) {
                setRole(user.role);
            }
        }
    }, [userLoadable]);

    const navs = [
        {
            name: "Home",
            role: ["ADMIN", "DOCTOR", "PATIENT", "USER", "NUll"],
            slug: "/",
        },
        { name: "Chat", role: ["PATIENT"], slug: "/chat" },
        { name: "Search", role: ["PATIENT"], slug: "/search" },
        { name: "Meets", role: ["PATIENT"], slug: "/dashboard/meets" },
        { name: "Meets", role: ["DOCTOR"], slug: "/dash/meets" },
        {
            name: "Appointments",
            role: ["PATIENT"],
            slug: "/dashboard/appointments",
        },
        { name: "Appointments", role: ["DOCTOR"], slug: "/dash/appointments" },
        { name: "Profile", role: ["PATIENT"], slug: "/dashboard/profile" },
        { name: "Profile", role: ["DOCTOR"], slug: "/dash/profile" },
        { name: "Wallet", role: ["DOCTOR"], slug: "/dash/wallet" },
        { name: "FAQs", role: ["NUll"], slug: "/faqs" },
        { name: "About", role: ["NUll"], slug: "/about" },
        { name: "About the Developer", role: ["NUll"], slug: "/kushalgoyal" },
    ];

    const buttons = [
        {
            name: "Register as patient",
            role: ["USER"],
            slug: "/register-patient",
        },
        {
            name: "Register as doctor",
            role: ["USER"],
            slug: "/register-doctor",
        },
        { name: "Login", role: ["NUll"], slug: "/login" },
        { name: "Signup", role: ["NUll"], slug: "/signup" },
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0">
                            <Logo />
                        </NavLink>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navs.map(
                                    (navItem) =>
                                        navItem.role.includes(role) && (
                                            <NavLink
                                                key={navItem.name}
                                                to={navItem.slug}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {navItem.name}
                                            </NavLink>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {buttons.map(
                                (button) =>
                                    button.role.includes(role) && (
                                        <Button
                                            key={button.name}
                                            className="m-2"
                                        >
                                            <Link to={button.slug}>
                                                {" "}
                                                {button.name}{" "}
                                            </Link>
                                        </Button>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navs.map(
                        (navItem) =>
                            navItem.role.includes(role) && (
                                <NavLink
                                    key={navItem.name}
                                    to={navItem.slug}
                                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {navItem.name}
                                </NavLink>
                            )
                    )}
                    {buttons.map(
                        (button) =>
                            button.role.includes(role) && (
                                <Button key={button.name} className="m-2">
                                    <Link to={button.slug}>{button.name}</Link>
                                </Button>
                            )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
