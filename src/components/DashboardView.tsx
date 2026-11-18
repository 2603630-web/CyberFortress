import React, { useState } from 'react';
import { 
  Zap, 
  AlertCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Target, 
  Lock, 
  Grid, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Cpu, 
  Server, 
  Terminal, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  KeyRound,
  Smartphone,
  Trophy
} from 'lucide-react';
import { UserStats, ModuleId } from '../types';
import { threatTrendData } from '../data/mockData';

interface DashboardViewProps {
  stats: UserStats;
  onNavigateToModule: (id: ModuleId) => void;
  onOpenConsole: () => void;
  onOpenAudit: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  onNavigateToModule,
  onOpenConsole,
  onOpenAudit,
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'6h' | '12h' | '24h'>('6h');
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<'severity' | 'volume'>('severity');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // SVG dimensions for Threat Trend Matrix Area Chart
  const svgWidth = 800;
  const svgHeight = 150;
  const maxVal = 20000;

  const points = threatTrendData.map((d, index) => {
    const x = (index / (threatTrendData.length - 1)) * svgWidth;
    const y = svgHeight - (d.value / maxVal) * (svgHeight - 20) - 10;
    return { x, y, ...d };
  });

  // Construct smooth SVG path using cubic bezier
  const createSmoothAreaPath = () => {
    if (points.length === 0) return { linePath: '', areaPath: '' };
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    const linePath = path;
    const areaPath = `${linePath} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;
    return { linePath, areaPath };
  };

  const { linePath, areaPath } = createSmoothAreaPath();

  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 max-w-[1700px] mx-auto select-none overflow-y-auto">
      
      {/* 3D GRAPHICAL CYBER DEFENSE COMMAND BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d1c38] via-[#091428] to-[#0d1c38] border border-[#19c7f3]/40 rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(25,199,243,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(#19c7f320_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none animate-pulse"></div>
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-[#19c7f3]/15 via-[#7c5cfc]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#142646] to-[#1e3a70] border border-[#19c7f3]/60 shadow-[0_0_20px_rgba(25,199,243,0.4)] flex items-center justify-center text-[#19c7f3] relative shrink-0">
              <ShieldCheck className="w-7 h-7 drop-shadow-[0_0_10px_#19c7f3]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#20d6a1] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#20d6a1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tech text-[#20d6a1] font-bold uppercase tracking-wider">
                  CYBERFORTRESS SENTINEL COMMAND CENTER
                </span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#19c7f3]/20 text-[#19c7f3] border border-[#19c7f3]/40">
                  DETECT • DEFEND • RECOVER
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold font-display text-white mt-0.5">
                Real-Time Threat Intelligence & 3D Telemetry Grid
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#060b14]/90 border border-[#172d56] px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">ACTIVE THREAT DEFENSE</span>
              <span className="text-sm font-mono-tech font-bold text-[#20d6a1]">42,887 ISOLATED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. TOP METRIC STATUS RIBBON */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2.5">
        
        {/* Global Cyber Risk Meter */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-2 bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex items-center gap-3 shadow-lg">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#162544"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#20d6a1"
                strokeWidth="4"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * stats.cyberRisk) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute font-mono-tech font-bold text-sm text-white">
              {stats.cyberRisk}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech tracking-wider text-slate-400 uppercase">
              GLOBAL CYBER RISK
            </span>
            <span className="text-xs font-mono-tech font-bold text-[#20d6a1] tracking-wide">
              {stats.threatLevel}
            </span>
          </div>
        </div>

        {/* MTTD */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            MTTD
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono-tech text-sm font-bold text-[#20d6a1]">0</span>
            <span className="text-[10px] text-slate-400 font-mono-tech">min</span>
          </div>
        </div>

        {/* MTTR */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            MTTR
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono-tech text-sm font-bold text-[#20d6a1]">0</span>
            <span className="text-[10px] text-slate-400 font-mono-tech">min</span>
          </div>
        </div>

        {/* KILL CHAIN */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            KILL CHAIN
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19c7f3]"></span>
            <span className="font-mono-tech text-xs font-bold text-[#19c7f3] tracking-wider">
              NONE
            </span>
          </div>
        </div>

        {/* DEBT */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            DEBT
          </span>
          <span className="font-mono-tech text-sm font-bold text-slate-200 mt-0.5">
            0
          </span>
        </div>

        {/* IDENTITY RISK */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            IDENTITY RISK
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs font-mono-tech text-[#20d6a1] font-bold">LOW</span>
            <span className="text-[10px] font-mono-tech text-slate-400">0 fails</span>
          </div>
        </div>

        {/* AI SHIELD */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <span className="text-[9px] font-mono-tech text-slate-400 uppercase tracking-wider">
            AI SHIELD
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#20d6a1] animate-pulse"></span>
            <span className="text-xs font-mono-tech text-[#20d6a1] font-bold">ACTIVE</span>
          </div>
        </div>

        {/* BLOCKED & CASES */}
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-2.5 flex flex-col justify-center shadow">
          <div className="flex justify-between items-center text-[9px] font-mono-tech text-slate-400 uppercase">
            <span>BLOCKED</span>
            <span>CASES</span>
          </div>
          <div className="flex justify-between items-baseline mt-0.5 font-mono-tech">
            <span className="text-xs font-bold text-[#7c5cfc]">
              {stats.blockedAttacks.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-400">0</span>
          </div>
        </div>

      </div>

      {/* 2. SECONDARY STAT CARDS ROW (7 Cards matching reference UI) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        
        {/* Security Events */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#19c7f3]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#19c7f3]/10 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#19c7f3]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30">
              +12%
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            SECURITY EVENTS
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            46,954
          </span>
        </div>

        {/* Critical Issues */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#ff6577]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#ff6577]/10 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-[#ff6577]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#ff6577]/15 text-[#ff6577] border border-[#ff6577]/30">
              -2%
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            CRITICAL ISSUES
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            752
          </span>
        </div>

        {/* Warnings */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#f59e0b]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
              +5%
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            WARNINGS
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            2,566
          </span>
        </div>

        {/* Normal Ops */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#20d6a1]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#20d6a1]/10 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20d6a1]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30">
              OK
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            NORMAL OPS
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            42,887
          </span>
        </div>

        {/* IPS Attacks */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#7c5cfc]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center">
              <Target className="w-3.5 h-3.5 text-[#7c5cfc]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30">
              ACTIVE
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            IPS ATTACKS
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            1,773
          </span>
        </div>

        {/* Auth Failures */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#f59e0b]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-[#f59e0b]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
              MONITOR
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            AUTH FAILURES
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            34
          </span>
        </div>

        {/* App Control */}
        <div className="bg-[#0b1426] border border-[#162544] hover:border-[#7c5cfc]/40 rounded-xl p-3.5 transition-all shadow-md group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center">
              <Grid className="w-3.5 h-3.5 text-[#7c5cfc]" />
            </div>
            <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30">
              SCANNING
            </span>
          </div>
          <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
            APP CONTROL
          </span>
          <span className="font-mono-tech text-xl font-bold text-white mt-1 block">
            507
          </span>
        </div>

      </div>

      {/* 3. INTERACTIVE DEMO MODULE QUICK BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d213f] via-[#102952] to-[#12193b] border border-[#19c7f3]/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_25px_rgba(25,199,243,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#19c7f3]/15 border border-[#19c7f3]/50 flex items-center justify-center text-[#19c7f3] shadow-md shrink-0">
            <Sparkles className="w-5 h-5 text-[#19c7f3] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech font-bold text-white tracking-wider">
                FEATURED INTERACTIVE MODULE: PHISHING AWARENESS SIMULATOR
              </span>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#20d6a1]/20 text-[#20d6a1] border border-[#20d6a1]/40 uppercase font-semibold">
                Live Prototype Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Inspect suspicious headers, analyze deceptive URLs, classify simulated threats, and earn XP towards your Learning Security Score ({stats.securityScore}/100).
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateToModule('phishing')}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech font-bold text-xs shadow-[0_0_15px_rgba(25,199,243,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          <span>LAUNCH DEMO LAB</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. MIDDLE CHART GRID (5 Columns matching reference UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5">
        
        {/* Card 1: THREAT LANDSCAPE (Col 1-2.5 ~ 2 cols on lg) */}
        <div className="lg:col-span-2 bg-[#091224] border border-[#162544] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
              THREAT LANDSCAPE
            </span>
          </div>

          {/* Donut Chart representation */}
          <div className="relative flex items-center justify-center py-2">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Background track */}
              <circle cx="64" cy="64" r="50" stroke="#101d36" strokeWidth="12" fill="none" />
              {/* Operational Segment (Mint / Cyan) */}
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke="#19c7f3"
                strokeWidth="12"
                strokeDasharray="314"
                strokeDashoffset="60"
                fill="none"
                strokeLinecap="round"
              />
              {/* Critical Segment (Pink / Coral) */}
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke="#ff6577"
                strokeWidth="12"
                strokeDasharray="314"
                strokeDashoffset="280"
                fill="none"
                strokeLinecap="round"
              />
              {/* Warning Segment (Amber) */}
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeDasharray="314"
                strokeDashoffset="295"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono-tech text-lg font-bold text-white tracking-tight">
                46.2k
              </span>
              <span className="text-[9px] font-mono-tech text-slate-400 tracking-widest uppercase">
                TOTAL
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 text-[9px] font-mono-tech text-slate-400 pt-2 border-t border-[#13223f]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#ff6577]"></span> CRITICAL
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#19c7f3]"></span> OPERATIONAL
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#f59e0b]"></span> WARNING
            </span>
          </div>
        </div>

        {/* Card 2: ATTACK VECTORS (Col 2-3 ~ 2 cols on lg) */}
        <div className="lg:col-span-2 bg-[#091224] border border-[#162544] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
              ATTACK VECTORS
            </span>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between h-36 px-1 pt-4 pb-1 relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-x-0 top-2 border-b border-[#142340]/60"></div>
            <div className="absolute inset-x-0 top-1/2 border-b border-[#142340]/60"></div>

            {/* IPS */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-4 rounded-t bg-gradient-to-t from-[#4f46e5] to-[#7c5cfc] hover:brightness-125 transition-all shadow-[0_0_8px_rgba(124,92,252,0.4)]"
                style={{ height: '35%' }}
                title="IPS: 1,773 events"
              />
              <span className="text-[8px] font-mono-tech text-slate-400">IPS</span>
            </div>

            {/* SSL */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-4 rounded-t bg-gradient-to-t from-[#4f46e5] to-[#7c5cfc] hover:brightness-125 transition-all shadow-[0_0_8px_rgba(124,92,252,0.4)]"
                style={{ height: '80%' }}
                title="SSL: 4,820 events"
              />
              <span className="text-[8px] font-mono-tech text-slate-400">SSL</span>
            </div>

            {/* DNS */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-4 rounded-t bg-gradient-to-t from-[#4f46e5] to-[#7c5cfc] hover:brightness-125 transition-all"
                style={{ height: '18%' }}
                title="DNS: 620 events"
              />
              <span className="text-[8px] font-mono-tech text-slate-400">DNS</span>
            </div>

            {/* AUTH */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-4 rounded-t bg-gradient-to-t from-[#4f46e5] to-[#7c5cfc] hover:brightness-125 transition-all"
                style={{ height: '8%' }}
                title="AUTH: 34 events"
              />
              <span className="text-[8px] font-mono-tech text-slate-400">AUTH</span>
            </div>

            {/* APP */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-4 rounded-t bg-gradient-to-t from-[#4f46e5] to-[#7c5cfc] hover:brightness-125 transition-all"
                style={{ height: '22%' }}
                title="APP: 507 events"
              />
              <span className="text-[8px] font-mono-tech text-slate-400">APP</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono-tech text-slate-400 pt-2 border-t border-[#13223f]">
            <span>SCALE: 0 - 6,000</span>
            <span className="text-[#19c7f3]">TOP: SSL TRAFFIC</span>
          </div>
        </div>

        {/* Card 3: TOP EGRESS DESTINATIONS (Col 3 ~ 3 cols on lg) */}
        <div className="lg:col-span-3 bg-[#091224] border border-[#162544] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
              TOP EGRESS DESTINATIONS
            </span>
          </div>

          {/* Segmented Ring */}
          <div className="relative flex items-center justify-center py-2">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#12203b" strokeWidth="10" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke="#20d6a1"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset="110"
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="50"
                stroke="#19c7f3"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset="220"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono-tech text-lg font-bold text-white tracking-tight">
                44.4k
              </span>
              <span className="text-[9px] font-mono-tech text-slate-400 tracking-widest uppercase">
                TOTAL
              </span>
            </div>
          </div>

          {/* Countries Legend */}
          <div className="grid grid-cols-5 gap-1 text-[8px] font-mono-tech text-slate-400 pt-2 border-t border-[#13223f] text-center">
            <span>■ AU</span>
            <span>■ CA</span>
            <span>■ DE</span>
            <span>■ GB</span>
            <span>■ IE</span>
            <span>■ IN</span>
            <span>■ NL</span>
            <span className="text-[#20d6a1]">■ PK</span>
            <span>■ SG</span>
            <span className="text-[#19c7f3]">■ US</span>
          </div>
        </div>

        {/* Card 4: MOST ACTIVE FIREWALL (Col 4 ~ 2.5 cols on lg) */}
        <div className="lg:col-span-2 bg-[#091224] border border-[#162544] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
              MOST ACTIVE FIREWALL
            </span>
          </div>

          {/* Pink/Magenta gradient bars */}
          <div className="flex items-end justify-between h-36 px-1 pt-4 pb-1">
            {[90, 75, 45, 38, 25, 20, 15, 12].map((height, i) => (
              <div key={i} className="flex flex-col items-center flex-1 mx-0.5">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#c026d3] via-[#ec4899] to-[#f43f5e] hover:brightness-125 transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono-tech text-slate-400 pt-2 border-t border-[#13223f]">
            <span>FW-PRIMARY-01</span>
            <span className="text-[#ec4899]">PEAK: 14.8k/s</span>
          </div>
        </div>

        {/* Card 5: INFRASTRUCTURE HEALTH (Col 5 ~ 3 cols on lg) */}
        <div className="lg:col-span-3 bg-[#091224] border border-[#162544] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider font-semibold">
              INFRASTRUCTURE HEALTH
            </span>
            <span className="text-[9px] font-mono-tech text-[#20d6a1] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20d6a1] animate-ping" />
              99.8% UPTIME
            </span>
          </div>

          <div className="space-y-2.5 my-auto">
            {/* Node 1 */}
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#16274a]">
              <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20d6a1]"></span>
                  Edge Gateway Alpha
                </span>
                <span className="text-slate-400">LOAD <strong className="text-white">14%</strong></span>
              </div>
              <div className="w-full h-1.5 bg-[#121f38] rounded-full overflow-hidden">
                <div className="h-full bg-[#20d6a1] rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>

            {/* Node 2 */}
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#16274a]">
              <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20d6a1]"></span>
                  Inspection Cluster Beta
                </span>
                <span className="text-slate-400">LOAD <strong className="text-white">32%</strong></span>
              </div>
              <div className="w-full h-1.5 bg-[#121f38] rounded-full overflow-hidden">
                <div className="h-full bg-[#19c7f3] rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            {/* Node 3 */}
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#16274a]">
              <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20d6a1]"></span>
                  Core Vault Gamma
                </span>
                <span className="text-slate-400">LOAD <strong className="text-white">8%</strong></span>
              </div>
              <div className="w-full h-1.5 bg-[#121f38] rounded-full overflow-hidden">
                <div className="h-full bg-[#7c5cfc] rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>

            {/* Node 4 */}
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#16274a]">
              <div className="flex justify-between items-center text-[10px] font-mono-tech mb-1">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                  Failover Standby Delta
                </span>
                <span className="text-slate-500">LOAD <strong className="text-slate-400">0%</strong></span>
              </div>
              <div className="w-full h-1.5 bg-[#121f38] rounded-full overflow-hidden">
                <div className="h-full bg-[#f59e0b]" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono-tech text-slate-400 pt-2 border-t border-[#13223f]">
            <span>ALL NODES HEALTHY</span>
            <span className="text-[#20d6a1]">ZERO PACKET LOSS</span>
          </div>
        </div>

      </div>

      {/* 5. BOTTOM SECTION: THREAT TREND MATRIX & NEURAL AWARENESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Threat Trend Matrix / Advanced Temporal Intelligence (8 cols on lg) */}
        <div className="lg:col-span-8 bg-[#091224] border border-[#162544] rounded-xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tech font-bold text-white tracking-wider uppercase">
                  THREAT TREND MATRIX
                </span>
                <span className="text-[10px] font-mono-tech text-[#19c7f3] flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#19c7f3]" />
                  ADVANCED TEMPORAL INTELLIGENCE
                </span>
              </div>
            </div>

            {/* Action / Filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button 
                onClick={() => setActiveAnalysisMode(activeAnalysisMode === 'severity' ? 'volume' : 'severity')}
                className="px-2 py-1 rounded bg-[#0e1b33] hover:bg-[#132444] border border-[#1a2d52] text-[9px] font-mono-tech text-slate-300 transition-colors uppercase"
              >
                ANALYSIS MODE: {activeAnalysisMode.toUpperCase()}
              </button>
              <button className="px-2 py-1 rounded bg-[#0e1b33] hover:bg-[#132444] border border-[#1a2d52] text-[9px] font-mono-tech text-slate-300 transition-colors uppercase">
                ALL ACTIVE DATA
              </button>
              <button 
                onClick={() => setSelectedTimeRange(selectedTimeRange === '6h' ? '12h' : selectedTimeRange === '12h' ? '24h' : '6h')}
                className="px-2 py-1 rounded bg-[#132549] border border-[#19c7f3]/40 text-[9px] font-mono-tech text-[#19c7f3] uppercase font-semibold"
              >
                LAST {selectedTimeRange.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Glowing Area Wave Chart */}
          <div className="relative w-full h-44 bg-[#060b14]/70 rounded-lg border border-[#121f38] overflow-hidden p-2 flex flex-col justify-end">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-36 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cyberAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#19c7f3" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#2563eb" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#091224" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Area */}
              <path d={areaPath} fill="url(#cyberAreaGrad)" />

              {/* Stroke */}
              <path
                d={linePath}
                fill="none"
                stroke="#19c7f3"
                strokeWidth="2.5"
                filter="url(#glow)"
              />

              {/* Interactive Data points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint === idx ? 5 : 2}
                  className="transition-all duration-200 cursor-pointer"
                  fill={hoveredPoint === idx ? '#ffffff' : '#19c7f3'}
                  stroke="#060b14"
                  strokeWidth="2"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredPoint !== null && (
              <div 
                className="absolute top-3 left-4 bg-[#0a1426] border border-[#19c7f3] rounded px-2.5 py-1 text-[10px] font-mono-tech shadow-lg"
              >
                <span className="text-[#19c7f3] font-bold">
                  {points[hoveredPoint].time}
                </span>: {points[hoveredPoint].value.toLocaleString()} events ({points[hoveredPoint].critical} critical, {points[hoveredPoint].blocked} blocked)
              </div>
            )}

            {/* Time labels under chart matching reference UI */}
            <div className="flex justify-between items-center text-[8px] font-mono-tech text-slate-500 pt-2 border-t border-[#121f38]">
              <span>4:00</span>
              <span>4:30</span>
              <span>5:00</span>
              <span>5:30</span>
              <span>6:00</span>
              <span>6:30</span>
              <span>7:00</span>
              <span>7:30</span>
              <span>8:00</span>
              <span>8:30</span>
              <span>9:00</span>
              <span>9:30</span>
              <span>10:00</span>
            </div>
          </div>
        </div>

        {/* Neural Awareness & Terminal Panel (4 cols on lg) */}
        <div className="lg:col-span-4 bg-[#091224] border border-[#162544] rounded-xl p-4 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-tech font-bold text-white tracking-wider uppercase">
                NEURAL AWARENESS
              </span>
              <button 
                onClick={onOpenConsole}
                className="text-slate-400 hover:text-[#19c7f3] transition-colors"
                title="Refresh AI inspection telemetry"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active AI Shield Quote Card */}
            <div className="bg-[#0b162c] border border-[#162a4e] rounded-lg p-3 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono-tech text-[#19c7f3]">
                <ShieldAlert className="w-4 h-4 text-[#19c7f3]" />
                <span className="font-semibold">ACTIVE AI SHIELD</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono-tech leading-relaxed">
                "Dynamic L7 inspection active across 24 edge nodes. No anomalous lateral movement detected in last 600s."
              </p>
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-20 h-20 bg-[#19c7f3]/5 rounded-full blur-xl pointer-events-none"></div>
            </div>

            {/* System Entropy Gauge */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono-tech">
                <span className="text-slate-400 uppercase tracking-wider">SYSTEM ENTROPY</span>
                <span className="text-[#20d6a1] font-bold">99.2% STABLE</span>
              </div>
              <div className="w-full h-2 bg-[#060b14] rounded-full overflow-hidden border border-[#152542]">
                <div 
                  className="h-full bg-gradient-to-r from-[#19c7f3] to-[#20d6a1] rounded-full shadow-[0_0_8px_#20d6a1]"
                  style={{ width: '99.2%' }}
                />
              </div>
            </div>
          </div>

          {/* Action buttons matching reference UI: CONSOLE & AUDIT */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#13223f]">
            <button
              onClick={onOpenConsole}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#0e1a32] hover:bg-[#132446] border border-[#1a2d52] hover:border-[#19c7f3]/40 text-slate-200 text-xs font-mono-tech transition-all group"
            >
              <Terminal className="w-3.5 h-3.5 text-[#19c7f3] group-hover:scale-110 transition-transform" />
              <span>&gt;_ CONSOLE</span>
            </button>

            <button
              onClick={onOpenAudit}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3b82f6] text-white text-xs font-mono-tech font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              <span>AUDIT &gt;</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. SIX CORE MODULES & GRAPHICAL DEFENSE MATRIX */}
      <div className="bg-[#091224] border border-[#162544] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#13223f] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#19c7f3] animate-ping" />
            <span className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
              SIX CORE CYBER DEFENSE & AWARENESS MODULES
            </span>
          </div>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30">
            GRAPHICAL TELEMETRY MATRIX
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Module 1: Phishing */}
          <div 
            onClick={() => onNavigateToModule('phishing')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#19c7f3] rounded-xl p-4 cursor-pointer transition-all group shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#19c7f3]/15 flex items-center justify-center text-[#19c7f3] group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30 font-bold uppercase">
                Interactive Lab
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#19c7f3] transition-colors">
              01. Phishing Awareness Simulator
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              Email inspection, typosquatted domain analysis, and instant scoring.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Score: {stats.xp} XP</span>
              <span className="text-[#19c7f3] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Launch Lab <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Module 2: Attack & Defense */}
          <div 
            onClick={() => onNavigateToModule('attack-defense')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#7c5cfc] rounded-xl p-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/15 flex items-center justify-center text-[#7c5cfc] group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                Modular Sandbox
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#7c5cfc] transition-colors">
              02. Attack & Defense Simulator
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              WAF mitigation, SYN flood packet filtering, and topology defense.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Status: Standby</span>
              <span className="text-[#7c5cfc] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Inspect <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Module 3: Password Checker */}
          <div 
            onClick={() => onNavigateToModule('password')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#20d6a1] rounded-xl p-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#20d6a1]/15 flex items-center justify-center text-[#20d6a1] group-hover:scale-110 transition-transform">
                <KeyRound className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                Entropy Tool
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#20d6a1] transition-colors">
              03. Password Security Checker
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              Zero-storage entropy analysis and GPU crack-time estimation.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Algorithm: SHA-256</span>
              <span className="text-[#20d6a1] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Analyze <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Module 4: MFA Demo */}
          <div 
            onClick={() => onNavigateToModule('mfa')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#f59e0b] rounded-xl p-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/15 flex items-center justify-center text-[#f59e0b] group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                Auth Lab
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#f59e0b] transition-colors">
              04. Multi-Factor Authentication
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              TOTP authenticator app comparison versus FIDO2 cryptographic tokens.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Protocol: RFC 6238</span>
              <span className="text-[#f59e0b] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Simulate <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Module 5: Mini SOC */}
          <div 
            onClick={() => onNavigateToModule('soc')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#19c7f3] rounded-xl p-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#19c7f3]/15 flex items-center justify-center text-[#19c7f3] group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#19c7f3]/15 text-[#19c7f3] border border-[#19c7f3]/30 font-bold uppercase">
                SIEM Console
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#19c7f3] transition-colors">
              05. Mini SOC Dashboard
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              Incident severity scoring, live log stream, and remediation playbooks.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Events: 46.9k/s</span>
              <span className="text-[#19c7f3] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Open SOC <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Module 6: CTF & Learning */}
          <div 
            onClick={() => onNavigateToModule('ctf')}
            className="bg-[#0b162c] hover:bg-[#0f1f3d] border border-[#16274a] hover:border-[#ff6577] rounded-xl p-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff6577]/15 flex items-center justify-center text-[#ff6577] group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#ff6577]/15 text-[#ff6577] border border-[#ff6577]/30 font-bold uppercase">
                Challenge Arena
              </span>
            </div>
            <h4 className="text-sm font-bold font-mono-tech text-white mb-1 group-hover:text-[#ff6577] transition-colors">
              06. CTF Challenges & Learning
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
              Solve forensic ciphers, submit flags as CS&#123;...&#125; and earn certificates.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono-tech pt-2 border-t border-[#13223f]">
              <span className="text-slate-400">Badges: Unlocked</span>
              <span className="text-[#ff6577] flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                Play CTF <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
