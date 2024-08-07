import Footer from "@/components/Footer";

interface IFaq {
    question: string;
    answer: string;
}

const FAQ = () => {
    const faqs: IFaq[] = [
        {
            question: "What is HealthHub?",
            answer: "HealthHub is a comprehensive platform designed to streamline healthcare management. It provides features for patients to book appointments, access medical records, and communicate with healthcare providers",
        },
        {
            question: "Who can use HealthHub?",
            answer: "HealthHub is intended for patients, healthcare providers. Patients can manage their health records and appointments, healthcare providers can manage their schedules and patient interactions.",
        },
        {
            question: "Is HealthHub secure?",
            answer: "Yes, HealthHub is designed with security as a top priority. We use encryption, secure authentication, and other best practices to ensure that your data is safe.",
        },
        {
            question: "How do I book a consultation?",
            answer: "To book a consultation, sign up on HealthHub, browse through the available doctors, and select a convenient time slot for your appointment.",
        },
        {
            question: "Is my personal information secure?",
            answer: "Yes, we prioritize your privacy and security. All personal information is encrypted and securely stored, ensuring confidentiality and protection.",
        },
        {
            question: "What services are available on HealthHub?",
            answer: "HealthHub offers a range of services including general consultations, specialist consultations, follow-up appointments, and health advice.",
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
