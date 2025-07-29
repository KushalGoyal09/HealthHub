import React, { ReactNode } from "react";
// @ts-ignore
import Fade from "react-reveal/Fade";
// @ts-ignore
import Zoom from "react-reveal/Zoom";
// @ts-ignore
import Slide from "react-reveal/Slide";
// @ts-ignore
import Pulse from "react-reveal/Pulse";
import features from "@/constant/feature";
import Footer from "@/components/Footer";
import DoctorSpecializations from "@/components/DoctorSpecializations";
import FAQs from "@/components/FAQs";
import {
    FaStethoscope,
    FaHeartbeat,
    FaUserMd,
    FaShieldAlt,
    FaClock,
    FaAward,
    FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const naviagte = useNavigate();
    return (
        <div className="min-h-screen">
            <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 animate-bounce">
                        <FaStethoscope className="w-8 h-8 text-white/20" />
                    </div>
                    <div className="absolute top-32 right-16 animate-pulse">
                        <FaHeartbeat className="w-6 h-6 text-white/30" />
                    </div>
                    <div className="absolute bottom-20 left-20 animate-bounce delay-1000">
                        <FaUserMd className="w-10 h-10 text-white/20" />
                    </div>
                    <div className="absolute bottom-32 right-32 animate-pulse delay-500">
                        <FaShieldAlt className="w-7 h-7 text-white/25" />
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
                    <div className="text-center space-y-8">
                        <Fade top distance="50px" duration={1000}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                                Welcome to{" "}
                                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                    HealthHub
                                </span>
                            </h1>
                        </Fade>

                        <Fade
                            bottom
                            distance="30px"
                            duration={1000}
                            delay={300}
                        >
                            <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-blue-100 leading-relaxed">
                                Your health, our priority. Consult with top
                                doctors from the comfort of your home with
                                cutting-edge telemedicine technology.
                            </p>
                        </Fade>

                        <Zoom duration={1000} delay={500}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                                <button
                                    onClick={() => naviagte("/login")}
                                    className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                                >
                                    Join Now
                                    <FaChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Zoom>
                    </div>
                </div>

                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-10 w-40 h-40 bg-blue-300/10 rounded-full blur-2xl animate-bounce"></div>
            </header>

            <main className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10">
                        <FaHeartbeat className="w-32 h-32 text-blue-600" />
                    </div>
                    <div className="absolute top-32 right-20">
                        <FaStethoscope className="w-24 h-24 text-blue-600" />
                    </div>
                    <div className="absolute bottom-20 left-1/4">
                        <FaShieldAlt className="w-28 h-28 text-blue-600" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Fade top distance="50px" duration={1000}>
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center mb-4">
                                <FaAward className="w-8 h-8 text-blue-600 mr-3" />
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    Why Choose HealthHub?
                                </h2>
                            </div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Experience healthcare like never before with our
                                comprehensive digital health platform
                            </p>
                        </div>
                    </Fade>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Slide
                                key={index}
                                left={index % 3 === 0}
                                bottom={index % 3 === 1}
                                right={index % 3 === 2}
                                duration={1000}
                                delay={index * 200}
                            >
                                <Feature
                                    icon={
                                        <feature.icon className="w-12 h-12 mx-auto mb-6 text-blue-600 group-hover:animate-pulse" />
                                    }
                                    title={feature.title}
                                    description={feature.description}
                                    index={index}
                                />
                            </Slide>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-8 right-8 z-50">
                    <Pulse forever duration={2000}>
                        <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer group">
                            <FaClock className="w-6 h-6 group-hover:animate-spin" />
                        </div>
                    </Pulse>
                </div>
            </main>

            <Fade up distance="50px" duration={1000}>
                <DoctorSpecializations />
            </Fade>

            <Slide left duration={1000}>
                <FAQs />
            </Slide>

            <Fade up duration={1000}>
                <Footer />
            </Fade>
        </div>
    );
};

interface IFeature {
    icon: ReactNode;
    title: string;
    description: string;
    index: number;
}

const Feature: React.FC<IFeature> = ({ icon, title, description, index }) => {
    return (
        <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden h-80 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 scale-105 group-hover:scale-100 transition-all duration-300"></div>

            <div className="relative z-10 flex flex-col h-full">
                <Zoom duration={800} delay={index * 100}>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                        {icon}
                    </div>
                </Zoom>

                <Fade up duration={600} delay={index * 150}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-700 transition-colors duration-300 flex-shrink-0">
                        {title}
                    </h3>
                </Fade>

                <Fade up duration={600} delay={index * 200}>
                    <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                        {description}
                    </p>
                </Fade>
            </div>

            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse delay-300"></div>
        </div>
    );
};

export default Home;
