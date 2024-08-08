import Footer from "@/components/Footer";

const About = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            About HealthHub
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            HealthHub is your trusted partner for online health
                            consultations, connecting patients and doctors
                            seamlessly. Our mission is to make healthcare
                            accessible, convenient, and efficient for everyone.
                        </p>
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Our Mission
                            </h3>
                            <div className="mt-2 text-base text-gray-500">
                                We aim to bridge the gap between healthcare
                                providers and patients through technology. By
                                offering a platform for online consultations, we
                                strive to improve access to quality healthcare,
                                reduce wait times, and enhance patient
                                satisfaction.
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Our Values
                            </h3>
                            <ul className="mt-2 text-base text-gray-500 list-disc list-inside">
                                <li>
                                    Integrity: We maintain the highest standards
                                    of professional ethics.
                                </li>
                                <li>
                                    Compassion: We prioritize patient well-being
                                    and empathetic care.
                                </li>
                                <li>
                                    Innovation: We embrace technology to improve
                                    healthcare delivery.
                                </li>
                                <li>
                                    Accessibility: We strive to make healthcare
                                    available to all.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Our Team
                            </h3>
                            <div className="mt-2 text-base text-gray-500">
                                <p>
                                    Proudly opensource, you are welcome for
                                    contibutions.
                                </p>

                                <a
                                    href="https://kushalgoyal.tech"
                                    className="text-blue-500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Kushal Goyal
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Test Mode
                            </h3>
                            <div className="mt-2 text-base text-gray-500">
                                The application is in test mode.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
