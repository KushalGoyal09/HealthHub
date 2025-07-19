import Footer from "@/components/Footer";
import faqs from "@/constant/extendedFaq";

const FAQ = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Find answers to some of the most common questions
                            about HealthHub.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white shadow sm:rounded-lg"
                            >
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <div className="mt-2 text-base text-gray-500">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FAQ;
