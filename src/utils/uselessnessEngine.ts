import { AppStats } from '../types';
import { FUNNY_SYSTEM_EVENTS } from '../config/gestures';

export class UselessnessEngine {
  private score: number = 68; // Base baseline ridiculous uselessness score
  private legMovements: number = 0;
  private artificialDelays: number = 0;
  private gesturesMisunderstood: number = 0;
  private lifeChoicesQuestioned: number = 0;

  public incrementForGesture(): number {
    this.legMovements += Math.floor(Math.random() * 3) + 2;
    this.score = Math.min(100, this.score + Math.floor(Math.random() * 4) + 3);
    if (Math.random() > 0.6) {
      this.gesturesMisunderstood += 1;
    }
    if (Math.random() > 0.7) {
      this.lifeChoicesQuestioned += 1;
    }
    return this.score;
  }

  public incrementForDelay(): number {
    this.artificialDelays += 1;
    this.score = Math.min(100, this.score + 2);
    return this.score;
  }

  public getScore(): number {
    return this.score;
  }

  public getRandomSystemEvent(): string {
    const idx = Math.floor(Math.random() * FUNNY_SYSTEM_EVENTS.length);
    return FUNNY_SYSTEM_EVENTS[idx];
  }

  public generateStats(messagesCount: number, startTimeMs: number): AppStats {
    const totalLegMovements = Math.max(messagesCount * 4, this.legMovements);
    const efficiency = Math.max(0.4, Number((100 - this.score * 0.96).toFixed(1)));
    
    return {
      messagesExchanged: messagesCount,
      legMovementsCount: totalLegMovements,
      gesturesMisunderstood: Math.max(2, this.gesturesMisunderstood + Math.floor(messagesCount * 0.4)),
      artificialDelaysCount: Math.max(3, this.artificialDelays + Math.floor(messagesCount * 0.6)),
      lifeChoicesQuestioned: Math.max(1, this.lifeChoicesQuestioned + Math.floor(messagesCount * 0.3)),
      usefulInfoBytes: 0,
      communicationEfficiency: efficiency,
      uselessnessScore: this.score,
      startTime: startTimeMs,
    };
  }
}
