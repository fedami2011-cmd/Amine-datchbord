// app/components/AgencyHubContact.tsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Assuming react-icons is installed

const AgencyHubContact = () => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Agency Hub & Contact</h2>

      {/* Agency Introduction Card */}
      <div className="bg-gray-700 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Nexus AI</h3>
        <p className="text-gray-300 leading-relaxed">
          Nexus AI provides an AI & Workflow Automation Control Center tailored for US Real Estate Agents & Brokers.
        </p>
      </div>

      {/* Agency Features */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Agency Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-green-400">24/7 Processing</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-yellow-400">Accurate Source Tracking</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-purple-400">80% Time Savings</p>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="bg-gray-700 p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
        <div className="flex flex-col space-y-4">
          <a
            href="https://calendly.com/amine-nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            Book a Live Demo
          </a>
          <a
            href="mailto:amine.branding.dz@gmail.com"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            Email: amine.branding.dz@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/amine-feddane-8a2099418/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            <FaLinkedin className="mr-2" size={20} /> LinkedIn
          </a>
          <a
            href="https://github.com/your-github-profile" // Placeholder for GitHub profile
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-950 text-white font-bold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            <FaGithub className="mr-2" size={20} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgencyHubContact;