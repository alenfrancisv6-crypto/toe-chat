'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { GestureId } from '../types';
import { GESTURE_DICTIONARY } from '../config/gestures';

interface ProcessingAnimationProps {
  gestureId: GestureId;
  onComplete: (messageText: string) => void;
}

const STAGES = [
  { text: 'LEG MOVEMENT DETECTED 🦵', sub: 'Scanning hip-knee-ankle keypoints...' },
  { text: 'ANALYZING... 🧠', sub: 'Calculating leg trajectory & velocity...' },
  { text: 'TRANSLATING LEG MOVEMENT... ⚡', sub: 'Converting muscle signal to ASCII text...' },
];

export default function ProcessingAnimation({ gestureId, onComplete }: ProcessingAnimationProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const gestureDef = GESTURE_DICTIONARY[gestureId];

  useEffect(() => {
    const timer1 = setTimeout(() => setStageIndex(1), 400);
    const timer2 = setTimeout(() => setStageIndex(2), 850);
    const timer3 = setTimeout(() => {
      onComplete(gestureDef ? gestureDef.message : 'LEG GESTURE');
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [gestureId, gestureDef, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="w-full max-w-md bg-[#0c0c1e] border border-cyan-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-white flex flex-col items-center text-center space-y-5"
      >
        <div className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] relative">
          <Cpu className="w-8 h-8 animate-spin" />
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center gap-2">
          {STAGES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === stageIndex
                  ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
                  : idx < stageIndex
                  ? 'w-4 bg-purple-500'
                  : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Active Stage Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-1"
          >
            <h4 className="text-lg font-mono font-bold text-cyan-300">
              {STAGES[stageIndex].text}
            </h4>
            <p className="text-xs font-mono text-slate-400">
              {STAGES[stageIndex].sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Result Preview */}
        <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">DETECTED GESTURE:</span>
          <span className="text-purple-300 font-bold">{gestureDef?.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
