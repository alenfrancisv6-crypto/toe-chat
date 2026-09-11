'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Share2, RefreshCw, Copy, Check, Flame, Activity, Zap, Cpu } from 'lucide-react';
import { AppStats } from '../types';

interface ResultsScreenProps {
  stats: AppStats;
  onRestart: () => void;
}

export default function ResultsScreen({ stats, onRestart }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger confetti on render
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#06b6d4', '#3b82f6'],
    });
  }, []);

  const shareText = `I just communicated with another human using my legs! 🦵💬\nMessages: ${stats.messagesExchanged} | Efficiency: ${stats.communicationEfficiency}% | Uselessness: ${stats.uselessnessScore}%\n#Useless30 #LegsChat`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LEGS CHAT Result',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share error or cancelled', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#070712] text-white">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full bg-slate-900/80 border border-purple-500/40 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl space-y-8 my-auto"
      >
        {/* Header Badge & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Trophy className="w-4 h-4 text-pink-400" />
            <span>USELESS 3.0 HACKATHON REPORT</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            CONVERSATION COMPLETE
          </h1>

          <p className="text-sm text-slate-300">
            Here is your detailed leg communication efficiency metric analysis.
          </p>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-950/60 border border-purple-500/40 rounded-2xl p-4 text-center space-y-1">
            <span className="text-[11px] font-mono text-purple-300 uppercase">COMMUNICATION EFFICIENCY</span>
            <p className="text-3xl md:text-4xl font-extrabold text-cyan-300">{stats.communicationEfficiency}%</p>
            <span className="text-[10px] text-slate-400 font-mono">Theoretical Minimum</span>
          </div>

          <div className="bg-pink-950/60 border border-pink-500/40 rounded-2xl p-4 text-center space-y-1">
            <span className="text-[11px] font-mono text-pink-300 uppercase">USELESSNESS SCORE</span>
            <p className="text-3xl md:text-4xl font-extrabold text-pink-400">{stats.uselessnessScore}%</p>
            <span className="text-[10px] text-slate-400 font-mono">Near Perfection</span>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-3 font-mono text-xs">
          <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
            TELEMETRY BREAKDOWN
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Messages Exchanged:</span>
              <span className="font-bold text-cyan-300">{stats.messagesExchanged}</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Leg Movements:</span>
              <span className="font-bold text-purple-300">{stats.legMovementsCount}</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Gestures Misunderstood:</span>
              <span className="font-bold text-pink-300">{stats.gesturesMisunderstood}</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Artificial Delays:</span>
              <span className="font-bold text-amber-300">{stats.artificialDelaysCount}</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Life Choices Questioned:</span>
              <span className="font-bold text-rose-400">{stats.lifeChoicesQuestioned}</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl">
              <span>Useful Info Exchanged:</span>
              <span className="font-bold text-emerald-400">{stats.usefulInfoBytes} bytes</span>
            </div>
          </div>
        </div>

        {/* Comical Verdict Box */}
        <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/70 border border-purple-500/40 rounded-2xl p-6 text-center space-y-2">
          <p className="text-lg md:text-xl font-bold text-purple-200">
            Congratulations.
          </p>
          <p className="text-sm text-slate-300">
            You spent several minutes talking with your legs in the air.
          </p>
          <p className="text-base font-extrabold text-cyan-300">
            You could have just used WhatsApp.
          </p>
        </div>

        {/* Buttons: TRY AGAIN / SHARE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            <span>TRY AGAIN</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white font-bold text-sm backdrop-blur-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5 text-cyan-400" />}
            <span>{copied ? 'RESULT COPIED!' : 'SHARE RESULT'}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
