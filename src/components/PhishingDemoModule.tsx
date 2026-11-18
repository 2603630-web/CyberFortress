import React, { useState } from 'react';
import { 
  Mail, 
  MailWarning, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  Search, 
  Lock, 
  Info,
  Award,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { samplePhishingEmails } from '../data/mockData';
import { PhishingEmail, UserStats, ModuleId } from '../types';

interface PhishingDemoModuleProps {
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onBackToDashboard: () => void;
}

export const PhishingDemoModule: React.FC<PhishingDemoModuleProps> = ({
  stats,
  onUpdateStats,
  onBackToDashboard,
}) => {
  const [emails, setEmails] = useState<PhishingEmail[]>(samplePhishingEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showResultFeedback, setShowResultFeedback] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentEmail = emails.find(e => e.id === selectedEmailId) || emails[0];

  const filteredEmails = emails.filter(email => {
    const matchesDifficulty = selectedDifficulty === 'All' || email.difficulty === selectedDifficulty;
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.senderName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const completedCount = emails.filter(e => e.userDecision !== undefined).length;
  const correctCount = emails.filter(e => e.isCorrect === true).length;
  const accuracyPercentage = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 100;

  const handleDecision = (decision: 'phishing' | 'legitimate') => {
    const isCorrect = (decision === 'phishing' && currentEmail.isPhishing) ||
                      (decision === 'legitimate' && !currentEmail.isPhishing);

    const updatedEmails = emails.map(e => {
      if (e.id === currentEmail.id) {
        return {
          ...e,
          userDecision: decision,
          isCorrect: isCorrect,
        };
      }
      return e;
    });

    setEmails(updatedEmails);
    setShowResultFeedback(true);

    if (isCorrect) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#19c7f3', '#20d6a1', '#7c5cfc']
        });
      } catch (err) {
        // ignore if canvas-confetti is not loaded
      }

      // Update parent user stats
      const newXp = stats.xp + 50;
      const newScore = Math.min(100, stats.securityScore + 3);
      onUpdateStats({
        xp: newXp,
        securityScore: newScore,
        eventsAnalyzed: stats.eventsAnalyzed + 1,
        accuracy: Math.round(((correctCount + 1) / (completedCount + 1)) * 100)
      });
    } else {
      onUpdateStats({
        eventsAnalyzed: stats.eventsAnalyzed + 1,
        accuracy: Math.round((correctCount / (completedCount + 1)) * 100)
      });
    }
  };

  const handleNextEmail = () => {
    setShowResultFeedback(false);
    const currentIndex = emails.findIndex(e => e.id === currentEmail.id);
    if (currentIndex < emails.length - 1) {
      setSelectedEmailId(emails[currentIndex + 1].id);
    }
  };

  const handleResetSimulator = () => {
    const reset = samplePhishingEmails.map(e => ({
      ...e,
      userDecision: undefined,
      isCorrect: undefined
    }));
    setEmails(reset);
    setSelectedEmailId(reset[0].id);
    setShowResultFeedback(false);
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1700px] mx-auto select-none overflow-y-auto">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#091224] border border-[#162544] p-3.5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg bg-[#0e1a32] hover:bg-[#132446] border border-[#192f54] text-slate-300 hover:text-[#19c7f3] transition-all flex items-center gap-1.5 text-xs font-mono-tech"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>DASHBOARD</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-mono-tech font-bold text-white tracking-wider">
                PHISHING AWARENESS SIMULATOR
              </h1>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30 uppercase font-semibold">
                MODULE 01 • ACTIVE DEMO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Analyze realistic corporate emails, detect malicious deceptive lures, and classify threats in a safe sandbox.
            </p>
          </div>
        </div>

        {/* Live Score & XP Widget */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0d182e] border border-[#1a2e54] px-3 py-1.5 rounded-lg">
            <Award className="w-4 h-4 text-[#20d6a1]" />
            <div className="text-right">
              <span className="text-[9px] font-mono-tech text-slate-400 uppercase block">XP EARNED</span>
              <span className="text-xs font-mono-tech font-bold text-[#20d6a1]">+{stats.xp - 650} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0d182e] border border-[#1a2e54] px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#19c7f3]" />
            <div className="text-right">
              <span className="text-[9px] font-mono-tech text-slate-400 uppercase block">ACCURACY</span>
              <span className="text-xs font-mono-tech font-bold text-white">{accuracyPercentage}%</span>
            </div>
          </div>

          <button
            onClick={handleResetSimulator}
            className="p-2 rounded-lg bg-[#0e1a32] hover:bg-[#1f1322] border border-[#1c3055] hover:border-[#ff6577]/40 text-slate-400 hover:text-[#ff6577] transition-all"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulator Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Simulated Mailbox List (4 Cols on lg) */}
        <div className="lg:col-span-4 bg-[#091224] border border-[#162544] rounded-xl flex flex-col h-[700px] shadow-lg overflow-hidden">
          
          {/* Mailbox Header & Search */}
          <div className="p-3 border-b border-[#13223f] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#19c7f3]" />
                SIMULATED INBOX
              </span>
              <span className="text-[10px] font-mono-tech text-slate-400">
                {completedCount}/{emails.length} Completed
              </span>
            </div>

            {/* Difficulty Filter Pills */}
            <div className="flex items-center gap-1.5">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-tech transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-[#19c7f3] text-black font-semibold'
                      : 'bg-[#0d172c] text-slate-400 hover:text-slate-200 border border-[#16274a]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or sender..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#070e1c] border border-[#142442] rounded-lg text-xs font-mono-tech text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#19c7f3]"
              />
            </div>
          </div>

          {/* Email Item Rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#101b33]">
            {filteredEmails.map(email => {
              const isSelected = email.id === currentEmail.id;
              const isDone = email.userDecision !== undefined;

              return (
                <div
                  key={email.id}
                  onClick={() => {
                    setSelectedEmailId(email.id);
                    setShowResultFeedback(isDone);
                  }}
                  className={`p-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#10203d] border-l-2 border-[#19c7f3]'
                      : 'hover:bg-[#0c162a]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {email.senderName}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {isDone ? (
                        email.isCorrect ? (
                          <span className="flex items-center gap-0.5 text-[9px] font-mono-tech text-[#20d6a1] bg-[#20d6a1]/10 px-1.5 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" /> PASS
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5 text-[9px] font-mono-tech text-[#ff6577] bg-[#ff6577]/10 px-1.5 py-0.5 rounded">
                            <XCircle className="w-3 h-3" /> FAIL
                          </span>
                        )
                      ) : (
                        <span className="text-[9px] font-mono-tech text-slate-500 bg-[#0e172a] px-1.5 py-0.5 rounded border border-[#16243f]">
                          UNREAD
                        </span>
                      )}
                      <span className="text-[9px] font-mono-tech text-slate-500">
                        {email.date.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-300 truncate mb-1">
                    {email.subject}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
                    <span className="truncate max-w-[180px]">{email.category}</span>
                    <span className="px-1 rounded bg-[#0b1426] border border-[#15233e] text-[9px] text-[#19c7f3]">
                      {email.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Email Inspector & Safe Action Suite (8 Cols on lg) */}
        <div className="lg:col-span-8 bg-[#091224] border border-[#162544] rounded-xl flex flex-col h-[700px] shadow-lg overflow-hidden">
          
          {/* Email Header Panel with Header Forensics */}
          <div className="p-4 border-b border-[#13223f] bg-[#0c162b] space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-sm md:text-base font-bold text-white tracking-wide">
                {currentEmail.subject}
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#10203f] border border-[#1b325c] text-[10px] font-mono-tech text-[#19c7f3]">
                  {currentEmail.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10203f] border border-[#1b325c] text-[10px] font-mono-tech text-slate-400">
                  {currentEmail.difficulty}
                </span>
              </div>
            </div>

            {/* Email Metadata Card */}
            <div className="bg-[#070e1c] rounded-lg p-2.5 border border-[#13223f] text-xs font-mono-tech space-y-1">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500 w-16">FROM:</span>
                <span className="font-semibold text-white">{currentEmail.senderName}</span>
                <span className="text-[#19c7f3] bg-[#19c7f3]/10 px-1.5 py-0.5 rounded border border-[#19c7f3]/20">
                  &lt;{currentEmail.senderEmail}&gt;
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-slate-500 w-16">TO:</span>
                <span>{currentEmail.recipient}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-slate-500 w-16">DATE:</span>
                <span>{currentEmail.date}</span>
                <span className="ml-auto text-slate-500 text-[10px]">ENCRYPTION: TLS 1.3</span>
              </div>
            </div>
          </div>

          {/* Email Body Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#070d1a]">
            {/* Body Text */}
            <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line max-w-3xl">
              {currentEmail.bodyText}
            </div>

            {/* Safe Interactive Link / CTA Button */}
            {currentEmail.ctaText && (
              <div className="pt-2">
                <div className="inline-block relative">
                  <button
                    onMouseEnter={() => setHoveredLink(currentEmail.realDisplayUrl || currentEmail.ctaTargetUrl || null)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => {
                      alert(`[SAFE SANDBOX NOTICE]\n\nYou clicked a simulated target:\n${currentEmail.realDisplayUrl || currentEmail.ctaTargetUrl}\n\nIn a real-world scenario, this link could trigger malware downloads or lead to a cloned credential-stealing login form.`);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#19c7f3] to-[#2563eb] hover:from-[#2563eb] hover:to-[#19c7f3] text-black font-mono-tech font-bold text-xs shadow-lg transition-all"
                  >
                    <span>{currentEmail.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {/* Sandbox Safety Label */}
                  <span className="block text-[10px] font-mono-tech text-slate-500 mt-1">
                    Hover over button to inspect true destination link in bottom sandbox.
                  </span>
                </div>
              </div>
            )}

            {/* Real-time Link Destination Inspector Bar */}
            <div className="bg-[#0b1426] border border-[#182b4e] rounded-lg p-2.5 flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-2 truncate">
                <Lock className="w-3.5 h-3.5 text-[#19c7f3] shrink-0" />
                <span className="text-slate-400 shrink-0">DESTINATION URL FORENSICS:</span>
                <span className="text-white truncate">
                  {hoveredLink ? (
                    <strong className="text-[#ff6577] bg-[#ff6577]/10 px-2 py-0.5 rounded border border-[#ff6577]/30">
                      {hoveredLink}
                    </strong>
                  ) : (
                    <span className="text-slate-500 italic">Hover over the action link above to reveal target server...</span>
                  )}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0 hidden sm:inline">
                SANDBOX ISOLATED
              </span>
            </div>

            {/* Feedback & Forensic Explanation Card */}
            {showResultFeedback && (
              <div className={`rounded-xl p-4 border transition-all ${
                currentEmail.isCorrect
                  ? 'bg-[#0a1e1e] border-[#20d6a1]/50 shadow-[0_0_20px_rgba(32,214,161,0.15)]'
                  : 'bg-[#210d18] border-[#ff6577]/50 shadow-[0_0_20px_rgba(255,101,119,0.15)]'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {currentEmail.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-[#20d6a1]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#ff6577]" />
                    )}
                    <span className="text-sm font-mono-tech font-bold text-white">
                      {currentEmail.isCorrect ? 'DECISION VERIFIED: CORRECT (+50 XP)' : 'DECISION INCORRECT: ANALYSIS FAILED'}
                    </span>
                  </div>
                  <button
                    onClick={handleNextEmail}
                    className="flex items-center gap-1 px-3 py-1 bg-[#122240] hover:bg-[#182c52] border border-[#1a315a] rounded text-xs font-mono-tech text-white"
                  >
                    <span>NEXT CASE</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#19c7f3]" />
                  </button>
                </div>

                <p className="text-xs text-slate-200 mb-3 leading-relaxed">
                  {currentEmail.explanation}
                </p>

                {/* Red Flag Indicators list */}
                <div className="space-y-1.5 mb-3 bg-[#060b14]/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block font-semibold">
                    KEY FORENSIC INDICATORS:
                  </span>
                  {currentEmail.indicators.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-[#19c7f3]">•</span>
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>

                {/* Educational Takeaway Tip */}
                <div className="flex items-start gap-2 text-[11px] font-mono-tech text-[#20d6a1] bg-[#20d6a1]/10 p-2.5 rounded border border-[#20d6a1]/20">
                  <Info className="w-4 h-4 text-[#20d6a1] shrink-0 mt-0.5" />
                  <span><strong>CYBERFORTRESS DEFENSE TIP:</strong> {currentEmail.educationalTip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Decision Suite (Bottom Bar) */}
          <div className="p-4 border-t border-[#13223f] bg-[#0c162b] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
              <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
              <span>Make your forensic judgment based on sender, domain, urgency, and destination URL.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Mark Legitimate */}
              <button
                onClick={() => handleDecision('legitimate')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0e2a22] hover:bg-[#133d31] text-[#20d6a1] border border-[#20d6a1]/40 font-mono-tech font-bold text-xs transition-all shadow-md active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>MARK LEGITIMATE</span>
              </button>

              {/* Report Phishing */}
              <button
                onClick={() => handleDecision('phishing')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#330f19] hover:bg-[#4d1624] text-[#ff6577] border border-[#ff6577]/50 font-mono-tech font-bold text-xs transition-all shadow-[0_0_15px_rgba(255,101,119,0.3)] active:scale-95"
              >
                <MailWarning className="w-4 h-4" />
                <span>REPORT AS PHISHING</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
