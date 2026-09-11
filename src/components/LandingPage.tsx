'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, ArrowRight, Activity, ShieldAlert, Cpu } from 'lucide-react';
import HowItWorksModal from './HowItWorksModal';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-[#070712] text-white">
      {/* Dynamic Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-8 my-auto py-8">
        
        {/* Hackathon Event Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] text-purple-300 text-xs md:text-sm font-mono uppercase tracking-widest"
        >
          <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Useless 3.0 Flagship Project</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
        </motion.div>

        {/* Large Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
            LEGS CHAT
          </h1>
          <p className="text-xl md:text-2xl font-medium text-cyan-300 tracking-wide font-mono">
            &quot;Why use your hands when you have legs?&quot;
          </p>
        </motion.div>

        {/* Animated Cybernetic Legs Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl bg-slate-900/60 border border-purple-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-around gap-6 py-4">
            {/* Person 1 Animation */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-36 border border-cyan-500/40 rounded-2xl bg-cyan-950/20 p-2 flex flex-col items-center justify-end overflow-hidden">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-400 bg-cyan-900/50 mb-2" />
                <div className="w-12 h-10 border-2 border-cyan-400 bg-cyan-950 rounded-md" />
                {/* Legs moving in air */}
                <motion.div
                  animate={{ rotate: [-20, 35, -20] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-2.5 h-16 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full origin-top shadow-[0_0_12px_#06b6d4] absolute bottom-3 left-8"
                />
                <motion.div
                  animate={{ rotate: [30, -15, 30] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
                  className="w-2.5 h-16 bg-gradient-to-b from-cyan-400 to-pink-500 rounded-full origin-top shadow-[0_0_12px_#ec4899] absolute bottom-3 right-8"
                />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                PLAYER 1 🦵
              </span>
            </div>

            {/* Gesture Signal Beam */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 text-purple-400">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Activity className="w-6 h-6 text-pink-400" />
                </motion.div>
                <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse" />
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </motion.div>
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/70 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                POSE → TEXT CONVERTER
              </span>
            </div>

            {/* Person 2 Animation */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-36 border border-pink-500/40 rounded-2xl bg-pink-950/20 p-2 flex flex-col items-center justify-end overflow-hidden">
                <div className="w-8 h-8 rounded-full border-2 border-pink-400 bg-pink-900/50 mb-2" />
                <div className="w-12 h-10 border-2 border-pink-400 bg-pink-950 rounded-md" />
                {/* Legs moving in air */}
                <motion.div
                  animate={{ rotate: [25, -25, 25] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-2.5 h-16 bg-gradient-to-b from-pink-400 to-purple-500 rounded-full origin-top shadow-[0_0_12px_#ec4899] absolute bottom-3 left-8"
                />
                <motion.div
                  animate={{ rotate: [-30, 20, -30] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
                  className="w-2.5 h-16 bg-gradient-to-b from-pink-400 to-cyan-500 rounded-full origin-top shadow-[0_0_12px_#06b6d4] absolute bottom-3 right-8"
                />
              </div>
              <span className="text-xs font-mono text-pink-400 font-semibold bg-pink-950/80 px-3 py-1 rounded-full border border-pink-500/30">
                PLAYER 2 🦵
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-xs font-mono text-slate-400">
              ⚡ Powered by MediaPipe AI Pose Detection & Non-Existent Efficiency Standards
            </p>
          </div>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl space-y-2 text-slate-300"
        >
          <p className="text-lg md:text-xl font-semibold text-purple-200">
            The world&apos;s least practical communication technology.
          </p>
          <p className="text-sm md:text-base text-slate-400">
            Two people. Two legs. One extremely unnecessary chat application.
          </p>
        </motion.div>

        {/* Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2"
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(168,85,247,0.8)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>START TALKING</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setShowHowItWorks(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-purple-500/60 text-slate-300 hover:text-white font-semibold text-base backdrop-blur-lg hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>HOW DOES THIS WORK?</span>
          </button>
        </motion.div>

        {/* Disclaimer / Warning Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-4"
        >
          <ShieldAlert className="w-4 h-4 text-amber-500/80" />
          <span>Warning: May cause leg cramps, core exhaustion, and loss of dignity.</span>
        </motion.div>

      </div>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} onStart={onStart} />
      )}
    </div>
  );
}
