import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Clock,
  Play,
  RotateCcw,
  Award,
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';
import { CtfStage, CtfTask, UserStats } from '../types';
import { mockCtfStages } from '../data/mockCtfStages';

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
  const [stages, setStages] = useState<CtfStage[]>(() => 
    mockCtfStages.map(s => ({ ...s, tasks: s.tasks.map(t => ({ ...t, isSolved: false })) }))
  );
  const [activeStageId, setActiveStageId] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<{ [taskId: string]: string }>({});
  const [feedbackState, setFeedbackState] = useState<{ [taskId: string]: { success?: boolean; message?: string } }>({});
  const [revealedHints, setRevealedHints] = useState<{ [taskId: string]: boolean }>({});
  
  // Timer state per active stage
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
  // Submission results modal state
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [completedStageResult, setCompletedStageResult] = useState<{
    stageId: number;
    title: string;
    scoreEarned: number;
    totalPossible: number;
    correctCount: number;
    totalTasks: number;
    timeTakenSeconds: number;
  } | null>(null);

  const activeStage = stages.find(s => s.id === activeStageId);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (activeStageId !== null && timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeStageId, timerActive, timeLeft]);

  const handleStartStage = (stage: CtfStage) => {
    setActiveStageId(stage.id);
    setTimeLeft(stage.durationSeconds);
    setTimerActive(true);
    setShowResultsModal(false);
  };

  const handleBackToOverview = () => {
    setActiveStageId(null);
    setTimerActive(false);
    setShowResultsModal(false);
  };

  const handleInputChange = (taskId: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [taskId]: val }));
  };

  const handleToggleHint = (taskId: string) => {
    setRevealedHints(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleSubmitFlag = (task: CtfTask) => {
    const inputFlag = (userInputs[task.id] || '').trim();
    if (!inputFlag) {
      setFeedbackState(prev => ({
        ...prev,
        [task.id]: { success: false, message: 'Please enter a flag before submitting.' }
      }));
      return;
    }

    const isCorrect = inputFlag.toLowerCase() === task.correctFlag.toLowerCase();

    if (isCorrect) {
      // Update task in stage
      setStages(prevStages => prevStages.map(stage => {
        if (stage.id === task.stageId) {
          const updatedTasks = stage.tasks.map(t => t.id === task.id ? { ...t, isSolved: true, isCorrect: true } : t);
          return { ...stage, tasks: updatedTasks };
        }
        return stage;
      }));

      setFeedbackState(prev => ({
        ...prev,
        [task.id]: { success: true, message: `Correct! Flag validated successfully. +${task.points} XP earned.` }
      }));

      // Update global user stats
      onUpdateStats({
        xp: stats.xp + task.points,
        securityScore: Math.min(100, stats.securityScore + 2),
      });
    } else {
      setFeedbackState(prev => ({
        ...prev,
        [task.id]: { success: false, message: 'Incorrect flag. Double-check your decoding or analysis and try again.' }
      }));
    }
  };

  const handleRetakeStage = (stageId: number) => {
    setStages(prev => prev.map(s => {
      if (s.id === stageId) {
        return {
          ...s,
          isCompleted: false,
          scoreEarned: 0,
          tasks: s.tasks.map(t => ({ ...t, isSolved: false, isCorrect: undefined }))
        };
      }
      return s;
    }));
    setUserInputs({});
    setFeedbackState({});
    const targetStage = stages.find(s => s.id === stageId);
    if (targetStage) {
      handleStartStage(targetStage);
    }
  };

  const handleSubmitStage = () => {
    if (!activeStage) return;
    setTimerActive(false);

    const solvedTasks = activeStage.tasks.filter(t => t.isSolved);
    const scoreEarned = solvedTasks.reduce((acc, t) => acc + t.points, 0);
    const totalPossible = activeStage.tasks.reduce((acc, t) => acc + t.points, 0);
    const timeSpent = activeStage.durationSeconds - timeLeft;

    // Mark stage completed
    setStages(prev => prev.map(s => s.id === activeStage.id ? {
      ...s,
      isCompleted: true,
      scoreEarned,
      timeSpent,
      totalCorrect: solvedTasks.length
    } : s));

    setCompletedStageResult({
      stageId: activeStage.id,
      title: activeStage.title,
      scoreEarned,
      totalPossible,
      correctCount: solvedTasks.length,
      totalTasks: activeStage.tasks.length,
      timeTakenSeconds: timeSpent
    });

    setShowResultsModal(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Overall totals across all 10 stages
  const totalStagesCompleted = stages.filter(s => s.isCompleted).length;
  const totalCtfPoints = stages.reduce((acc, s) => acc + (s.scoreEarned || 0), 0);

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
                10-STAGE ARENA
              </span>
              <span className="text-xs font-mono-tech text-slate-400">Capture The Flag (CTF) Real-Time Simulations</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold font-display text-white mt-0.5">
              CyberFortress CTF Mission Control
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-3">
            <Flag className="w-4 h-4 text-[#20d6a1]" />
            <div>
              <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Stages Cleared</span>
              <span className="text-sm font-mono-tech font-bold text-white">{totalStagesCompleted} / 10</span>
            </div>
          </div>

          <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#19c7f3]" />
            <div>
              <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Total Score / XP</span>
              <span className="text-sm font-mono-tech font-bold text-[#19c7f3]">+{totalCtfPoints} XP</span>
            </div>
          </div>

          <button
            onClick={activeStageId !== null ? handleBackToOverview : onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-[#0b162c] hover:bg-[#122344] border border-[#1a335c] text-slate-200 font-mono-tech text-xs transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {activeStageId !== null ? 'Stages Overview' : 'Dashboard'}
          </button>
        </div>
      </div>

      {/* VIEW 1: STAGES OVERVIEW (10 STAGES) */}
      {activeStageId === null ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#070e1e] p-4 rounded-2xl border border-[#172d56]">
            <div>
              <h2 className="text-lg font-bold font-display text-white">Select a CTF Mission Stage</h2>
              <p className="text-xs text-slate-400 font-sans">Choose from 10 progressive stages ranging from Beginner Cryptography to Advanced APT Forensics and Cloud IAM.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
              <span className="px-2.5 py-1 rounded bg-[#20d6a1]/10 border border-[#20d6a1]/30 text-[#20d6a1]">Beginner (1-3)</span>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">Intermediate (4-7)</span>
              <span className="px-2.5 py-1 rounded bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444]">Advanced (8-10)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {stages.map(stage => {
              const diffColor = 
                stage.difficulty === 'Beginner' ? 'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40' :
                stage.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40';

              const solvedTasksCount = stage.tasks.filter(t => t.isSolved).length;

              return (
                <div 
                  key={stage.id}
                  className={`bg-[#070e1e] border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all hover:border-[#19c7f3]/60 hover:shadow-[0_0_20px_rgba(25,199,243,0.15)] ${stage.isCompleted ? 'border-[#20d6a1]/60' : 'border-[#172d56]'}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-[#19c7f3] bg-[#19c7f3]/10 px-2.5 py-0.5 rounded border border-[#19c7f3]/30 font-bold">
                        Stage {stage.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded border text-[10px] font-mono-tech font-bold uppercase ${diffColor}`}>
                        {stage.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display text-white line-clamp-1">{stage.title}</h3>
                    <p className="text-xs text-slate-300 font-sans line-clamp-2">{stage.subtitle}</p>
                  </div>

                  <div className="mt-5 space-y-3 pt-4 border-t border-[#172d56]">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#19c7f3]" /> {Math.floor(stage.durationSeconds / 60)} Mins</span>
                      <span className="flex items-center gap-1"><Flag className="w-3.5 h-3.5 text-amber-400" /> {stage.tasks.length} Tasks</span>
                    </div>

                    {stage.isCompleted ? (
                      <div className="space-y-2">
                        <div className="w-full bg-[#20d6a1]/10 border border-[#20d6a1]/30 rounded-xl py-2 px-3 text-center text-xs font-mono-tech text-[#20d6a1] font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Cleared ({stage.scoreEarned} pts)
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleStartStage(stage)}
                            className="w-full py-2 rounded-xl bg-[#0b162c] hover:bg-[#122344] border border-[#1a335c] text-slate-200 font-mono-tech text-xs transition-all"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleRetakeStage(stage.id)}
                            className="w-full py-2 rounded-xl bg-[#19c7f3]/20 hover:bg-[#19c7f3]/30 border border-[#19c7f3]/45 text-[#19c7f3] font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Retake
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartStage(stage)}
                        className="w-full py-2.5 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech text-xs font-bold shadow-[0_0_15px_rgba(25,199,243,0.3)] transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> {solvedTasksCount > 0 ? `Resume (${solvedTasksCount}/10)` : 'Start Stage'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: ACTIVE STAGE ARENA (10 TASKS + TIMER + CHARACTERS) */
        <div className="space-y-6">
          
          {/* STAGE SUB-HEADER BAR */}
          <div className="bg-[#070e1e] border border-[#172d56] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-[#19c7f3]/10 text-[#19c7f3] border border-[#19c7f3]/30 font-bold uppercase">
                  Stage {activeStage?.id}: {activeStage?.difficulty}
                </span>
                <span className="text-xs font-mono-tech text-slate-400">10 Real-Time Simulation Tasks</span>
              </div>
              <h2 className="text-lg font-bold font-display text-white">{activeStage?.title}</h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Live Timer */}
              <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-2.5">
                <Clock className={`w-4 h-4 ${timeLeft < 120 ? 'text-[#ef4444] animate-pulse' : 'text-[#19c7f3]'}`} />
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Time Remaining</span>
                  <span className={`text-sm font-mono-tech font-bold ${timeLeft < 120 ? 'text-[#ef4444]' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Progress Count */}
              <div className="bg-[#050a14] border border-[#172d56] px-4 py-2 rounded-xl flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Solved Tasks</span>
                  <span className="text-sm font-mono-tech font-bold text-amber-400">
                    {activeStage?.tasks.filter(t => t.isSolved).length} / 10
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmitStage}
                className="px-5 py-2.5 rounded-xl bg-[#20d6a1] hover:bg-[#34e2b0] text-[#050a14] font-mono-tech text-xs font-extrabold shadow-[0_0_20px_rgba(32,214,161,0.4)] transition-all"
              >
                Submit Stage Results
              </button>
            </div>
          </div>

          {/* 10 TASKS LIST */}
          <div className="space-y-6">
            {activeStage?.tasks.map((task, index) => {
              const feedback = feedbackState[task.id];
              const showHint = revealedHints[task.id];

              const diffColor = 
                task.difficulty === 'Beginner' ? 'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40' :
                task.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40';

              return (
                <div 
                  key={task.id}
                  className={`bg-[#070e1e] border rounded-2xl p-6 shadow-xl transition-all ${task.isSolved ? 'border-[#20d6a1]/60 shadow-[0_0_20px_rgba(32,214,161,0.15)]' : 'border-[#172d56]'}`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#172d56]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#142646] border border-[#19c7f3]/40 flex items-center justify-center text-[#19c7f3] font-mono-tech text-xs font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-mono-tech font-bold uppercase ${diffColor}`}>
                            {task.difficulty}
                          </span>
                          <span className="text-[10px] font-mono-tech text-[#19c7f3] bg-[#19c7f3]/10 px-2 py-0.5 rounded border border-[#19c7f3]/30 font-bold">
                            {task.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white">{task.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#050a14] border border-[#172d56] px-3.5 py-1.5 rounded-xl">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono-tech font-bold text-amber-400">+{task.points} pts</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans mb-4">{task.description}</p>

                  {/* Task Prompt Box */}
                  <div className="bg-[#050a14] border border-[#1b2c4e] rounded-xl p-4 mb-5 font-mono-tech text-xs text-[#19c7f3] whitespace-pre-wrap">
                    {task.prompt}
                  </div>

                  {/* INTERACTIVE CHARACTER HINT BOX (USING characters.jpg) */}
                  <div className="mb-5 bg-gradient-to-r from-[#0b162c] to-[#081224] border border-[#19c7f3]/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#19c7f3] shadow-[0_0_15px_rgba(25,199,243,0.3)] shrink-0">
                        <img 
                          src="/characters.jpg" 
                          alt="Character Persona" 
                          className="w-[300%] h-full max-none object-cover"
                          style={{ objectPosition: task.characterPersona.avatarPosition }}
                        />
                      </div>
                      <div>
                        <span className="text-xs font-mono-tech font-bold text-white block">{task.characterPersona.name}</span>
                        <span className="text-[10px] font-mono-tech text-[#19c7f3] block">{task.characterPersona.role}</span>
                      </div>
                    </div>

                    <div className="flex-1 bg-[#050a14] border border-[#1b2c4e] rounded-xl p-3 text-xs font-mono-tech text-slate-300 relative">
                      <span className="text-[#19c7f3] font-bold">💬 "{task.characterPersona.dialogue}"</span>
                    </div>

                    <button
                      onClick={() => handleToggleHint(task.id)}
                      className="px-3 py-2 rounded-xl bg-[#142646] hover:bg-[#1c355e] border border-[#19c7f3]/40 text-[#19c7f3] font-mono-tech text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <HelpCircle className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'Get Hint'}
                    </button>
                  </div>

                  {showHint && (
                    <div className="mb-5 p-3 rounded-xl bg-[#0b162c] border border-amber-500/40 text-amber-300 text-xs font-mono-tech flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold shrink-0">💡 Hint:</span>
                      <span>{task.hint}</span>
                    </div>
                  )}

                  {/* Flag Input / Solved Status */}
                  {task.isSolved ? (
                    <div className="bg-[#20d6a1]/10 border border-[#20d6a1]/30 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#20d6a1] shrink-0" />
                      <div>
                        <span className="text-xs font-mono-tech font-bold text-[#20d6a1] block">Task Solved Successfully!</span>
                        <span className="text-[11px] text-slate-300 font-sans">{task.explanation}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Enter flag format: CS{...}"
                          value={userInputs[task.id] || ''}
                          onChange={(e) => handleInputChange(task.id, e.target.value)}
                          className="flex-1 bg-[#050a14] border border-[#1b2c4e] rounded-xl px-4 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-[#19c7f3]"
                        />
                        <button
                          onClick={() => handleSubmitFlag(task)}
                          className="px-6 py-2.5 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech text-xs font-bold shadow-[0_0_15px_rgba(25,199,243,0.4)] transition-all"
                        >
                          Submit Flag
                        </button>
                      </div>

                      {feedback && (
                        <div className={`p-3 rounded-xl text-xs font-mono-tech border flex items-center gap-2.5 ${feedback.success ? 'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40' : 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40'}`}>
                          {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                          <span>{feedback.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* STAGE SUBMISSION RESULTS MODAL */}
      {showResultsModal && completedStageResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#070e1e] border border-[#19c7f3]/60 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(25,199,243,0.3)] space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-[#142646] border border-[#19c7f3]/80 flex items-center justify-center text-[#19c7f3] mx-auto shadow-[0_0_20px_rgba(25,199,243,0.4)]">
              <Award className="w-8 h-8 text-[#20d6a1]" />
            </div>

            <div>
              <span className="text-xs font-mono-tech px-3 py-1 rounded bg-[#20d6a1]/20 text-[#20d6a1] border border-[#20d6a1]/40 font-bold uppercase">
                Stage Completed
              </span>
              <h2 className="text-2xl font-extrabold font-display text-white mt-2">{completedStageResult.title}</h2>
              <p className="text-xs text-slate-300 font-sans mt-1">Mission simulation telemetry report and final score summary.</p>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-[#050a14] border border-[#172d56] p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Correct Tasks</span>
                <span className="text-base font-mono-tech font-bold text-white">{completedStageResult.correctCount} / {completedStageResult.totalTasks}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Score Earned</span>
                <span className="text-base font-mono-tech font-bold text-[#19c7f3]">+{completedStageResult.scoreEarned} pts</span>
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-slate-400 block uppercase">Time Taken</span>
                <span className="text-base font-mono-tech font-bold text-amber-400">{Math.floor(completedStageResult.timeTakenSeconds / 60)}m {completedStageResult.timeTakenSeconds % 60}s</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleRetakeStage(completedStageResult.stageId)}
                className="flex-1 py-3 rounded-xl bg-[#0b162c] hover:bg-[#122344] border border-[#1a335c] text-slate-200 font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Stage
              </button>

              <button
                onClick={handleBackToOverview}
                className="flex-1 py-3 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech text-xs font-extrabold shadow-[0_0_20px_rgba(25,199,243,0.4)] transition-all"
              >
                Continue to Stages
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
