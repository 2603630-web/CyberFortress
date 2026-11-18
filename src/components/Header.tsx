import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Search, 
  Sparkles, 
  User, 
  Clock, 
  Radio, 
  Layers,
  Terminal,
  ExternalLink,
  Info,
  X
} from 'lucide-react';
import { ModuleId } from '../types';

interface HeaderProps {
  onOpenCopilot: () => void;
  onOpenConsole: () => void;
  onToggleLanding: () => void;
  isLandingView: boolean;
  onSearchClick: () => void;
  onSelectModule?: (id: ModuleId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCopilot,
  onOpenConsole,
  onToggleLanding,
  isLandingView,
  onSearchClick,
  onSelectModule,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchModules = [
    { id: 'dashboard' as ModuleId, label: 'SOC Command Center Dashboard', type: 'Main', desc: 'Overview of threat metrics and defense status' },
    { id: 'phishing' as ModuleId, label: 'Phishing Email Simulation Hub', type: 'Live Demo', desc: 'Analyze suspicious emails and identify indicators' },
    { id: 'attack-defense' as ModuleId, label: 'Attack & Defense Simulation', type: 'Simulation', desc: 'Deploy countermeasures against DDoS and Brute-Force' },
    { id: 'password' as ModuleId, label: 'Password Security & Entropy Checker', type: 'Tool', desc: 'Zero-knowledge password strength calculator' },
    { id: 'mfa' as ModuleId, label: 'Multi-Factor Authentication (MFA) Demo', type: 'Authentication', desc: 'Compare password-only vs TOTP MFA security flows' },
    { id: 'soc' as ModuleId, label: 'Mini SOC Incident Response Console', type: 'Operations', desc: 'SIEM alert triage and incident containment' },
    { id: 'ctf' as ModuleId, label: 'CTF Challenge Arena & Flag Submission', type: 'Arena', desc: 'Solve cryptographic puzzles and capture flags' },
    { id: 'learning' as ModuleId, label: 'Cybersecurity Learning Center', type: 'Education', desc: 'Best practices, tutorials, and security glossary' },
  ];

  const filteredModules = searchModules.filter(m => 
    m.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).toUpperCase()
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-[#070d19]/95 backdrop-blur-md border-b border-[#15233e] px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-40 select-none">
      {/* Left: Branding & Sentinel Status */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#19c7f3]/20 to-[#7c5cfc]/20 border border-[#19c7f3]/40 shadow-[0_0_15px_rgba(25,199,243,0.3)]">
          <Shield className="w-5 h-5 text-[#19c7f3] drop-shadow-[0_0_8px_#19c7f3]" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#20d6a1] animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#20d6a1]" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base tracking-wider text-white">
              QUERYTEL SENTINEL
            </span>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30 uppercase">
              CyberFortress
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-mono-tech">
            <span className="flex items-center gap-1 text-[#20d6a1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20d6a1] inline-block animate-pulse"></span>
              SYSTEM OPERATIONAL
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-[#19c7f3]">
              GLOBAL DEFENSE: ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Center: Correct Interactive Search Bar with Live Results & Cmd+K */}
      <div ref={searchRef} className="flex-1 max-w-md hidden md:block relative">
        <div className="group relative flex items-center bg-[#0d1628] hover:bg-[#111e36] transition-all border border-[#1a2d4f] hover:border-[#19c7f3]/50 rounded-lg px-3 py-1.5 shadow-inner">
          <Search className="w-4 h-4 text-slate-400 group-hover:text-[#19c7f3] transition-colors mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchFocused(true);
            }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search modules, assets, IPs, or threats..."
            className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none font-mono-tech"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex items-center gap-1 pl-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono-tech text-slate-400 bg-[#090f1e] border border-[#1d3056] rounded shadow-sm">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchFocused && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#0a1426] border border-[#1c3055] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 bg-[#070e1e] border-b border-[#15233e] flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
              <span>MATCHING MODULES & CAPABILITIES ({filteredModules.length})</span>
              <span className="text-[#19c7f3]">Press Enter or Click to Navigate</span>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-[#15233e]/50">
              {filteredModules.length > 0 ? (
                filteredModules.map((mod) => (
                  <div
                    key={mod.id}
                    onClick={() => {
                      if (onSelectModule) onSelectModule(mod.id);
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="p-3 hover:bg-[#122240] transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white group-hover:text-[#19c7f3] transition-colors">
                        {mod.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {mod.desc}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#19c7f3]/10 text-[#19c7f3] border border-[#19c7f3]/30 shrink-0 ml-2">
                      {mod.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 font-mono-tech">
                  No matching modules found for "{searchQuery}". Try searching "phishing", "ctf", or "soc".
                </div>
              )}
            </div>
            <div className="px-3 py-2 bg-[#070e1e] border-t border-[#15233e] text-[10px] text-slate-500 flex items-center justify-between">
              <span>CyberFortress Sentinel Index v4.2</span>
              <button 
                onClick={() => {
                  setIsSearchFocused(false);
                  onOpenCopilot();
                }}
                className="text-[#19c7f3] hover:underline"
              >
                Need AI Assistance? Open Copilot ➔
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Controls & Status Indicators */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Toggle Landing / Sentinel Mode */}
        <button
          onClick={onToggleLanding}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all border ${
            isLandingView 
              ? 'bg-[#19c7f3] text-black font-semibold border-[#19c7f3] shadow-[0_0_15px_rgba(25,199,243,0.4)]'
              : 'bg-[#0e192f] hover:bg-[#142342] text-slate-300 border-[#1c3055]'
          }`}
          title="Toggle between cinematic intro and command dashboard"
        >
          <Layers className="w-3.5 h-3.5 text-[#19c7f3]" />
          <span className="hidden lg:inline">{isLandingView ? 'Back to Sentinel' : 'Landing View'}</span>
        </button>

        {/* Quick Copilot AI Button */}
        <button
          onClick={onOpenCopilot}
          className="relative group overflow-hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#19c7f3]/20 via-[#2752ff]/30 to-[#7c5cfc]/20 hover:from-[#19c7f3]/30 hover:to-[#7c5cfc]/30 text-white font-mono-tech text-xs font-medium border border-[#19c7f3]/50 hover:border-[#19c7f3] shadow-[0_0_15px_rgba(25,199,243,0.25)] transition-all transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#19c7f3] animate-pulse" />
          <span className="tracking-wide">QUICK COPILOT</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
        </button>

        {/* Active Analysts Indicators */}
        <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-[#15233e]">
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
            Active Analysts
          </span>
          <div className="flex items-center -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-[#132d4b] border border-[#19c7f3]/40 flex items-center justify-center text-[9px] font-mono-tech text-[#19c7f3]" title="Lead Analyst">
              U1
            </span>
            <span className="w-5 h-5 rounded-full bg-[#201d4a] border border-[#7c5cfc]/40 flex items-center justify-center text-[9px] font-mono-tech text-[#7c5cfc]" title="SOC Tier 2">
              U2
            </span>
            <span className="w-5 h-5 rounded-full bg-[#1c2e26] border border-[#20d6a1]/40 flex items-center justify-center text-[9px] font-mono-tech text-[#20d6a1]" title="Threat Hunter">
              U3
            </span>
            <span className="w-4 h-4 rounded-full bg-[#0e172a] border border-slate-700 flex items-center justify-center text-[8px] font-mono-tech text-slate-400">
              +
            </span>
          </div>
        </div>

        {/* Ops Live Clock */}
        <div className="hidden lg:flex flex-col items-end px-2 border-l border-[#15233e] text-right">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-[#19c7f3]" /> OPS TIME
          </span>
          <span className="text-xs font-mono-tech text-slate-200 tracking-wider font-semibold">
            {timeString || '10:09:03 A.M.'}
          </span>
        </div>

        {/* Live Active Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a1e20] border border-[#20d6a1]/30 text-[#20d6a1] text-[11px] font-mono-tech font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#20d6a1] animate-ping" />
          <span className="w-2 h-2 rounded-full bg-[#20d6a1] -ml-3" />
          <span>LIVE ACTIVE</span>
        </div>

        {/* Admin Portal / L3 Analyst Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#15233e]">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-[11px] font-semibold text-slate-200 tracking-tight">
              ADMIN PORTAL
            </span>
            <span className="text-[9px] font-mono-tech text-[#19c7f3]">
              L3 ANALYST
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#142646] to-[#25427c] border border-[#19c7f3]/50 flex items-center justify-center text-slate-200 shadow-md">
            <User className="w-4 h-4 text-[#19c7f3]" />
          </div>
        </div>
      </div>
    </header>
  );
};
