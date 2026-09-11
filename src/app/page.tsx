'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  AppStage,
  PlayerId,
  ChatMessageItem,
  LiveLegState,
  GestureId,
  LegPoseData,
  AppStats,
} from '../types';
import { GESTURE_DICTIONARY } from '../config/gestures';
import { PoseGestureAnalyzer } from '../utils/poseAnalyzer';
import { UselessnessEngine } from '../utils/uselessnessEngine';

import LandingPage from '../components/LandingPage';
import Calibration from '../components/Calibration';
import PlayerSetup from '../components/PlayerSetup';
import CameraView from '../components/CameraView';
import DemoControls from '../components/DemoControls';
import ProcessingAnimation from '../components/ProcessingAnimation';
import ChatWindow from '../components/ChatWindow';
import LiveStatusPanel from '../components/LiveStatusPanel';
import AIStatus from '../components/AIStatus';
import UselessnessMeter from '../components/UselessnessMeter';
import ConfirmationModal from '../components/ConfirmationModal';
import ResultsScreen from '../components/ResultsScreen';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('LANDING');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerId>('PLAYER_1');
  const [roomCode, setRoomCode] = useState<string>('LEG-8821');
  const [useCameraMode, setUseCameraMode] = useState<boolean>(true);

  // Engines
  const poseAnalyzerRef = useRef<PoseGestureAnalyzer>(new PoseGestureAnalyzer());
  const uselessnessEngineRef = useRef<UselessnessEngine>(new UselessnessEngine());

  // Chat & HUD States
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [liveLegState, setLiveLegState] = useState<LiveLegState>({
    leftLegDetected: true,
    leftLegRaised: false,
    rightLegDetected: true,
    rightLegRaised: false,
    poseConfidence: 94,
    activeGesture: null,
    activeGestureName: null,
    activeTranslation: null,
    isMovingQuickly: false,
    bothLegsHeldDuration: 0,
  });

  const [processingGesture, setProcessingGesture] = useState<GestureId | null>(null);
  const [uselessnessScore, setUselessnessScore] = useState<number>(68);
  const [systemNotification, setSystemNotification] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [finalStats, setFinalStats] = useState<AppStats | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Dual Window Sync via BroadcastChannel
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel(`LEGS_CHAT_${roomCode}`);
      channelRef.current = channel;

      channel.onmessage = (event) => {
        if (event.data && event.data.type === 'NEW_MESSAGE') {
          const newMsg: ChatMessageItem = event.data.message;
          setMessages((prev) => [...prev, newMsg]);
          setUselessnessScore(event.data.newScore);
        }
      };

      return () => {
        channel.close();
      };
    }
  }, [roomCode]);

  // Handle pose updates from webcam feed
  const handlePoseUpdate = useCallback((pose: LegPoseData) => {
    const { liveState, triggeredGesture } = poseAnalyzerRef.current.analyze(pose);
    setLiveLegState(liveState);

    if (triggeredGesture && !processingGesture && stage === 'CHAT') {
      // Occasionally show funny confirmation modal
      if (Math.random() < 0.12 && !showConfirmation) {
        setShowConfirmation(true);
      }
      setProcessingGesture(triggeredGesture);
    }
  }, [processingGesture, stage, showConfirmation]);

  // Trigger manual simulation gesture in Demo Mode
  const handleSimulateGesture = useCallback((gestureId: GestureId) => {
    if (processingGesture || stage !== 'CHAT') return;
    
    // Simulate live leg state changes for Demo Controls
    const isLeft = gestureId === 'LEFT_LEG_UP' || gestureId === 'BOTH_LEGS_UP' || gestureId === 'HOLD_BOTH_LEGS_UP';
    const isRight = gestureId === 'RIGHT_LEG_UP' || gestureId === 'BOTH_LEGS_UP' || gestureId === 'HOLD_BOTH_LEGS_UP';

    setLiveLegState((prev) => ({
      ...prev,
      leftLegRaised: isLeft,
      rightLegRaised: isRight,
      activeGesture: gestureId,
      activeGestureName: gestureId.replace(/_/g, ' '),
    }));

    if (Math.random() < 0.15 && !showConfirmation) {
      setShowConfirmation(true);
    }
    setProcessingGesture(gestureId);
  }, [processingGesture, stage, showConfirmation]);

  // Complete gesture translation animation
  const handleProcessingComplete = useCallback((messageText: string) => {
    if (!processingGesture) return;

    const newScore = uselessnessEngineRef.current.incrementForGesture();
    setUselessnessScore(newScore);

    const senderName = selectedPlayer === 'PLAYER_1' ? 'PLAYER 1 🦵' : 'PLAYER 2 🦵';
    const senderAvatar = selectedPlayer === 'PLAYER_1' ? '🦵' : '🦵';

    const newMessage: ChatMessageItem = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      sender: selectedPlayer,
      senderName,
      senderAvatar,
      text: messageText,
      gestureId: processingGesture,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      uselessnessIncrement: Math.floor(Math.random() * 4) + 3,
    };

    setMessages((prev) => [...prev, newMessage]);
    setProcessingGesture(null);

    // Broadcast message to second tab/window
    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'NEW_MESSAGE',
        message: newMessage,
        newScore,
      });
    }

    // Toggle player turn automatically for single device demo convenience
    setSelectedPlayer((prev) => (prev === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1'));

    // Random system notification event
    if (Math.random() > 0.45) {
      const eventText = uselessnessEngineRef.current.getRandomSystemEvent();
      setSystemNotification(eventText);
      setTimeout(() => setSystemNotification(null), 3500);
    }
  }, [processingGesture, selectedPlayer]);

  const handleEndConversation = () => {
    const stats = uselessnessEngineRef.current.generateStats(messages.length, startTimeRef.current);
    setFinalStats(stats);
    setStage('RESULTS');
  };

  const handleRestart = () => {
    poseAnalyzerRef.current.reset();
    uselessnessEngineRef.current = new UselessnessEngine();
    setMessages([]);
    setUselessnessScore(68);
    setProcessingGesture(null);
    setSystemNotification(null);
    setShowConfirmation(false);
    setFinalStats(null);
    startTimeRef.current = Date.now();
    setStage('LANDING');
  };

  return (
    <main className="min-h-screen bg-[#070712] text-white selection:bg-purple-500 selection:text-white">
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Landing Page */}
        {stage === 'LANDING' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onStart={() => setStage('CALIBRATION')} />
          </motion.div>
        )}

        {/* Stage 2: Calibration */}
        {stage === 'CALIBRATION' && (
          <motion.div key="calibration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Calibration onComplete={() => setStage('PLAYER_SETUP')} />
          </motion.div>
        )}

        {/* Stage 3: Player & Room Setup */}
        {stage === 'PLAYER_SETUP' && (
          <motion.div key="player_setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PlayerSetup
              selectedPlayer={selectedPlayer}
              onSelectPlayer={setSelectedPlayer}
              roomCode={roomCode}
              onSetRoomCode={setRoomCode}
              onContinue={(cameraMode) => {
                setUseCameraMode(cameraMode);
                setStage('CHAT');
              }}
            />
          </motion.div>
        )}

        {/* Stage 4: Chat Interface & HUD Scanner */}
        {stage === 'CHAT' && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 md:p-6 min-h-screen flex flex-col max-w-7xl mx-auto space-y-4">
            
            {/* Top Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
              
              {/* Left Column: Vision / Demo HUD */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                {useCameraMode ? (
                  <CameraView
                    onPoseUpdate={handlePoseUpdate}
                    onCameraError={() => setUseCameraMode(false)}
                  />
                ) : (
                  <div className="w-full aspect-video bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                    <div className="flex justify-between items-center z-10 font-mono text-xs">
                      <span className="bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40 font-bold">
                        ⚡ SYNTHETIC DEMO SKELETON
                      </span>
                      <span className="text-slate-400">FPS: 60</span>
                    </div>

                    {/* Virtual Skeleton Graphic */}
                    <div className="flex flex-col items-center justify-center my-auto py-2">
                      <div className="text-4xl animate-bounce">🦵</div>
                      <p className="text-xs font-mono text-cyan-400 mt-2 font-bold">
                        ACTIVE GESTURE: {liveLegState.activeGesture ? liveLegState.activeGesture.replace(/_/g, ' ') : 'NEUTRAL'}
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 text-center z-10">
                      Use the simulator buttons below to trigger leg gestures!
                    </div>
                  </div>
                )}

                {/* Always Available Demo Control Board */}
                <DemoControls
                  onSimulateGesture={handleSimulateGesture}
                  activeGesture={liveLegState.activeGesture}
                />

                {/* Real-time Scanner telemetry */}
                <LiveStatusPanel state={liveLegState} />
              </div>

              {/* Right Column: Chat Window & Uselessness Gauge */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* AI Commentary & Uselessness Header Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AIStatus />
                  <UselessnessMeter score={uselessnessScore} />
                </div>

                {/* Main Chat Stream */}
                <div className="flex-1 min-h-[450px]">
                  <ChatWindow
                    messages={messages}
                    currentPlayer={selectedPlayer}
                    roomCode={roomCode}
                    useCameraMode={useCameraMode}
                    onToggleCameraMode={() => setUseCameraMode(!useCameraMode)}
                    onEndConversation={handleEndConversation}
                    systemNotification={systemNotification}
                  />
                </div>
              </div>
            </div>

            {/* Gesture Processing Animation Overlay */}
            {processingGesture && (
              <ProcessingAnimation
                gestureId={processingGesture}
                onComplete={handleProcessingComplete}
              />
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
              <ConfirmationModal onConfirm={() => setShowConfirmation(false)} />
            )}

          </motion.div>
        )}

        {/* Stage 5: End Screen & Statistics Report */}
        {stage === 'RESULTS' && finalStats && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen stats={finalStats} onRestart={handleRestart} />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
