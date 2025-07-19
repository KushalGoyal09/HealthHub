import React, { ReactNode } from "react";
import features from "@/constant/feature";
import Footer from "@/components/Footer";
import DoctorSpecializations from "@/components/DoctorSpecializations";
import FAQs from "@/components/FAQs";

const Home = () => {
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

export default Home;
