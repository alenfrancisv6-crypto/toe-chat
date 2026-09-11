'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessageItem } from '../types';
import { GESTURE_DICTIONARY } from '../config/gestures';

interface ChatMessageProps {
  message: ChatMessageItem;
  isSelf: boolean;
}

export default function ChatMessage({ message, isSelf }: ChatMessageProps) {
  const gestureDef = GESTURE_DICTIONARY[message.gestureId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} my-2 space-y-1`}
    >
      {/* Sender Header */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 px-1">
        <span className="font-bold text-slate-300">{message.senderName}</span>
        <span className="text-slate-500">• {message.timestamp}</span>
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl p-4 backdrop-blur-md shadow-lg border relative ${
          isSelf
            ? 'bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500/40 text-white rounded-br-none'
            : 'bg-gradient-to-r from-pink-950/80 to-slate-900/80 border-pink-500/40 text-white rounded-bl-none'
        }`}
      >
        <p className="text-base md:text-lg font-bold tracking-wide">{message.text}</p>

        {/* Gesture Badge */}
        {gestureDef && (
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono opacity-80">
            <span className="bg-black/30 px-2 py-0.5 rounded text-cyan-300">
              LEG GESTURE: {gestureDef.name}
            </span>
            <span className="text-pink-300">+{message.uselessnessIncrement}% Uselessness</span>
          </div>
        )}
      </div>

      {/* Easter Egg Reaction Comment */}
      {gestureDef?.easterEgg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-mono italic text-purple-300/80 px-2 pt-0.5"
        >
          💡 &quot;{gestureDef.easterEgg}&quot;
        </motion.p>
      )}
    </motion.div>
  );
}
