import React from 'react';
import { 
  LayoutGrid, 
  MailWarning, 
  ShieldAlert, 
  KeyRound, 
  Smartphone, 
  Terminal, 
  Trophy, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  AlertTriangle,
  Flame,
  Radio,
  Sliders
} from 'lucide-react';
import { ModuleId } from '../types';

interface SidebarProps {
  currentModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onResetStats: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  isExpanded,
  onToggleExpand,
  onResetStats,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ModuleId,
      label: 'SOC Dashboard',
      icon: LayoutGrid,
      badge: 'MAIN',
      isDemo: false
    },
    {
      id: 'phishing' as ModuleId,
      label: 'Phishing Simulator',
      icon: MailWarning,
      badge: 'LIVE DEMO',
      isDemo: true
    },
    {
      id: 'attack-defense' as ModuleId,
      label: 'Attack & Defense',
      icon: ShieldAlert,
      badge: 'SOON',
      isDemo: false
    },
    {
      id: 'password' as ModuleId,
      label: 'Password Checker',
      icon: KeyRound,
      badge: 'SOON',
      isDemo: false
    },
    {
      id: 'mfa' as ModuleId,
      label: 'MFA Demo',
      icon: Smartphone,
      badge: 'SOON',
      isDemo: false
    },
    {
      id: 'soc' as ModuleId,
      label: 'Mini SOC Console',
      icon: Terminal,
      badge: 'SOON',
      isDemo: false
    },
    {
      id: 'ctf' as ModuleId,
      label: 'CTF Challenges',
      icon: Trophy,
      badge: 'SOON',
      isDemo: false
    },
    {
      id: 'learning' as ModuleId,
      label: 'Learning Center',
      icon: GraduationCap,
      badge: 'BONUS',
      isDemo: false
    },
  ];

  return (
    <aside
      className={`bg-[#060c18] border-r border-[#15233e] flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center py-3 w-full">
        {/* Top Warning Shield Status Icon */}
        <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-xl bg-[#0e192f] border border-[#1b2f54] text-[#19c7f3] shadow-inner">
          <AlertTriangle className="w-5 h-5 text-[#19c7f3] animate-pulse" />
        </div>

        {/* Navigation Item Icons */}
        <div className="flex flex-col gap-1.5 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`relative group flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#112444] to-[#19335f] text-[#19c7f3] border border-[#19c7f3]/40 shadow-[0_0_15px_rgba(25,199,243,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1527] border border-transparent'
                }`}
                title={!isExpanded ? `${item.label} (${item.badge})` : undefined}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#19c7f3] rounded-r shadow-[0_0_8px_#19c7f3]" />
                )}

                <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#19c7f3]' : ''}`} />

                {/* Expanded Label & Badge */}
                {isExpanded && (
                  <div className="ml-3 flex items-center justify-between w-full overflow-hidden text-left">
                    <span className="text-xs font-medium tracking-wide truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                        item.isDemo
                          ? 'bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/40'
                          : isActive
                          ? 'bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30'
                          : 'bg-[#111c33] text-slate-400 border border-[#1b2c4e]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Live Demo Pulsing Dot when collapsed */}
                {!isExpanded && item.isDemo && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#20d6a1] shadow-[0_0_6px_#20d6a1]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center py-3 w-full border-t border-[#15233e] px-2 gap-2">
        {/* Toggle Expand / Collapse */}
        <button
          onClick={onToggleExpand}
          className="flex items-center justify-center w-full py-2 rounded-lg text-slate-400 hover:text-[#19c7f3] hover:bg-[#0d1628] transition-all"
          title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? (
            <div className="flex items-center gap-2 text-xs font-mono-tech">
              <ChevronLeft className="w-4 h-4 text-[#19c7f3]" />
              <span>COLLAPSE NAV</span>
            </div>
          ) : (
            <ChevronRight className="w-4 h-4 text-[#19c7f3]" />
          )}
        </button>

        {/* Reset / Restart Prototype Score */}
        <button
          onClick={onResetStats}
          className="flex items-center justify-center w-full py-2 rounded-lg text-slate-400 hover:text-[#ff6577] hover:bg-[#1f0f18] transition-all"
          title="Reset Demo Simulation State"
        >
          <LogOut className="w-4 h-4" />
          {isExpanded && (
            <span className="ml-2 text-xs font-mono-tech">RESET DEMO</span>
          )}
        </button>
      </div>
    </aside>
  );
};
