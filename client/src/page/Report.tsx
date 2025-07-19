import Footer from "@/components/Footer";
import links from "@/constant/links";

const Report = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Report a Bug
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We strive to make HealthHub a seamless and
                            error-free experience. If you encounter any
                            technical issues or bugs, please let us know. Your
                            feedback helps us improve the platform.
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            To report a bug, please email us at:
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
                            When reporting a bug, please include as much detail
                            as possible, such as:
                        </p>
                        <ul className="mt-2 text-lg text-gray-600 list-disc list-inside">
                            <li>The steps to reproduce the issue</li>
                            <li>Your operating system and browser version</li>
                            <li>Any error messages you received</li>
                        </ul>
                        <p className="mt-4 text-lg text-gray-600">
                            Thank you for helping us improve HealthHub. We
                            appreciate your support and patience as we work to
                            resolve any issues.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Report;
