import React from 'react';
import { motion } from 'framer-motion';

const KeyClausesCard = ({ keyClauses, variants }) => {
  return (
    <motion.div variants={variants} className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Key Clauses</h2>
      <ul className="space-y-4">
        {keyClauses.length > 0 ? keyClauses.map((clause, index) => (
          <li key={index}>
            <h4 className="text-xl font-semibold text-gray-800">{clause.title}</h4>
            <p className="text-lg text-gray-700 leading-relaxed">{clause.content}</p>
          </li>
        )) : <li className="text-lg text-gray-500">Generating key clauses...</li>}
      </ul>
    </motion.div>
  );
};

export default KeyClausesCard;
