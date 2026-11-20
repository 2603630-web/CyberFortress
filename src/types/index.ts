export type ModuleId = 
  | 'dashboard' 
  | 'phishing' 
  | 'attack-defense' 
  | 'password' 
  | 'mfa' 
  | 'soc' 
  | 'ctf' 
  | 'learning'
  | 'landing';

export interface UserStats {
  securityScore: number;
  modulesCompleted: number;
  totalModules: number;
  eventsAnalyzed: number;
  xp: number;
  blockedAttacks: number;
  threatLevel: string;
  cyberRisk: number;
  accuracy: number;
}

export interface PhishingEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  recipient: string;
  subject: string;
  date: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPhishing: boolean;
  category: string;
  bodyText: string;
  ctaText?: string;
  ctaTargetUrl?: string;
  realDisplayUrl?: string;
  indicators: string[];
  explanation: string;
  educationalTip: string;
  userDecision?: 'phishing' | 'legitimate';
  isCorrect?: boolean;
}

export interface SecurityEvent {
  id: string;
  time: string;
  type: string;
  sourceIp: string;
  target: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'OK';
  status: 'BLOCKED' | 'DETECTED' | 'REVIEWED' | 'RESOLVED';
  details: string;
}

export interface CtfTask {
  id: string;
  stageId: number;
  title: string;
  category: 'Cryptography' | 'Log Forensics' | 'Network Analysis' | 'Web Security' | 'Reverse Engineering' | 'OSINT' | 'Cloud Security' | 'Malware Analysis';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  description: string;
  prompt: string;
  hint: string;
  characterPersona: {
    name: string;
    role: string;
    avatarPosition: string; // CSS object-position for characters.jpg
    dialogue: string;
  };
  correctFlag: string;
  explanation: string;
  isSolved?: boolean;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface CtfStage {
  id: number;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationSeconds: number; // e.g. 600 seconds
  tasks: CtfTask[];
  isCompleted?: boolean;
  scoreEarned?: number;
  timeSpent?: number;
  totalCorrect?: number;
}

export interface CtfChallenge {
  id: string;
  title: string;
  category: 'Cryptography' | 'Log Forensics' | 'Phishing Analysis' | 'Security Quiz';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  description: string;
  prompt: string;
  hint: string;
  correctFlag: string;
  explanation: string;
  isSolved?: boolean;
}

export interface ModuleMetadata {
  id: ModuleId;
  title: string;
  shortDesc: string;
  iconName: string;
  badge: string;
  status: 'ACTIVE' | 'COMING_SOON';
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  overview: string;
  keyFeatures: string[];
}

