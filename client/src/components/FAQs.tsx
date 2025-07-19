import faqs from "@/constant/faq";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
    return (
        <>
            <h1 className="text-2xl text-center font-bold m-3">
                Frequently Asked Questions
            </h1>
            <div className="flex justify-center m-5 text-xl">
                <Accordion type="single" collapsible className="w-3/4 mx-auto">
                    {faqs.map((faq, index) => {
                        return (
                            <AccordionItem
                                value={faq.question}
                                key={index}
                                className="border-b border-gray-200 m-4"
                            >
                                <AccordionTrigger className="px-4 py-2 rounded-t-md w-full text-left focus:outline-none">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 py-2 bg-white text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </>
    );
};

export default FAQs;