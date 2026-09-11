'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Zap, ShieldQuestion } from 'lucide-react';
import { GESTURE_DICTIONARY } from '../config/gestures';

interface HowItWorksModalProps {
  onClose: () => void;
  onStart: () => void;
}

export default function HowItWorksModal({ onClose, onStart }: HowItWorksModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-3xl bg-[#0c0c1e] border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-white overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-950/80 border border-purple-500/40 rounded-xl text-purple-400">
              <ShieldQuestion className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                HOW LEGS CHAT WORKS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                The official leg-to-text gesture dictionary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2 custom-scrollbar">
          {/* Concept Overview */}
          <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="text-3xl p-3 bg-purple-900/40 rounded-2xl border border-purple-400/30">
              🦵💨
            </div>
            <div className="text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-purple-300">No Typing Allowed!</p>
              <p>
                Your webcam continuously tracks your hip, knee, and ankle keypoints. By moving your legs in the air, you trigger instant artificial translation into chat messages.
              </p>
            </div>
          </div>

          {/* Gesture Dictionary Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Leg Gesture Keymap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(GESTURE_DICTIONARY).map((g) => (
                <div
                  key={g.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3 flex items-start gap-3 transition-colors"
                >
                  <div className="px-2.5 py-1 bg-purple-950 border border-purple-500/40 rounded-lg text-purple-300 font-mono font-bold text-xs">
                    {g.name}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-cyan-300 truncate">&quot;{g.message}&quot;</p>
                    <p className="text-xs text-slate-400 truncate">{g.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold">Key Technologies & Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Webcam Pose Detection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Camera-Free Demo Mode</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dynamic Uselessness Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Local Room Broadcast Sync</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>I&apos;M READY TO USE MY LEGS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
