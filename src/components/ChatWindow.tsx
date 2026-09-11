'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, LogOut, Camera, Play, Sparkles, Hash, Users } from 'lucide-react';
import { ChatMessageItem, PlayerId } from '../types';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: ChatMessageItem[];
  currentPlayer: PlayerId;
  roomCode: string;
  useCameraMode: boolean;
  onToggleCameraMode: () => void;
  onEndConversation: () => void;
  systemNotification: string | null;
}

export default function ChatWindow({
  messages,
  currentPlayer,
  roomCode,
  useCameraMode,
  onToggleCameraMode,
  onEndConversation,
  systemNotification,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, systemNotification]);

  return (
    <div className="flex flex-col h-full bg-slate-900/80 border border-purple-500/30 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Header Bar */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-950 border border-purple-500/40 rounded-xl text-purple-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-base">LEGS CHAT ROOM</h3>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
                <Hash className="w-3 h-3" /> {roomCode}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              You are: <span className="text-cyan-300 font-bold">{currentPlayer.replace('_', ' ')} 🦵</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCameraMode}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {useCameraMode ? (
              <>
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WEBCAM MODE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">DEMO MODE</span>
              </>
            )}
          </button>

          <button
            onClick={onEndConversation}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/80 border border-red-500/40 hover:bg-red-900/80 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>FINISH CHAT</span>
          </button>
        </div>
      </div>

      {/* System Event Banner */}
      <AnimatePresence>
        {systemNotification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-950/60 border-b border-purple-500/30 px-4 py-2 text-center text-xs font-mono text-purple-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
            <span>SYSTEM ALERT: &quot;{systemNotification}&quot;</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6 text-slate-500">
            <div className="w-16 h-16 rounded-full bg-purple-950/30 border border-purple-500/20 flex items-center justify-center text-3xl">
              🦵
            </div>
            <p className="text-sm font-mono text-slate-400">
              No leg messages exchanged yet. Raise a leg to send your first message!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isSelf={msg.sender === currentPlayer}
            />
          ))
        )}
      </div>
    </div>
  );
}
