import React, { useState } from 'react';
import { 
  Trophy, 
  Flag, 
  CheckCircle2, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  AlertCircle 
} from 'lucide-react';
import { CtfChallenge, UserStats } from '../types';
import { mockCtfChallenges } from '../data/mockData';

interface CtfChallengeArenaProps {
  stats: UserStats;
  onBackToDashboard: () => void;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const CtfChallengeArena: React.FC<CtfChallengeArenaProps> = ({
  stats,
  onBackToDashboard,
  onUpdateStats,
}) => {
  const [challenges, setChallenges] = useState<CtfChallenge[]>(mockCtfChallenges);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  const [feedbackState, setFeedbackState] = useState<{ [key: string]: { success?: boolean; message?: string } }>({});
  const [revealedHints, setRevealedHints] = useState<{ [key: string]: boolean }>({});

  const filteredChallenges = challenges.filter(c => 
    selectedCategory === 'ALL' || c.category === selectedCategory
  );

  const solvedCount = challenges.filter(c => c.isSolved).length;
  const totalPointsEarned = challenges.filter(c => c.isSolved).reduce((acc, c) => acc + c.points, 0);

  const handleInputChange = (challengeId: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [challengeId]: val }));
  };

  const handleToggleHint = (challengeId: string) => {
    setRevealedHints(prev => ({ ...prev, [challengeId]: !prev[challengeId] }));
  };

  const handleSubmitFlag = (challenge: CtfChallenge) => {
    const inputFlag = (userInputs[challenge.id] || '').trim();
    if (!inputFlag) {
      setFeedbackState(prev => ({
        ...prev,
        [challenge.id]: { success: false, message: 'Please enter a flag before submitting.' }
      }));
      return;
    }

    const isCorrect = inputFlag === challenge.correctFlag;

    if (isCorrect) {
      // Mark as solved
      setChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, isSolved: true } : c));
      setFeedbackState(prev => ({
        ...prev,
        [challenge.id]: { success: true, message: `Correct! Flag validated successfully. +${challenge.points} XP earned.` }
      }));

      // Update user stats
      onUpdateStats({
        xp: stats.xp + challenge.points,
        securityScore: Math.min(100, stats.securityScore + 4),
        modulesCompleted: Math.min(stats.totalModules, stats.modulesCompleted + 1)
      });
    } else {
      setFeedbackState(prev => ({
        ...prev,
        [challenge.id]: { success: false, message: 'Incorrect flag. Double-check your decoding or analysis and try again.' }
      }));
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 max-w-[1700px] mx-auto select-none overflow-y-auto">
      
      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1c38] via-[#091428] to-[#0d1c38] border border-[#19c7f3]/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(25,199,243,0.15)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#142646] border border-[#19c7f3]/60 flex items-center justify-center text-[#19c7f3]">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold uppercase">
                GAMIFIED PUZZLE ARENA
              </span>
              <span className="text-xs font-mono-tech text-slate-400">Capture The Flag (CTF)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold font-display text-white mt-0.5">
              CyberFortress CTF Challenges
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-3">
            <Flag className="w-4 h-4 text-[#20d6a1]" />
            <div>
              <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Solved</span>
              <span className="text-sm font-mono-tech font-bold text-white">{solvedCount} / {challenges.length}</span>
            </div>
          </div>

          <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#19c7f3]" />
            <div>
              <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">CTF Points</span>
              <span className="text-sm font-mono-tech font-bold text-[#19c7f3]">+{totalPointsEarned} XP</span>
            </div>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-[#0b162c] hover:bg-[#122344] border border-[#1a335c] text-slate-200 font-mono-tech text-xs transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* CATEGORY FILTER BAR */}
      <div className="flex flex-wrap items-center gap-2 bg-[#070e1e] p-3 rounded-xl border border-[#172d56]">
        <span className="text-xs font-mono-tech text-slate-400 mr-2 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#19c7f3]" /> Filter Category:
        </span>
        {['ALL', 'Cryptography', 'Log Forensics', 'Phishing Analysis', 'Security Quiz'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-all ${selectedCategory === cat ? 'bg-[#19c7f3] text-[#050a14] shadow-[0_0_15px_rgba(25,199,243,0.4)]' : 'bg-[#0b162c] text-slate-300 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CHALLENGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map(challenge => {
          const feedback = feedbackState[challenge.id];
          const showHint = revealedHints[challenge.id];

          const diffColor = 
            challenge.difficulty === 'Beginner' ? 'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40' :
            challenge.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
            'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40';

          return (
            <div 
              key={challenge.id} 
              className={`bg-[#070e1e] border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all ${challenge.isSolved ? 'border-[#20d6a1]/60 shadow-[0_0_20px_rgba(32,214,161,0.15)]' : 'border-[#172d56]'}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-mono-tech font-bold uppercase ${diffColor}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#19c7f3] bg-[#19c7f3]/10 px-2 py-0.5 rounded border border-[#19c7f3]/30 font-bold">
                        {challenge.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">{challenge.title}</h3>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#091224] border border-[#172d56] px-3 py-1.5 rounded-xl shrink-0">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono-tech font-bold text-amber-400">+{challenge.points} pts</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans mb-4">{challenge.description}</p>

                {/* Challenge Prompt Box */}
                <div className="bg-[#050a14] border border-[#1b2c4e] rounded-xl p-3.5 mb-4 font-mono-tech text-xs text-[#19c7f3] whitespace-pre-wrap">
                  {challenge.prompt}
                </div>
              </div>

              <div className="space-y-3">
                {/* Hint Toggle */}
                <div>
                  <button
                    onClick={() => handleToggleHint(challenge.id)}
                    className="text-[11px] font-mono-tech text-slate-400 hover:text-[#19c7f3] flex items-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showHint ? 'Hide Hint' : 'Need a hint?'}
                  </button>
                  {showHint && (
                    <div className="mt-2 p-2.5 rounded-lg bg-[#0b162c] border border-amber-500/30 text-amber-300 text-[11px] font-mono-tech">
                      💡 <strong>Hint:</strong> {challenge.hint}
                    </div>
                  )}
                </div>

                {/* Flag Input / Solved Status */}
                {challenge.isSolved ? (
                  <div className="bg-[#20d6a1]/10 border border-[#20d6a1]/30 rounded-xl p-3.5 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#20d6a1] shrink-0" />
                    <div>
                      <span className="text-xs font-mono-tech font-bold text-[#20d6a1] block">Challenge Solved!</span>
                      <span className="text-[11px] text-slate-300 font-sans">{challenge.explanation}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter flag format: CS{...}"
                        value={userInputs[challenge.id] || ''}
                        onChange={(e) => handleInputChange(challenge.id, e.target.value)}
                        className="flex-1 bg-[#050a14] border border-[#1b2c4e] rounded-xl px-3.5 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-[#19c7f3]"
                      />
                      <button
                        onClick={() => handleSubmitFlag(challenge)}
                        className="px-4 py-2 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech text-xs font-bold shadow-[0_0_15px_rgba(25,199,243,0.4)] transition-all"
                      >
                        Submit Flag
                      </button>
                    </div>

                    {feedback && (
                      <div className={`p-2.5 rounded-xl text-xs font-mono-tech border flex items-center gap-2 ${feedback.success ? 'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40' : 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40'}`}>
                        {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                        <span>{feedback.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
