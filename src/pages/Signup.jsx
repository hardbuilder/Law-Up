import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <section>
      <div className="relative w-full min-h-screen">
        <img
          src="/assests/analyze/bg.png"
          alt="decor"
          className="fixed inset-0 w-full h-full object-cover"
        />
        <div className="relative w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/30 backdrop-blur-sm shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-6" style={{ fontFamily: '"Sansita", sans-serif' }}>Sign Up</h2>
            <form>
              <div className="mb-4">
                <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white/50"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white/50"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white/50"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full px-6 py-3 text-white bg-blue-800 rounded-full hover:bg-blue-900 transition-colors focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center text-blue-800 text-sm mt-6">
                Already have an account? <Link to="/login" className="font-bold hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
