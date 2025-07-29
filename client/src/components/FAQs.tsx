import faqs from "@/constant/faq";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    FaQuestionCircle,
    FaChevronDown,
    FaHeadset,
    FaEnvelope,
} from "react-icons/fa";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";

const FAQs = () => {
    const navigate = useNavigate();
    return (
        <section className="py-24 bg-gray-50 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Fade top distance="40px">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
                            <FaHeadset className="inline mr-2 text-sm" />
                            Support
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our
                            healthcare platform
                        </p>
                    </div>
                </Fade>

                <Fade bottom distance="50px">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    value={faq.question}
                                    key={index}
                                    className="border-b border-gray-100 last:border-b-0"
                                >
                                    <AccordionTrigger className="group px-6 py-6 text-left hover:bg-gray-50 transition-colors duration-200 text-base font-semibold text-gray-900 hover:text-gray-700 flex items-center gap-3">
                                        <FaQuestionCircle className="text-gray-400 w-4 h-4 flex-shrink-0" />
                                        <span className="flex-1">
                                            {faq.question}
                                        </span>
                                        <FaChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-sm bg-white ml-7">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </Fade>

                <Fade up delay={300}>
                    <div className="mt-12 text-center">
                        <p className="text-base text-gray-600 mb-4">
                            Still have questions? We&apos;re here to help.
                        </p>
                        <button
                            onClick={() => navigate("/contact")}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
                        >
                            <FaEnvelope className="w-4 h-4" />
                            Contact Support
                        </button>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default FAQs;
