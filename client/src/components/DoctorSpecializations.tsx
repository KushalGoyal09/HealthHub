import specializations from "@/constant/specializations";

const DoctorSpecializations = () => {
    return (
        <div className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Popular Doctor Specializations
                    </h2>
                    <p className="text-lg text-gray-600">
                        Learn about various doctor specializations and what they
                        mean.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {specializations.map((spec, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-blue-100"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-3">
                                {spec.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {spec.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorSpecializations;
