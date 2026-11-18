import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Terminal, 
  Layers, 
  ArrowUpRight,
  Shield,
  Activity,
  KeyRound,
  FileCode
} from 'lucide-react';
import { ModuleId, ModuleMetadata } from '../types';
import { modulesList } from '../data/mockData';

interface ComingSoonModuleProps {
  moduleId: ModuleId;
  onNavigateToModule: (id: ModuleId) => void;
  onBackToDashboard: () => void;
}

export const ComingSoonModule: React.FC<ComingSoonModuleProps> = ({
  moduleId,
  onNavigateToModule,
  onBackToDashboard,
}) => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [testPasswordInput, setTestPasswordInput] = useState('CyberFortress2026!#');
  const [ctfFlagInput, setCtfFlagInput] = useState('');
  const [ctfFlagResult, setCtfFlagResult] = useState<string | null>(null);
  const [firewallToggle, setFirewallToggle] = useState(false);

  const moduleInfo: ModuleMetadata = modulesList.find(m => m.id === moduleId) || {
    id: moduleId,
    title: 'Advanced Cybersecurity Module',
    shortDesc: 'Next-generation interactive simulation environment.',
    iconName: 'Shield',
    badge: 'COMING SOON',
    status: 'COMING_SOON',
    estimatedDuration: '15 Mins',
    difficulty: 'Intermediate',
    tags: ['Security', 'Simulation'],
    overview: 'This advanced cyber simulation module is currently being finalized for the production release.',
    keyFeatures: ['Interactive simulation', 'Real-time telemetry', 'Forensic inspection']
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setIsNotified(true);
    }
  };

  const handleCtfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctfFlagInput.trim() === 'CS{secure_login}') {
      setCtfFlagResult('CORRECT FLAG SUBMITTED! +100 PTS');
    } else {
      setCtfFlagResult('INVALID FLAG. HINT: Check PRD Section 3 (Feature 6). Format is CS{secure_login}');
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-[1500px] mx-auto select-none overflow-y-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-[#091224] border border-[#162544] p-3.5 rounded-xl shadow-lg">
        <button
          onClick={onBackToDashboard}
          className="p-2 rounded-lg bg-[#0e1a32] hover:bg-[#132446] border border-[#192f54] text-slate-300 hover:text-[#19c7f3] transition-all flex items-center gap-1.5 text-xs font-mono-tech"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO DASHBOARD</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 uppercase font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            SCHEDULED IN NEXT SPRINT (V2.0)
          </span>
        </div>
      </div>

      {/* Hero Blueprint Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0c1833] via-[#091224] to-[#070d19] border border-[#19c7f3]/30 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#19c7f3]/10 border border-[#19c7f3]/40 flex items-center justify-center text-[#19c7f3] shadow-inner">
              <Lock className="w-6 h-6 text-[#19c7f3] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-bold font-mono-tech text-white tracking-wider">
                  {moduleInfo.title}
                </h1>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#10203f] border border-[#1b325c] text-[#19c7f3]">
                  {moduleInfo.difficulty}
                </span>
              </div>
              <p className="text-xs font-mono-tech text-slate-400 mt-1">
                Estimated Duration: {moduleInfo.estimatedDuration} • Category: {moduleInfo.tags.join(', ')}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {moduleInfo.overview}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {moduleInfo.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono-tech px-2.5 py-1 rounded-md bg-[#0e1b36] border border-[#172d58] text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 w-96 h-96 bg-[#19c7f3]/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Two-Column Grid: Planned Architecture & Interactive Micro-Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Planned Features (7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#091224] border border-[#162544] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#13223f] pb-3">
            <span className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#19c7f3]" />
              PLANNED CORE SPECIFICATIONS & REQUIREMENTS
            </span>
            <span className="text-[10px] font-mono-tech text-slate-400">
              PRD REQ COMPLIANT
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            This module has been designed according to the university ICT project requirements specified in the PRD. Here is a preview of the architectural capabilities that are being built:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {moduleInfo.keyFeatures.map((feat, idx) => (
              <div key={idx} className="bg-[#0b162c] p-3 rounded-lg border border-[#16274a] space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19c7f3]"></span>
                  <span>Feature 0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-400 pl-3.5">
                  {feat}
                </p>
              </div>
            ))}
          </div>

          {/* Email Notification Form */}
          <div className="mt-4 pt-4 border-t border-[#13223f]">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
              JOIN EARLY ACCESS / GET RELEASE NOTIFICATION:
            </span>
            {isNotified ? (
              <div className="flex items-center gap-2 bg-[#0c2420] border border-[#20d6a1]/40 text-[#20d6a1] text-xs font-mono-tech p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#20d6a1]" />
                <span>Notification preferences saved for: <strong>{notifyEmail}</strong></span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Enter analyst email (e.g. student@university.edu)..."
                  className="flex-1 px-3 py-2 bg-[#060b14] border border-[#172b4e] rounded-lg text-xs font-mono-tech text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#19c7f3]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#122547] hover:bg-[#1a3463] border border-[#1f3f77] text-white text-xs font-mono-tech rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <Bell className="w-3.5 h-3.5 text-[#19c7f3]" />
                  <span>NOTIFY ME</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Micro-Teaser Preview (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#091224] border border-[#162544] rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-[#13223f] pb-3 mb-4">
              <span className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#19c7f3]" />
                INTERACTIVE TEASER SANDBOX
              </span>
              <span className="text-[10px] font-mono-tech text-[#20d6a1] bg-[#20d6a1]/10 px-2 py-0.5 rounded border border-[#20d6a1]/30">
                PROTOTYPE PREVIEW
              </span>
            </div>

            {/* Micro Teaser 1: Password Checker Preview */}
            {moduleId === 'password' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Try typing sample passwords into the client-side entropy engine:
                </p>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={testPasswordInput}
                    onChange={(e) => setTestPasswordInput(e.target.value)}
                    className="w-full px-3 py-2 bg-[#060b14] border border-[#172b4e] rounded-lg text-xs font-mono-tech text-white"
                  />
                  <div className="flex justify-between items-center text-[10px] font-mono-tech">
                    <span className="text-slate-400">CALCULATED STRENGTH:</span>
                    <span className="text-[#20d6a1] font-bold">
                      {testPasswordInput.length > 12 ? 'VERY STRONG (94 bits)' : testPasswordInput.length > 8 ? 'MODERATE (64 bits)' : 'WEAK (< 32 bits)'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0e182e] rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        testPasswordInput.length > 12 ? 'bg-[#20d6a1] w-[95%]' : testPasswordInput.length > 8 ? 'bg-[#f59e0b] w-[60%]' : 'bg-[#ff6577] w-[25%]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Micro Teaser 2: Attack & Defense Preview */}
            {moduleId === 'attack-defense' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Interactive state toggle preview for simulated WAF rate limiting:
                </p>
                <div className="bg-[#060b14] p-3 rounded-lg border border-[#142340] space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono-tech">
                    <span className="text-slate-300">EDGE WAF MITIGATION:</span>
                    <button
                      onClick={() => setFirewallToggle(!firewallToggle)}
                      className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                        firewallToggle
                          ? 'bg-[#20d6a1] text-black shadow-[0_0_10px_#20d6a1]'
                          : 'bg-[#ff6577]/20 text-[#ff6577] border border-[#ff6577]/40'
                      }`}
                    >
                      {firewallToggle ? 'ENABLED (DROP 99.8%)' : 'DISABLED (EXPOSED)'}
                    </button>
                  </div>
                  <div className="text-[10px] font-mono-tech text-slate-400">
                    Status: {firewallToggle ? 'Synthetic brute-force requests filtered.' : 'High-rate SYN packets passing directly to target.'}
                  </div>
                </div>
              </div>
            )}

            {/* Micro Teaser 3: CTF Challenge Preview */}
            {moduleId === 'ctf' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Sample Puzzle: Submit flag for the secure login challenge:
                </p>
                <form onSubmit={handleCtfSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={ctfFlagInput}
                    onChange={(e) => setCtfFlagInput(e.target.value)}
                    placeholder="Enter flag: CS{...}"
                    className="w-full px-3 py-2 bg-[#060b14] border border-[#172b4e] rounded-lg text-xs font-mono-tech text-white placeholder-slate-600"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#19c7f3] hover:bg-[#34d4fc] text-black font-mono-tech font-bold text-xs rounded-lg transition-all"
                  >
                    SUBMIT FLAG
                  </button>
                </form>
                {ctfFlagResult && (
                  <div className={`p-2 rounded text-[10px] font-mono-tech ${
                    ctfFlagResult.includes('CORRECT')
                      ? 'bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30'
                      : 'bg-[#ff6577]/15 text-[#ff6577] border border-[#ff6577]/30'
                  }`}>
                    {ctfFlagResult}
                  </div>
                )}
              </div>
            )}

            {/* Default Teaser for others */}
            {moduleId !== 'password' && moduleId !== 'attack-defense' && moduleId !== 'ctf' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Simulated sandbox environment ready for the next iteration:
                </p>
                <div className="bg-[#060b14] p-3 rounded-lg border border-[#142340] font-mono-tech text-xs space-y-1 text-slate-400">
                  <div className="text-[#19c7f3]">&gt; checking telemetry nodes... [OK]</div>
                  <div className="text-slate-400">&gt; verifying module parameters... [OK]</div>
                  <div className="text-[#20d6a1]">&gt; educational sandbox initialized.</div>
                </div>
              </div>
            )}
          </div>

          {/* Jump to the Live Demo Module */}
          <div className="mt-6 pt-4 border-t border-[#13223f]">
            <button
              onClick={() => onNavigateToModule('phishing')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#19c7f3] to-[#2563eb] hover:from-[#2563eb] hover:to-[#19c7f3] text-black font-mono-tech font-bold text-xs shadow-[0_0_15px_rgba(25,199,243,0.3)] transition-all"
            >
              <span>EXPLORE ACTIVE DEMO: PHISHING SIMULATOR</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
