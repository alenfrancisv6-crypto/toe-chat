'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Activity, Cpu, Sparkles } from 'lucide-react';

interface CalibrationProps {
  onComplete: () => void;
}

const STEPS = [
  {
    step: 1,
    title: 'Raise your LEFT leg',
    instruction: 'Lift your left knee or ankle high into the air.',
    icon: '🦵 Left',
    targetKey: 'LEFT_UP',
  },
  {
    step: 2,
    title: 'Raise your RIGHT leg',
    instruction: 'Keep your left leg down and extend your right leg up.',
    icon: 'Right 🦵',
    targetKey: 'RIGHT_UP',
  },
  {
    step: 3,
    title: 'Raise BOTH legs',
    instruction: 'Suspend both legs in the air simultaneously.',
    icon: '🦵 BOTH 🦵',
    targetKey: 'BOTH_UP',
  },
  {
    step: 4,
    title: 'Put BOTH legs down',
    instruction: 'Rest both feet firmly back on the ground.',
    icon: '⬇️ REST ⬇️',
    targetKey: 'BOTH_DOWN',
  },
];

export default function Calibration({ onComplete }: CalibrationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCalibratingStep, setIsCalibratingStep] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const overallProgress = isCompleted ? 100 : Math.round((currentStepIndex / STEPS.length) * 100);

  // Simulate scanning / keypoint calibration per step
  const handleSimulateStep = () => {
    if (isCalibratingStep || isCompleted) return;
    setIsCalibratingStep(true);
    setStepProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setStepProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsCalibratingStep(false);
        if (currentStepIndex + 1 < STEPS.length) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsCompleted(true);
        }
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#070712] text-white">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full bg-slate-900/70 border border-purple-500/30 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Title Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>NEURAL LEG CALIBRATION SYSTEM</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            {isCompleted ? 'LEG CALIBRATION COMPLETE' : 'CALIBRATING YOUR LEGS'}
          </h2>

          <p className="text-sm md:text-base text-slate-300">
            {isCompleted
              ? 'Congratulations. Your legs are now a keyboard.'
              : 'Before we begin, we need to teach the AI the difference between your left leg and your right leg.'}
          </p>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>CALIBRATION PROGRESS</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full shadow-[0_0_10px_#a855f7]"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Calibration Interactive Card */}
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2">
              {STEPS.map((s, idx) => {
                const isActive = idx === currentStepIndex;
                const isPassed = idx < currentStepIndex;
                return (
                  <div
                    key={s.step}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-purple-950/80 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                        : isPassed
                        ? 'bg-slate-900/60 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950/40 border-slate-800 opacity-50'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold mb-1">
                      {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : `STEP ${s.step}`}
                    </div>
                    <span className="text-[10px] truncate max-w-full font-mono text-slate-300">
                      {s.title.split(' ')[1] || s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Active Step Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-950/80 border border-purple-500/40 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
              >
                {/* Visual Icon / Scanner */}
                <div className="w-24 h-24 rounded-full bg-purple-950/60 border-2 border-purple-400/40 flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] relative">
                  <span>{currentStep.icon}</span>
                  {isCalibratingStep && (
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cyan-300">{currentStep.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentStep.instruction}</p>
                </div>

                {/* Sub Step Progress */}
                {isCalibratingStep && (
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-cyan-400">
                      <span>ANALYZING LEG POSITION...</span>
                      <span>{stepProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-200"
                        style={{ width: `${stepProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSimulateStep}
                  disabled={isCalibratingStep}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>{isCalibratingStep ? 'CALIBRATING...' : 'CONFIRM POSITION & NEXT'}</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Completion Box */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-purple-950/40 border border-purple-500/50 rounded-2xl p-8 flex flex-col items-center text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <Sparkles className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-emerald-300">SYSTEM READY</h3>
              <p className="text-sm text-slate-300">
                Your legs are calibrated with 99.8% unnecessary precision. You may now enter the chat room.
              </p>
            </div>

            <button
              onClick={onComplete}
              className="w-full max-w-xs py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>ENTER CHAT</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
