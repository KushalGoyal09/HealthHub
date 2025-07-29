import links from "@/constant/links";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                            HealthHub
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Revolutionizing healthcare through technology.
                            Connect with top doctors and manage your health from
                            anywhere.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">
                            About Us
                        </h4>
                        <ul className="space-y-3">
                            {links.about.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.slug}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {links.services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        to={service.slug}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">
                            Tech & Support
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={links.other.code}
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Source Code
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/report"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                >
                                    Report Bug
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/suggest"
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                >
                                    Suggestions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400">
                                © 2025 HealthHub. All rights reserved.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 text-center md:text-right">
                            <p className="text-gray-400">
                                Made with ❤️ by{" "}
                                <a
                                    href={links.other.portfolio}
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Kushal Goyal
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
