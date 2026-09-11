'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, Camera, Play, Sparkles, Hash } from 'lucide-react';
import { PlayerId } from '../types';

interface PlayerSetupProps {
  selectedPlayer: PlayerId;
  onSelectPlayer: (player: PlayerId) => void;
  roomCode: string;
  onSetRoomCode: (code: string) => void;
  onContinue: (useCameraMode: boolean) => void;
}

export default function PlayerSetup({
  selectedPlayer,
  onSelectPlayer,
  roomCode,
  onSetRoomCode,
  onContinue,
}: PlayerSetupProps) {
  const [inputCode, setInputCode] = useState(roomCode);
  const [copied, setCopied] = useState(false);

  const generateNewRoom = () => {
    const newCode = 'LEG-' + Math.floor(1000 + Math.random() * 9000);
    setInputCode(newCode);
    onSetRoomCode(newCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#070712] text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            SELECT PLAYER & ROOM
          </h2>
          <p className="text-sm text-slate-300">
            Choose your identity and pair with a friend or use a single device.
          </p>
        </div>

        {/* Player Selection Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectPlayer('PLAYER_1')}
            className={`cursor-pointer rounded-2xl p-5 border flex flex-col items-center gap-3 transition-all ${
              selectedPlayer === 'PLAYER_1'
                ? 'bg-purple-950/80 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                : 'bg-slate-950/50 border-slate-800 hover:border-purple-500/40 text-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-purple-900/50 border border-purple-400 flex items-center justify-center text-3xl">
              🦵
            </div>
            <div className="text-center">
              <h3 className="font-bold text-purple-300">PLAYER 1</h3>
              <span className="text-[11px] font-mono text-purple-400/80">Left Side Speaker</span>
            </div>
            {selectedPlayer === 'PLAYER_1' && (
              <span className="text-[10px] font-mono bg-purple-500 text-white px-2 py-0.5 rounded-full">ACTIVE</span>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectPlayer('PLAYER_2')}
            className={`cursor-pointer rounded-2xl p-5 border flex flex-col items-center gap-3 transition-all ${
              selectedPlayer === 'PLAYER_2'
                ? 'bg-pink-950/80 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.4)]'
                : 'bg-slate-950/50 border-slate-800 hover:border-pink-500/40 text-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-pink-900/50 border border-pink-400 flex items-center justify-center text-3xl">
              🦵
            </div>
            <div className="text-center">
              <h3 className="font-bold text-pink-300">PLAYER 2</h3>
              <span className="text-[11px] font-mono text-pink-400/80">Right Side Speaker</span>
            </div>
            {selectedPlayer === 'PLAYER_2' && (
              <span className="text-[10px] font-mono bg-pink-500 text-white px-2 py-0.5 rounded-full">ACTIVE</span>
            )}
          </motion.div>
        </div>

        {/* Room Sync Box */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Hash className="w-4 h-4" /> ROOM SYNC CODE
            </span>
            <button
              onClick={generateNewRoom}
              className="text-purple-400 hover:underline cursor-pointer"
            >
              Generate New
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setInputCode(val);
                onSetRoomCode(val);
              }}
              placeholder="e.g. LEG-1234"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-lg font-bold tracking-widest text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-xs font-mono text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Open another browser tab with this room code to chat between two screens in real time!
          </p>
        </div>

        {/* Action Buttons: Camera vs Demo Mode */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => onContinue(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>START WITH WEBCAM POSE DETECTION</span>
          </button>

          <button
            onClick={() => onContinue(false)}
            className="w-full py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-500/60 text-slate-300 hover:text-white font-bold text-sm backdrop-blur-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>ENTER DEMO MODE (NO CAMERA NEEDED)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
