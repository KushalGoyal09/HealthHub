import specializations from "@/constant/specializations";

const DoctorSpecializations = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                        Specializations
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                        Popular Doctor Specializations
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover various medical specializations and find the
                        right expert for your health needs
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {specializations.map((spec, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 h-64 flex flex-col justify-between"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="flex items-start space-x-4 flex-grow">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col h-full">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 flex-shrink-0">
                                        {spec.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow overflow-hidden">
                                        {spec.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DoctorSpecializations;
