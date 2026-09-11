import { GestureDefinition, GestureId } from '../types';

export const GESTURE_DICTIONARY: Record<GestureId, GestureDefinition> = {
  LEFT_LEG_UP: {
    id: 'LEFT_LEG_UP',
    name: 'LEFT LEG UP',
    message: 'HELLO 👋',
    description: 'Raise your left leg into the air',
    iconName: 'ArrowUpLeft',
    easterEgg: 'Hello detected. This could have been much easier.',
  },
  RIGHT_LEG_UP: {
    id: 'RIGHT_LEG_UP',
    name: 'RIGHT LEG UP',
    message: 'HOW ARE YOU?',
    description: 'Raise your right leg into the air',
    iconName: 'ArrowUpRight',
    easterEgg: 'Asking how someone is doing via leg posture. Revolutionary.',
  },
  BOTH_LEGS_UP: {
    id: 'BOTH_LEGS_UP',
    name: 'BOTH LEGS UP',
    message: 'YES',
    description: 'Raise both legs straight up simultaneously',
    iconName: 'MoveUp',
    easterEgg: 'A powerful leg-based agreement.',
  },
  BOTH_LEGS_DOWN: {
    id: 'BOTH_LEGS_DOWN',
    name: 'BOTH LEGS DOWN',
    message: 'NO',
    description: 'Keep both legs down on the floor',
    iconName: 'MoveDown',
    easterEgg: 'Your legs have rejected the proposal.',
  },
  LEFT_TO_RIGHT: {
    id: 'LEFT_TO_RIGHT',
    name: 'LEFT → RIGHT',
    message: 'I HAVE SOMETHING TO SAY',
    description: 'Swing or wave leg from left to right',
    iconName: 'ArrowRight',
    easterEgg: 'Left to right motion. Speech request initialized via calf muscles.',
  },
  RIGHT_TO_LEFT: {
    id: 'RIGHT_TO_LEFT',
    name: 'RIGHT → LEFT',
    message: 'PLEASE WAIT',
    description: 'Swing or wave leg from right to left',
    iconName: 'ArrowLeft',
    easterEgg: 'Please wait. Your leg is buffering.',
  },
  BOTH_LEGS_MOVE: {
    id: 'BOTH_LEGS_MOVE',
    name: 'BOTH LEGS MOVING QUICKLY',
    message: 'THIS IS URGENT',
    description: 'Kicking or shaking both legs rapidly',
    iconName: 'Zap',
    easterEgg: 'Urgent bicycle legs motion detected!',
  },
  HOLD_BOTH_LEGS_UP: {
    id: 'HOLD_BOTH_LEGS_UP',
    name: 'HOLD BOTH LEGS UP',
    message: 'I REGRET EVERYTHING',
    description: 'Hold both legs suspended in air for over 2.5 seconds',
    iconName: 'AlertTriangle',
    easterEgg: 'Core muscles burning. Existential dread engaged.',
    minDurationMs: 2500,
  },
};

export const FUNNY_SYSTEM_EVENTS = [
  "Your leg is thinking...",
  "Communication detected. Unfortunately.",
  "This message could have been a text.",
  "Your left leg has entered the conversation.",
  "Please stop moving. The AI is confused.",
  "Analyzing approximately 14 pixels of leg.",
  "We have successfully made communication harder.",
  "AI Neural Net recalculating knee trajectory...",
  "Synthesizing calf muscle signal into internet packet...",
  "Why use 10 fingers when 2 legs do the trick?",
];

export const AI_STATUS_LIST = [
  "AI STATUS: CONFUSED",
  "AI STATUS: PRETENDING TO UNDERSTAND",
  "AI STATUS: LEG SPECIALIST",
  "AI STATUS: COMMUNICATION SUCCESSFUL",
  "AI STATUS: ADMIRING YOUR CALVES",
  "AI STATUS: OVERTHINKING THE KNEE ANGLE",
  "AI STATUS: WISHING YOU USED WHATSAPP",
];
