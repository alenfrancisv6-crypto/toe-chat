'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu } from 'lucide-react';
import { AI_STATUS_LIST } from '../config/gestures';

export default function AIStatus() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % AI_STATUS_LIST.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-xl shadow-lg flex items-center gap-3">
      <div className="p-2 bg-purple-950 border border-purple-500/30 rounded-xl text-purple-400">
        <Bot className="w-5 h-5 animate-pulse" />
      </div>

      <div className="flex-1 overflow-hidden">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
          AI AGENT INTEL
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={statusIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs font-mono font-bold text-cyan-300 truncate"
          >
            {AI_STATUS_LIST[statusIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
