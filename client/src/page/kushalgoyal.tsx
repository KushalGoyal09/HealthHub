import Footer from "@/components/Footer";

const AboutDeveloper = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            About the Developer
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Meet the developer behind HealthHub.
                        </p>
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <img
                                    src="/kushalgoyal.jpeg"
                                    alt="Kushal Goyal"
                                    className="w-32 h-25 rounded-full"
                                />
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Kushal Goyal
                                </h3>
                                <p className="mt-2 text-base text-gray-500 text-center">
                                    Kushal Goyal is a passionate full stack
                                    developer with expertise in building robust
                                    and scalable web applications. With a strong
                                    background in computer science and a knack
                                    for problem-solving, Kushal is dedicated to
                                    creating seamless user experiences and
                                    innovative solutions.
                                </p>
                                <a
                                    href="https://kushalgoyal.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Visit Kushal's Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutDeveloper;
