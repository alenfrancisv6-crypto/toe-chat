export type AppStage = 
  | 'LANDING'
  | 'CALIBRATION'
  | 'PLAYER_SETUP'
  | 'CHAT'
  | 'RESULTS';

export type PlayerId = 'PLAYER_1' | 'PLAYER_2';

export interface PoseKeypoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  confidence: number;
}

export interface LegPoseData {
  leftHip?: PoseKeypoint;
  leftKnee?: PoseKeypoint;
  leftAnkle?: PoseKeypoint;
  rightHip?: PoseKeypoint;
  rightKnee?: PoseKeypoint;
  rightAnkle?: PoseKeypoint;
  timestamp: number;
}

export type GestureId = 
  | 'LEFT_LEG_UP'
  | 'RIGHT_LEG_UP'
  | 'BOTH_LEGS_UP'
  | 'BOTH_LEGS_DOWN'
  | 'LEFT_TO_RIGHT'
  | 'RIGHT_TO_LEFT'
  | 'BOTH_LEGS_MOVE'
  | 'HOLD_BOTH_LEGS_UP';

export interface GestureDefinition {
  id: GestureId;
  name: string;
  message: string;
  description: string;
  iconName: string;
  easterEgg?: string;
  minDurationMs?: number;
}

export interface ChatMessageItem {
  id: string;
  sender: PlayerId;
  senderName: string;
  senderAvatar: string;
  text: string;
  gestureId: GestureId;
  timestamp: string;
  uselessnessIncrement: number;
}

export interface LiveLegState {
  leftLegDetected: boolean;
  leftLegRaised: boolean;
  rightLegDetected: boolean;
  rightLegRaised: boolean;
  poseConfidence: number; // 0 to 100%
  activeGesture: GestureId | null;
  activeGestureName: string | null;
  activeTranslation: string | null;
  isMovingQuickly: boolean;
  bothLegsHeldDuration: number; // ms
}

export interface AppStats {
  messagesExchanged: number;
  legMovementsCount: number;
  gesturesMisunderstood: number;
  artificialDelaysCount: number;
  lifeChoicesQuestioned: number;
  usefulInfoBytes: number;
  communicationEfficiency: number; // %
  uselessnessScore: number; // %
  startTime: number;
}
