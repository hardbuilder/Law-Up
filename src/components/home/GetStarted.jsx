import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GetStarted = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div ref={ref} className="my-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
        className="relative bg-gradient-to-r from-blue-400 to-teal-200 max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 rounded-3xl hover:shadow-2xl duration-500 transform hover:-translate-y-2 transition-all"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-extrabold text-white sm:text-5xl"
          style={{ fontFamily: 'Sansita, sans-serif' }}
        >
          Get Started with Law-Up Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-lg leading-6 text-white"
        >
          Take the first step towards simplifying your legal documents. It's fast, easy, and secure.
        </motion.p>
        <Link to="/analyze">
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            type="button"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 sm:w-auto"
          >
            Start Analyzing
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default GetStarted;
