import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <>
      <div className="relative mt-0 pt-24">
        {/* Blurred gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-white to-sky-300 blur-2xl"></div>
          {/* Gradient mask to control blur intensity */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>
        </div>

        {/* Foreground content */}
        <div className="relative space-y-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-8 md:ml-20 lg:ml-40">
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[#093FB4] opacity-50 mt-12 text-xl"
              >
                we help you,
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-8xl text-[#093FB4] font-serif mt-12"
              >
                Demystify legal documents in seconds
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-[#093FB4] opacity-50 mt-12 text-xl"
              >
                Turn complex contracts into plain-language insights. <br /> Upload,
                analyze, and ask questions instantly.
              </motion.p>
              <Link to="/analyze">
                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12 px-8 py-3 bg-[#093FB4] text-white rounded-xl text-lg hover:bg-blue-700 transition"
                >
                  Get started for free
                </motion.button>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="w-full md:w-1/2 md:pr-20 lg:pr-40"
            >
              <img
                src="/assests/home/hero_section_pic.png"
                alt="Hero Image"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-4xl p-12 font-mono text-center whitespace-nowrap mt-25"
            >
              WHY CHOOSE LAW-UP?
            </motion.h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
