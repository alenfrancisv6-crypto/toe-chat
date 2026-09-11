'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, AlertTriangle } from 'lucide-react';

interface UselessnessMeterProps {
  score: number;
}

export default function UselessnessMeter({ score }: UselessnessMeterProps) {
  const isMax = score >= 100;

  return (
    <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-xl space-y-2">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-slate-300 font-bold flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-pink-500 animate-bounce" />
          USELESSNESS SCORE
        </span>
        <span
          className={`font-bold text-sm ${
            isMax ? 'text-pink-400 animate-pulse' : 'text-purple-300'
          }`}
        >
          {score}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden relative">
        <motion.div
          className={`h-full rounded-full ${
            isMax
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_15px_#ec4899]'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}
          initial={{ width: '0%' }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {isMax && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pink-950/80 border border-pink-500/50 rounded-xl p-2 text-center text-pink-200 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>MAXIMUM USELESSNESS ACHIEVED!</span>
        </motion.div>
      )}
    </div>
  );
}
