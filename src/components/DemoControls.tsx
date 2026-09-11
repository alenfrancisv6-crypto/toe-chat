'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpLeft, ArrowUpRight, MoveUp, MoveDown, ArrowRight, ArrowLeft, Zap, AlertTriangle } from 'lucide-react';
import { GestureId } from '../types';

interface DemoControlsProps {
  onSimulateGesture: (gestureId: GestureId) => void;
  activeGesture: GestureId | null;
}

const DEMO_BUTTONS: { id: GestureId; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'LEFT_LEG_UP', label: 'LEFT LEG ↑', icon: ArrowUpLeft, color: 'from-purple-600 to-indigo-600' },
  { id: 'RIGHT_LEG_UP', label: 'RIGHT LEG ↑', icon: ArrowUpRight, color: 'from-pink-600 to-rose-600' },
  { id: 'BOTH_LEGS_UP', label: 'BOTH LEGS ↑', icon: MoveUp, color: 'from-cyan-600 to-blue-600' },
  { id: 'BOTH_LEGS_DOWN', label: 'BOTH LEGS DOWN', icon: MoveDown, color: 'from-slate-700 to-slate-800' },
  { id: 'LEFT_TO_RIGHT', label: 'LEFT → RIGHT', icon: ArrowRight, color: 'from-amber-600 to-orange-600' },
  { id: 'RIGHT_TO_LEFT', label: 'RIGHT → LEFT', icon: ArrowLeft, color: 'from-emerald-600 to-teal-600' },
  { id: 'BOTH_LEGS_MOVE', label: 'BOTH LEGS MOVE', icon: Zap, color: 'from-yellow-500 to-amber-600' },
  { id: 'HOLD_BOTH_LEGS_UP', label: 'HOLD BOTH LEGS UP', icon: AlertTriangle, color: 'from-purple-700 to-pink-700' },
];

export default function DemoControls({ onSimulateGesture, activeGesture }: DemoControlsProps) {
  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 md:p-5 backdrop-blur-xl shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
          <Play className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>DEMO GESTURE SIMULATION HUD</span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
          MANUAL OVERRIDE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {DEMO_BUTTONS.map(({ id, label, icon: Icon, color }) => {
          const isActive = activeGesture === id;
          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSimulateGesture(id)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r ' + color + ' border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] text-white scale-105'
                  : 'bg-slate-950/80 border-slate-800 hover:border-purple-500/50 text-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white animate-bounce' : 'text-purple-400'}`} />
              <span className="text-xs font-mono font-bold text-center leading-tight">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
