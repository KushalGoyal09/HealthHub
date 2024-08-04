interface IFaq {
    question: string,
    answer: string
}

const FAQ  = () => {

    const faqs : IFaq[]= [
        {
            question: "What is HealthHub?",
            answer: "HealthHub is a comprehensive platform designed to streamline healthcare management. It provides features for patients to book appointments, access medical records, and communicate with healthcare providers"
        }, 
        {
            question: "Who can use HealthHub?",
            answer:"HealthHub is intended for patients, healthcare providers. Patients can manage their health records and appointments, healthcare providers can manage their schedules and patient interactions."
        }, 
        {
            question:"Is HealthHub secure?",
            answer: "Yes, HealthHub is designed with security as a top priority. We use encryption, secure authentication, and other best practices to ensure that your data is safe."
        },
    ];

  return (
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">HealthHub FAQ</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">General Questions</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">What is HealthHub?</h3>
            <p className="text-gray-500">HealthHub is a comprehensive platform designed to streamline healthcare management. It provides features for patients to book appointments, access medical records, and communicate with healthcare providers.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">Who can use HealthHub?</h3>
            <p className="text-gray-500">HealthHub is intended for patients, healthcare providers, and administrators. Patients can manage their health records and appointments, healthcare providers can manage their schedules and patient interactions, and administrators can oversee the entire system.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">Is HealthHub secure?</h3>
            <p className="text-gray-500">Yes, HealthHub is designed with security as a top priority. We use encryption, secure authentication, and other best practices to ensure that your data is safe.</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Questions</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How do I sign up for HealthHub?</h3>
            <p className="text-gray-500">To sign up, visit our website and click on the "Sign Up" button. You will need to provide some basic information and create a secure password.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How can I book an appointment?</h3>
            <p className="text-gray-500">Once logged in, go to the "Appointments" section, select your healthcare provider, choose an available time slot, and confirm your booking.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How do I access my medical records?</h3>
            <p className="text-gray-500">Your medical records can be accessed by navigating to the "Medical Records" section after logging into your HealthHub account.</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Healthcare Provider Questions</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How do I register as a healthcare provider on HealthHub?</h3>
            <p className="text-gray-500">Healthcare providers can register by visiting the "Provider Sign Up" section on our website. You will need to provide your professional details and verify your identity.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How can I manage my appointments?</h3>
            <p className="text-gray-500">You can manage your appointments through the "Provider Dashboard," where you can view, reschedule, or cancel appointments.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">Can I communicate with my patients through HealthHub?</h3>
            <p className="text-gray-500">Yes, HealthHub offers a secure messaging feature that allows healthcare providers to communicate directly with their patients.</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Technical Questions</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">What technologies does HealthHub use?</h3>
            <p className="text-gray-500">HealthHub is built using modern web technologies such as TypeScript, React, Node.js, Express.js, MongoDB, and AWS.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">Who can I contact for technical support?</h3>
            <p className="text-gray-500">For technical support, you can reach out to our support team via the "Contact Us" page on our website or send an email to support@healthhub.com.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">Does HealthHub offer mobile app support?</h3>
            <p className="text-gray-500">Yes, HealthHub is fully responsive and can be accessed via web browsers on both desktop and mobile devices. A dedicated mobile app is currently in development and will be available soon.</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Miscellaneous Questions</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How do I provide feedback or suggestions?</h3>
            <p className="text-gray-500">We value your feedback! You can provide feedback or suggestions through the "Feedback" section on our website or email us at feedback@healthhub.com.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">How can I stay updated with HealthHub news?</h3>
            <p className="text-gray-500">You can stay updated by subscribing to our newsletter or following us on social media platforms.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-600">What if I forget my password?</h3>
            <p className="text-gray-500">If you forget your password, you can use the "Forgot Password" feature on the login page to reset it. You will receive an email with instructions to create a new password.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
