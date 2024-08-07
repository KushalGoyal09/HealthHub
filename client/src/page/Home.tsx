import { Search, Video, Heart, CreditCard } from "lucide-react";
import React, { ReactNode, useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";

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
            <DoctorSpecializations />
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
            question: "How to access all the services provided by HealthHub?",
            answer: "Signup using your email and then register as doctor or patient to access all the related services.",
        },
        {
            question:
                "Why there is no confirmation of email using OTPs or anything?",
            answer: "The app is in test mode. We do not confirm your credentials so that you do not hesitate to use our app.",
        },
        {
            question: "How do I book an online consultation?",
            answer: "To book an online consultation, navigate to the 'Search' section, search for a doctor, and select a suitable date and time for your appointment.",
        },
        {
            question: "What if I am confused on what I am looking for?",
            answer: "Go go chat section of app. Chat with our AI Medibot in natural language to get your confusion clear.",
        },
        {
            question: "What is Medibot?",
            answer: "Medibot is our fill tuned AI model for health tips and advices.",
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
            <h1 className="text-2xl text-center font-bold m-3">
                Frequently Asked Questions
            </h1>
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

const DoctorSpecializations = () => {
    const specializations = [
        {
            title: "Cardiologist",
            description:
                "A doctor who specializes in the study or treatment of heart diseases and heart abnormalities.",
        },
        {
            title: "Dermatologist",
            description:
                "A doctor who specializes in the treatment of skin disorders.",
        },
        {
            title: "Neurologist",
            description:
                "A doctor who specializes in treating diseases of the nervous system.",
        },
        {
            title: "Psychiatrist",
            description:
                "A doctor who specializes in the diagnosis, prevention, study, and treatment of mental disorders.",
        },
    ];

    return (
        <div className="bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Popular Doctor Specializations
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Learn about various doctor specializations and what they
                        mean.
                    </p>
                </div>
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {specializations.map((spec, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {spec.title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    {spec.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
