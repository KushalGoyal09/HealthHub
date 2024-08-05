import { Search, Video, Heart, CreditCard } from "lucide-react";
import React, { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
    const features = useMemo(() => {
        return [
            {
                icon: Heart,
                title: "Comfort & Convenience",
                description:
                    "Doctors can treat or see patients from their comfort at their preferred time. Patients can consult doctors from the comfort of their home at their chosen time.",
            },
            {
                icon: Video,
                title: "Video Consultations",
                description:
                    "Video call with doctors and get online prescriptions.",
            },
            {
                icon: Search,
                title: "AI-Driven Chatbot",
                description:
                    "Chat with Medibot, our AI-driven chatbot, for health issues and medical advice.",
            },
            {
                icon: CreditCard,
                title: "Online Payments",
                description:
                    "Pay online via Razorpay using credit cards, debit cards, wallets, online banking, and more.",
            },
            {
                icon: Search,
                title: "Search & Sort Doctors",
                description:
                    "Search doctors by their years of expertise, education, and sort them by fees and experience to find the best doctor according to your needs and budget",
            },
            {
                icon: Heart,
                title: "Benefits of Online Checkups",
                description:
                    "Save time and money by getting health checkups online.",
            },
        ];
    }, []);

    return (
        <div>
            <header className="bg-blue-600 text-white p-8 text-center">
                <h1 className="text-4xl font-bold">Welcome to HealthHub</h1>
                <p className="mt-2">
                    Your health, our priority. Consult with top doctors from the
                    comfort of your home.
                </p>
            </header>
            <main className="p-8">
                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-6">
                        Why Choose HealthHub?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            return (
                                <Feature
                                    icon={
                                        <feature.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                                    }
                                    title={feature.title}
                                    description={feature.description}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </section>
            </main>
            <FAQs />
            <Footer />
        </div>
    );
};

interface IFeature {
    icon: ReactNode;
    title: string;
    description: string;
}

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

const Feature: React.FC<IFeature> = ({ icon, title, description }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            {icon}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const FAQs = () => {
    const faqs = [
        {
            question: "What is HealthHub?",
            answer: "HealthHub is an online consultation platform that connects patients with doctors for virtual appointments with help of video calls",
        },
        {
            question: "How do I book an online consultation?",
            answer: "To book an online consultation, navigate to the 'Search' section, search for a doctor, and select a suitable date and time for your appointment.",
        },
        {
            question: "What if I am confused on what I am looking for?",
            answer: "Go go chat section of app. Chat with our AI Medibot in natural language to get your confusion clear."
        },
        {
            question: "What is Medibot?",
            answer: "Medibot is our fill tuned AI model for health tips and advices."
        },
        {
            question: "Can I share my medical records with the doctor?",
            answer: "Yes, you can upload and share your medical records with the doctor during the consultation for better diagnosis and treatment.",
        },
        {
            question: "How do I join a scheduled consultation?",
            answer: "You can join a scheduled consultation by logging into your account, navigating to the 'Meets' section, and clicking on the 'Join' button next to your scheduled consultation.",
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept various payment methods, including credit/debit cards, digital wallets, and online banking. You can choose your preferred payment method during the booking process.",
        },
    ];

    return (
        <>
            <h1 className="text-2xl text-center font-bold m-3">Frequently Asked Questions</h1>
            <div className="flex justify-center m-5 text-xl">
                <Accordion type="single" collapsible className="w-3/4 mx-auto">
                    {faqs.map((faq, index) => {
                        return (
                            <AccordionItem
                                value={faq.question}
                                key={index}
                                className="border-b border-gray-200 m-4"
                            >
                                <AccordionTrigger className="px-4 py-2 rounded-t-md w-full text-left focus:outline-none">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 py-2 bg-white text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </>
    );
};

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

export default Home;
