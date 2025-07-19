import links from "@/constant/links";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
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
                                href={links.other.code}
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
                        href={links.other.portfolio}
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
