const AboutDeveloper = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About the Developer</h1>
        
        <div className="flex flex-col items-center">
          <img 
            src="https://avatars.githubusercontent.com/u/116098036" 
            alt="Kushal Goyal" 
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-700">Kushal Goyal</h2>
        </div>

        <div className="mt-8">
          <p className="text-gray-500 mb-4">
            Hi, I'm Kushal Goyal, a full stack developer with a strong passion for creating dynamic and user-friendly web applications. With extensive experience in TypeScript, JavaScript, React, Recoil, Node.js, Express.js, Tailwind CSS, Axios, React-Router-Dom, React-Hook-Forms, PostgreSQL, MongoDB, SQL and ORMs (Prisma and Mongoose), Git, AWS (EC2 and S3), HTML, CSS, JavaScript, WebRTC, and WebSockets, I enjoy solving complex problems and building efficient solutions.
          </p>
          <p className="text-gray-500 mb-4">
            Currently, I'm a 3rd-year computer science student at NSUT. Alongside my studies, I have been working on several projects, including Shortly, a URL shortener with analytics, and HealthHub, a healthcare management platform. These projects have allowed me to apply my skills in real-world scenarios and gain hands-on experience in both frontend and backend development.
          </p>
          <p className="text-gray-500 mb-4">
            My approach to development is driven by a continuous desire to learn and adapt to new technologies and methodologies. I believe in writing clean, maintainable code and always strive to follow best practices.
          </p>
          <p className="text-gray-500">
            When I'm not coding, I enjoy reading about the latest advancements in technology, exploring new tools, and contributing to open-source projects. Feel free to connect with me on LinkedIn or check out my GitHub to see some of my work.
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <a 
            href="https://linkedin.com/in/your-profile" 
            className="text-blue-600 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/your-profile" 
            className="text-gray-800 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
