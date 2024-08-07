import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us. Your inquiries are important to us, and we aim to respond as quickly as possible.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            For any issues, suggestions, or general inquiries, please email us at:
          </p>
          <p className="mt-2 text-lg text-indigo-600">
            <a href="mailto:tech.kushalgoyal@gmail.com" className="text-indigo-600 hover:text-indigo-900">tech.kushalgoyal@gmail.com</a>
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for using HealthHub. We are committed to providing you with the best possible service and support. Your feedback is invaluable in helping us improve our platform and services.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default Contact;
