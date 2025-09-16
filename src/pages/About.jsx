import React from 'react';
import { Link } from 'react-router-dom';

const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300">
      <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200" />
      <h4 className="text-2xl font-bold text-blue-900" style={{ fontFamily: '"Sansita", sans-serif' }}>{name}</h4>
      <p className="text-gray-600 font-light">{role}</p>
    </div>
  );
};

const About = () => {
  return (
    <section>
      <div className="relative w-full min-h-screen bg-gray-100">
        <div className="relative w-full pt-40 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-blue-900 mb-12" style={{ fontFamily: '"Sansita", sans-serif' }}>About Us</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h3 className="text-3xl font-bold text-blue-900 mb-6" style={{ fontFamily: '"Sansita", sans-serif' }}>Our Story</h3>
              <p className="text-lg text-gray-700 mb-6">
                We are just a group of B.Tech students working to find a solution on the problem of legal document analysis and generation. We are passionate about using technology to make legal processes more accessible and efficient for everyone. Our project aims to simplify the complexities of legal language and provide tools that empower individuals and businesses to handle their legal needs with confidence.
              </p>
              <p className="text-lg text-gray-700">
                Our cutting-edge platform leverages the power of AI to provide you with accurate, reliable, and easy-to-understand legal insights. Whether you're drafting a contract, analyzing a legal document, or seeking guidance on legal matters, we're here to help.
              </p>
            </div>

            <div className="bg-transparent rounded-2xl p-8">
              <h3 className="text-4xl font-bold text-blue-900 mb-10 text-center" style={{ fontFamily: '"Sansita", sans-serif' }}>Meet Our Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <TeamMemberCard name="Om Takale" role="Team Leader" imageUrl="" />
                <TeamMemberCard name="Muskan Kumari" role="UI & UX" imageUrl="" />
                <TeamMemberCard name="Muskan Nayak" role="UI & UX" imageUrl="" />
                <TeamMemberCard name="Siddharth Kumar" role="Backend" imageUrl="" />
                <TeamMemberCard name="Vineeth Soudri" role="Google Cloud Engineer" imageUrl="" />
                <TeamMemberCard name="Sinchana R" role="Research & Content" imageUrl="" />
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/contact">
                <button
                  className="px-8 py-4 text-white bg-blue-800 rounded-full hover:bg-blue-900 transition-colors focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
