import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div ref={ref} className="relative z-10 bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-32">
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-[#7cd1e9] to-blue-200 h-60 w-72 rounded-br-[65px] rounded-bl-[30px] rounded-tl-[65px] rounded-tr-[30px] p-6 hover:shadow-2xl duration-500 hover:rounded-2xl transform hover:-translate-y-2 transition-all"
          >
            <h3 className="text-white text-2xl font-sans font-bold mb-2">Hassle-Free Upload</h3>
            <p className="text-white text-base font-light leading-relaxed">
              Securely upload PDFs, DOCX files, or even photos. Our AI handles various formats with ease and accuracy.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-[#7cd1e9] to-blue-200 h-60 w-72 rounded-br-[65px] rounded-bl-[30px] rounded-tl-[65px] rounded-tr-[30px] p-6 hover:shadow-2xl duration-500 hover:rounded-2xl transform hover:-translate-y-2 transition-all"
          >
            <h3 className="text-white text-2xl font-bold font-sans mb-2">Insights That Matter</h3>
            <p className="text-white text-base leading-relaxed font-light">
              Get an interactive dashboard with risk scores, highlighted clauses, and summaries in plain language.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-[#7cd1e9] to-blue-200 h-60 w-72 rounded-br-[65px] rounded-bl-[30px] rounded-tl-[65px] rounded-tr-[30px] p-6 hover:shadow-2xl duration-500 hover:rounded-2xl transform hover:-translate-y-2 transition-all"
          >
            <h3 className="text-white text-2xl font-bold font-sans mb-2">Draft in Minutes</h3>
            <p className="text-white text-base leading-relaxed font-light">
              Our platform will help you draft an actual agreement in less than 2 minutes based on your needs.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
