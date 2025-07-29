import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom, userAtom } from "@/recoil/authAtom";
import { Button } from "./ui/button";
import { ChevronDownIcon, User, LogOut, Menu, X } from "lucide-react";

type Role = "ADMIN" | "DOCTOR" | "PATIENT" | "USER" | "NUll";

const Navbar: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const [role, setRole] = useState<Role>("NUll");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileMenuOpen(false); // automatically close on nav change
    }, [location]);

    useEffect(() => {
        if (user) setRole(user.role);
        else setRole("NUll");
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
        <nav className="sticky top-0 z-40 bg-white/90 shadow backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo and navs */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0">
                            <Logo />
                        </NavLink>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-3">
                                {navs
                                    .filter((n) => n.role.includes(role))
                                    .map((navItem) => (
                                        <NavLink
                                            key={navItem.name}
                                            to={navItem.slug}
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-md text-sm font-medium transition-colors 
                       ${
                           isActive
                               ? "bg-blue-50 text-blue-700"
                               : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                       }`
                                            }
                                        >
                                            {navItem.name}
                                        </NavLink>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Buttons and ProfileMenu */}
                    <div className="hidden md:flex items-center space-x-2">
                        {buttons
                            .filter((b) => b.role.includes(role))
                            .map((button) => (
                                <Link key={button.name} to={button.slug}>
                                    <Button
                                        variant="outline"
                                        className="font-semibold hover:bg-blue-50 px-4"
                                    >
                                        {button.name}
                                    </Button>
                                </Link>
                            ))}
                        {role !== "NUll" && (
                            <ProfileMenu user={user} role={role} />
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        {role !== "NUll" && (
                            <ProfileMenu user={user} role={role} />
                        )}
                        <button
                            aria-label="Menu"
                            className="ml-2 p-2 text-gray-600 bg-gray-50 rounded-md hover:bg-blue-50 md:hidden transition"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X size={22} />
                            ) : (
                                <Menu size={22} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden px-6 pt-4 pb-4 bg-white shadow-lg border-t border-blue-100 animate-slide-down">
                    <div className="flex flex-col space-y-2">
                        {navs
                            .filter((n) => n.role.includes(role))
                            .map((navItem) => (
                                <NavLink
                                    key={navItem.name}
                                    to={navItem.slug}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded text-base font-medium transition-colors
                   ${
                       isActive
                           ? "bg-blue-50 text-blue-700"
                           : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                   }`
                                    }
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {navItem.name}
                                </NavLink>
                            ))}
                        {buttons
                            .filter((b) => b.role.includes(role))
                            .map((button) => (
                                <Link key={button.name} to={button.slug}>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-2 font-semibold"
                                    >
                                        {button.name}
                                    </Button>
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

const ProfileMenu: React.FC<{ user: any; role: Role }> = ({ user, role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const setToken = useSetRecoilState(tokenAtom);

    // For demo: use initial or fallback
    const initials =
        user && user.fullName
            ? user.fullName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
            : null;

    const profile = [
        { name: "Profile", role: ["PATIENT"], slug: "/dashboard/profile" },
        { name: "Profile", role: ["DOCTOR"], slug: "/dash/profile" },
        {
            name: "Appointments",
            role: ["PATIENT"],
            slug: "/dashboard/appointments",
        },
        { name: "Appointments", role: ["DOCTOR"], slug: "/dash/appointments" },
        { name: "Meets", role: ["PATIENT"], slug: "/dashboard/meets" },
        { name: "Meets", role: ["DOCTOR"], slug: "/dash/meets" },
        { name: "Wallet", role: ["DOCTOR"], slug: "/dash/wallet" },
    ];

    const logout = () => {
        localStorage.removeItem("token");
        setToken(() => null);
        setIsOpen(false);
    };

    // close on outside click
    useEffect(() => {
        if (!isOpen) return;

        const close = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest("#profile-dropdown-menu"))
                setIsOpen(false);
        };
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [isOpen]);

    return (
        <div className="relative select-none" id="profile-dropdown-menu">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-full focus:outline-none focus:ring-2 ring-blue-500 hover:bg-blue-50 transition"
            >
                {initials ? (
                    <span className="inline-flex items-center justify-center w-8 h-8 text-base font-bold bg-blue-600 text-white rounded-full shadow-sm ring-2 ring-white">
                        {initials}
                    </span>
                ) : (
                    <User className="w-7 h-7 text-blue-700" />
                )}
                <ChevronDownIcon
                    className={`w-5 h-5 ml-0.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`absolute right-0 mt-2 w-52 rounded-xl shadow-lg bg-white ring-1 ring-blue-50 py-2 z-30 origin-top-right transition-all ${
                    isOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div className="px-3 pt-1 pb-1 space-y-0.5">
                    {profile
                        .filter((p) => p.role.includes(role))
                        .map((navItem) => (
                            <NavLink
                                key={navItem.slug}
                                to={navItem.slug}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded text-blue-700 hover:bg-blue-50 font-medium text-sm transition-colors"
                            >
                                {navItem.name}
                            </NavLink>
                        ))}
                    <hr className="my-1 border-blue-100" />
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded text-red-700 hover:bg-red-50 font-medium text-sm transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
