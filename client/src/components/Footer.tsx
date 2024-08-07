import { useMemo } from "react";
import { Link } from "react-router-dom";

interface Ilinks {
    about: {
        name: string;
        slug: string;
    }[];
    services: {
        name: string;
        slug: string;
    }[];
}

const Footer: React.FC = () => {
    const links = useMemo<Ilinks>(() => {
        return {
            about: [
                {
                    name: "About Us",
                    slug: "/about",
                },
                {
                    name: "Contact",
                    slug: "/contact",
                },
                {
                    name: "About the Developer",
                    slug: "/kushalgoyal",
                },
                {
                    name: "FAQs",
                    slug: "/faqs",
                },
            ],
            services: [
                {
                    name: "login",
                    slug: "/login",
                },
                {
                    name: "signup",
                    slug: "/signup",
                },
                {
                    name: "Medibot",
                    slug: "/chat",
                },
                {
                    name: "Register as Patient",
                    slug: "register-patient",
                },
                {
                    name: "Register as Doctor",
                    slug: "register-doctor",
                },
                {
                    name: "Search Doctor",
                    slug: "/search",
                },
            ],
        };
    }, []);

    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">About Us</h3>
                    <ul>
                        {links.about.map((item) => {
                            return (
                                <li className="mb-2" key={item.name}>
                                    <Link
                                        to={item.slug}
                                        className="hover:underline"
                                    >
                                        {" "}
                                        {item.name}{" "}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Services</h3>
                    <ul>
                        {links.services.map((service) => {
                            return (
                                <li className="mb-2" key={service.name}>
                                    <Link
                                        to={service.slug}
                                        className="hover:underline"
                                    >
                                        {" "}
                                        {service.name}{" "}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Tech</h3>
                    <ul>
                        <li className="mb-2">
                            <a
                                href="https://github.com/KushalGoyal09/HealthHub"
                                className="hover:underline"
                                target="_blank"
                            >
                                Code
                            </a>
                        </li>
                        <li className="mb-2">
                            <Link to="/report" className="hover:underline">
                                Report any Bug
                            </Link>
                        </li>
                        <li>
                            <Link to="/suggest" className="hover:underline">
                                Suggestions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8">
                <p>
                    Made with ❤️ by{" "}
                    <a
                        href="https://kushalgoyal.tech"
                        className="text-blue-400 hover:underline"
                        target="_blank"
                    >
                        {" "}
                        Kushal Goyal{" "}
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;