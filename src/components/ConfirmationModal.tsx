'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles } from 'lucide-react';

interface ConfirmationModalProps {
  onConfirm: () => void;
}

export default function ConfirmationModal({ onConfirm }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#0c0c1e] border border-purple-500/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-white text-center space-y-5"
      >
        <div className="w-16 h-16 rounded-full bg-purple-950/80 border-2 border-purple-400 mx-auto flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <HelpCircle className="w-8 h-8 text-cyan-400 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            SYSTEM CHECK
          </h3>
          <p className="text-sm font-semibold text-slate-200">
            Are you REALLY sure you want to communicate using your legs?
          </p>
          <p className="text-xs text-slate-400">
            This effort could easily be avoided with a standard keyboard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
          >
            YES
          </button>
          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            I GUESS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
