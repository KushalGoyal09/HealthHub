import React, { useEffect, useState } from "react";
import { Link, NavLink, redirect } from "react-router-dom";
import Logo from "./Logo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom, userAtom } from "@/recoil/authAtom";
import { Button } from "./ui/button";
import { ChevronDownIcon, User } from "lucide-react";

type Role = "ADMIN" | "DOCTOR" | "PATIENT" | "USER" | "NUll";

const Navbar: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const [role, setRole] = useState<Role>("NUll");

    useEffect(() => {
        if (user) {
            setRole(user.role);
        } else {
            setRole("NUll");
        }
    }, [user]);

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
                                        <Link
                                            to={button.slug}
                                            key={button.name}
                                        >
                                            <Button className="m-2">
                                                {button.name}
                                            </Button>
                                        </Link>
                                    )
                            )}
                        </div>
                    </div>
                    {role !== "NUll" && <ProfileMenu role={role} />}
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

const ProfileMenu: React.FC<{ role: Role }> = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const setToken = useSetRecoilState(tokenAtom);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(() => null);
        toggleMenu();
    };

    const profile = [
        {
            name: "Profile",
            role: ["PATIENT"],
            slug: "/dashboard/profile",
        },
        {
            name: "Profile",
            role: ["DOCTOR"],
            slug: "/dash/profile",
        },
        {
            name: "Appointments",
            role: ["PATIENT"],
            slug: "/dashboard/appointments",
        },
        {
            name: "Appointments",
            role: ["DOCTOR"],
            slug: "/dash/appointments",
        },
        {
            name: "Meets",
            role: ["PATIENT"],
            slug: "/dashboard/meets",
        },
        {
            name: "Meets",
            role: ["DOCTOR"],
            slug: "/dash/meets",
        },
        {
            name: "Wallet",
            role: ["DOCTOR"],
            slug: "/dash/wallet",
        },
    ];

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
                <span className="sr-only">Open user menu</span>
                <User className="h-6 w-6" />
                <ChevronDownIcon className="h-5 w-5 ml-2" />
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {profile.map(
                        (navItem) =>
                            navItem.role.includes(role) && (
                                <NavLink
                                    key={navItem.slug}
                                    to={navItem.slug}
                                    onClick={toggleMenu}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {navItem.name}
                                </NavLink>
                            )
                    )}
                    <NavLink
                        to={"/"}
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                        onClick={logout}
                    >
                        Logout
                    </NavLink>
                </div>
            )}
        </div>
    );
};
