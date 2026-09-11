import { GestureId, LegPoseData, LiveLegState } from '../types';

export class PoseGestureAnalyzer {
  private lastTriggeredGesture: GestureId | null = null;
  private lastTriggerTime: number = 0;
  private cooldownMs: number = 2200; // Cooldown after a message is triggered
  private bothLegsUpStartTime: number | null = null;
  private poseHistory: LegPoseData[] = [];
  private historyMaxLength: number = 15;

  /**
   * Analyze raw leg keypoints and calculate live state & detected gesture ID
   */
  public analyze(pose: LegPoseData): {
    liveState: LiveLegState;
    triggeredGesture: GestureId | null;
  } {
    const now = Date.now();

    // Store pose history for velocity and sequence detection
    this.poseHistory.push(pose);
    if (this.poseHistory.length > this.historyMaxLength) {
      this.poseHistory.shift();
    }

    const { leftHip, leftKnee, leftAnkle, rightHip, rightKnee, rightAnkle } = pose;

    // Check keypoint presence
    const leftLegDetected = Boolean(leftHip && leftKnee && leftAnkle && leftAnkle.confidence > 0.3);
    const rightLegDetected = Boolean(rightHip && rightKnee && rightAnkle && rightAnkle.confidence > 0.3);

    // Calculate pose confidence
    let confidenceSum = 0;
    let count = 0;
    [leftHip, leftKnee, leftAnkle, rightHip, rightKnee, rightAnkle].forEach(pt => {
      if (pt) {
        confidenceSum += pt.confidence;
        count++;
      }
    });
    const poseConfidence = count > 0 ? Math.round((confidenceSum / count) * 100) : 0;

    // Determine if leg is raised (in Y coordinates, 0 is top of image, so smaller Y = higher up)
    const leftLegRaised = Boolean(
      leftLegDetected &&
      leftAnkle &&
      leftHip &&
      (leftAnkle.y < leftHip.y + 0.1 || (leftKnee && leftAnkle.y < leftKnee.y))
    );

    const rightLegRaised = Boolean(
      rightLegDetected &&
      rightAnkle &&
      rightHip &&
      (rightAnkle.y < rightHip.y + 0.1 || (rightKnee && rightAnkle.y < rightKnee.y))
    );

    // Velocity / rapid motion check
    const isMovingQuickly = this.detectRapidMovement();

    // Track both legs held up duration
    if (leftLegRaised && rightLegRaised) {
      if (!this.bothLegsUpStartTime) {
        this.bothLegsUpStartTime = now;
      }
    } else {
      this.bothLegsUpStartTime = null;
    }

    const bothLegsHeldDuration = this.bothLegsUpStartTime ? now - this.bothLegsUpStartTime : 0;

    // Determine current instantaneous candidate gesture
    let candidateGesture: GestureId = 'BOTH_LEGS_DOWN';

    if (bothLegsHeldDuration >= 2500) {
      candidateGesture = 'HOLD_BOTH_LEGS_UP';
    } else if (isMovingQuickly && (leftLegRaised || rightLegRaised)) {
      candidateGesture = 'BOTH_LEGS_MOVE';
    } else if (this.detectSequence('LEFT_TO_RIGHT')) {
      candidateGesture = 'LEFT_TO_RIGHT';
    } else if (this.detectSequence('RIGHT_TO_LEFT')) {
      candidateGesture = 'RIGHT_TO_LEFT';
    } else if (leftLegRaised && rightLegRaised) {
      candidateGesture = 'BOTH_LEGS_UP';
    } else if (leftLegRaised) {
      candidateGesture = 'LEFT_LEG_UP';
    } else if (rightLegRaised) {
      candidateGesture = 'RIGHT_LEG_UP';
    } else {
      candidateGesture = 'BOTH_LEGS_DOWN';
    }

    // Cooldown and debouncing logic
    let triggeredGesture: GestureId | null = null;
    const timeSinceLastTrigger = now - this.lastTriggerTime;

    if (candidateGesture !== 'BOTH_LEGS_DOWN') {
      if (
        (this.lastTriggeredGesture !== candidateGesture || timeSinceLastTrigger > this.cooldownMs) &&
        timeSinceLastTrigger > 1200
      ) {
        triggeredGesture = candidateGesture;
        this.lastTriggeredGesture = candidateGesture;
        this.lastTriggerTime = now;
      }
    } else {
      // Reset last triggered gesture when legs go down
      this.lastTriggeredGesture = null;
    }

    const liveState: LiveLegState = {
      leftLegDetected,
      leftLegRaised,
      rightLegDetected,
      rightLegRaised,
      poseConfidence,
      activeGesture: candidateGesture,
      activeGestureName: candidateGesture.replace(/_/g, ' '),
      activeTranslation: null,
      isMovingQuickly,
      bothLegsHeldDuration,
    };

    return { liveState, triggeredGesture };
  }

  /**
   * Detect rapid leg movement (shaking / bicycling)
   */
  private detectRapidMovement(): boolean {
    if (this.poseHistory.length < 6) return false;
    let totalVelocity = 0;
    for (let i = 1; i < this.poseHistory.length; i++) {
      const prev = this.poseHistory[i - 1];
      const curr = this.poseHistory[i];
      if (prev.leftAnkle && curr.leftAnkle) {
        const dx = curr.leftAnkle.x - prev.leftAnkle.x;
        const dy = curr.leftAnkle.y - prev.leftAnkle.y;
        totalVelocity += Math.sqrt(dx * dx + dy * dy);
      }
      if (prev.rightAnkle && curr.rightAnkle) {
        const dx = curr.rightAnkle.x - prev.rightAnkle.x;
        const dy = curr.rightAnkle.y - prev.rightAnkle.y;
        totalVelocity += Math.sqrt(dx * dx + dy * dy);
      }
    }
    return totalVelocity > 0.45;
  }

  /**
   * Detect dynamic left-to-right or right-to-left horizontal sweeping gesture
   */
  private detectSequence(type: 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT'): boolean {
    if (this.poseHistory.length < 8) return false;
    const first = this.poseHistory[0];
    const last = this.poseHistory[this.poseHistory.length - 1];

    if (type === 'LEFT_TO_RIGHT') {
      const leftAnkleMove = (last.leftAnkle?.x ?? 0) - (first.leftAnkle?.x ?? 0);
      const rightAnkleMove = (last.rightAnkle?.x ?? 0) - (first.rightAnkle?.x ?? 0);
      return leftAnkleMove > 0.18 || rightAnkleMove > 0.18;
    } else {
      const leftAnkleMove = (first.leftAnkle?.x ?? 0) - (last.leftAnkle?.x ?? 0);
      const rightAnkleMove = (first.rightAnkle?.x ?? 0) - (last.rightAnkle?.x ?? 0);
      return leftAnkleMove > 0.18 || rightAnkleMove > 0.18;
    }
  }

  public reset() {
    this.lastTriggeredGesture = null;
    this.lastTriggerTime = 0;
    this.bothLegsUpStartTime = null;
    this.poseHistory = [];
  }
}
