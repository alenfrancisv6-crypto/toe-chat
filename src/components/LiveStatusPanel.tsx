'use client';

import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { LiveLegState } from '../types';
import { GESTURE_DICTIONARY } from '../config/gestures';

interface LiveStatusPanelProps {
  state: LiveLegState;
}

export default function LiveStatusPanel({ state }: LiveStatusPanelProps) {
  const currentMessage = state.activeGesture
    ? GESTURE_DICTIONARY[state.activeGesture]?.message
    : '—';

  return (
    <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-xl shadow-xl space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-cyan-400 font-bold flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-purple-400" />
          LEG SCANNER HUD
        </span>
        <span className="text-[10px] text-slate-400">REALTIME POSE</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Left Leg Status */}
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">LEFT LEG</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                state.leftLegDetected ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-red-500'
              }`}
            />
            <span className={state.leftLegDetected ? 'text-emerald-300 font-bold' : 'text-slate-500'}>
              {state.leftLegDetected ? (state.leftLegRaised ? 'RAISED ↑' : 'DETECTED') : 'NONE'}
            </span>
          </div>
        </div>

        {/* Right Leg Status */}
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">RIGHT LEG</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                state.rightLegDetected ? 'bg-pink-400 shadow-[0_0_6px_#ec4899]' : 'bg-red-500'
              }`}
            />
            <span className={state.rightLegDetected ? 'text-pink-300 font-bold' : 'text-slate-500'}>
              {state.rightLegDetected ? (state.rightLegRaised ? 'RAISED ↑' : 'DETECTED') : 'NONE'}
            </span>
          </div>
        </div>
      </div>

      {/* Confidence & Active Gesture */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400">POSE CONFIDENCE</span>
          <div className="text-sm font-bold text-cyan-300 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>{state.poseConfidence}%</span>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400">CURRENT GESTURE</span>
          <p className="text-xs font-bold text-purple-300 truncate">
            {state.activeGesture ? state.activeGesture.replace(/_/g, ' ') : 'NEUTRAL'}
          </p>
        </div>
      </div>

      {/* Translation Output Box */}
      <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-2.5 flex items-center justify-between">
        <span className="text-[10px] text-purple-300">TRANSLATION:</span>
        <span className="text-sm font-bold text-cyan-300 font-sans">&quot;{currentMessage}&quot;</span>
      </div>
    </div>
  );
}
