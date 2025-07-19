import Footer from "@/components/Footer";
import links from "@/constant/links";

const Suggestions = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Suggestions
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We value your feedback and suggestions. Your
                            insights help us make HealthHub better for everyone.
                            If you have any ideas or suggestions, please let us
                            know.
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            To provide your suggestions, please email us at:
                        </p>
                        <p className="mt-2 text-lg text-indigo-600">
                            <a
                                href={`mailto:${links.other.email}`}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                {links.other.email}
                            </a>
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            When sending your suggestions, please include as
                            much detail as possible, such as:
                        </p>
                        <ul className="mt-2 text-lg text-gray-600 list-disc list-inside">
                            <li>
                                What feature or improvement you are suggesting
                            </li>
                            <li>How this would benefit users</li>
                            <li>Any other relevant details or examples</li>
                        </ul>
                        <p className="mt-4 text-lg text-gray-600">
                            Thank you for helping us improve HealthHub. We
                            appreciate your feedback and look forward to hearing
                            from you.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Suggestions;
