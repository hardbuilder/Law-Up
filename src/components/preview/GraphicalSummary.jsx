import React from 'react';
import { motion } from 'framer-motion';

const GraphicalSummary = ({ score, positives, risks, sentiment, variants }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const positivesCount = positives.length;
  const risksCount = risks.length;
  const ratio = risksCount > 0 ? (positivesCount / risksCount).toFixed(1) : positivesCount;

  const getScoreConfig = (score) => {
    if (score >= 80) return { color: 'text-emerald-600', ring: 'ring-emerald-200', bg: 'bg-emerald-50' };
    if (score >= 60) return { color: 'text-amber-600', ring: 'ring-amber-200', bg: 'bg-amber-50' };
    return { color: 'text-rose-600', ring: 'ring-rose-200', bg: 'bg-rose-50' };
  };

  const scoreConfig = getScoreConfig(score);

  const getSentimentEmoji = (sentiment) => {
    const s = sentiment?.toLowerCase() || '';
    if (s.includes('positive') || s.includes('favorable')) return '😊';
    if (s.includes('negative') || s.includes('concerning')) return '😟';
    if (s.includes('formal') || s.includes('neutral')) return '📋';
    if (s.includes('friendly') || s.includes('collaborative')) return '🤝';
    return '📄';
  };

  return (
    <motion.div variants={variants} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Dashboard</h3>
        <span className="text-xs text-slate-500">AI insights</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Score */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
          <div className="flex items-center">
            <div className="relative mr-4">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 120 120">
                <circle className="text-slate-200" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                <motion.circle
                  className={scoreConfig.color}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${scoreConfig.color}`}>{score}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600">Document Safety</p>
              <p className={`text-base font-bold ${scoreConfig.color}`}>{score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Review'}</p>
            </div>
          </div>
        </div>

        {/* Ratio */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
          <div>
            <p className="text-sm text-slate-600">Risk-Benefit Ratio</p>
            <p className="text-2xl font-bold text-blue-700">{ratio} <span className="text-base text-slate-600">: 1</span></p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">{positivesCount} Benefits</span>
            <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">{risksCount} Risks</span>
          </div>
        </div>

        {/* Sentiment */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getSentimentEmoji(sentiment)}</span>
            <div>
              <p className="text-sm text-slate-600">Document Tone</p>
              <p className="text-base font-bold text-purple-700">{sentiment || 'Analyzing...'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GraphicalSummary;
