import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  ShieldCheck, 
  Filter, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Server, 
  Activity, 
  ArrowUpRight,
  Eye,
  Lock,
  Unlock,
  CheckCircle
} from 'lucide-react';
import { SecurityEvent, UserStats } from '../types';
import { mockSecurityEvents, threatTrendData } from '../data/mockData';

interface SocDashboardViewProps {
  stats: UserStats;
  onBackToDashboard: () => void;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const SocDashboardView: React.FC<SocDashboardViewProps> = ({
  stats,
  onBackToDashboard,
  onUpdateStats,
}) => {
  const [events, setEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'6h' | '12h' | '24h'>('6h');
  const [activeTab, setActiveTab] = useState<'live-stream' | 'analytics' | 'playbooks'>('live-stream');

  // Filter events
  const filteredEvents = events.filter(ev => {
    const matchesSeverity = severityFilter === 'ALL' || ev.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || ev.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      ev.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  // Triage / Status change handler
  const handleUpdateStatus = (eventId: string, newStatus: SecurityEvent['status']) => {
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, status: newStatus } : ev));
  };

  // Metrics
  const totalEvents = events.length;
  const criticalCount = events.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;
  const blockedCount = events.filter(e => e.status === 'BLOCKED').length;
  const reviewedCount = events.filter(e => e.status === 'REVIEWED' || e.status === 'RESOLVED').length;

  // SVG dimensions for chart
  const svgWidth = 800;
  const svgHeight = 160;
  const maxVal = 20000;

  const points = threatTrendData.map((d, index) => {
    const x = (index / (threatTrendData.length - 1)) * svgWidth;
    const y = svgHeight - (d.value / maxVal) * (svgHeight - 20) - 10;
    return { x, y, ...d };
  });

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
    <div className="flex-1 p-4 md:p-6 space-y-6 max-w-[1700px] mx-auto select-none overflow-y-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#0d1c38] via-[#091428] to-[#0d1c38] border border-[#19c7f3]/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(25,199,243,0.15)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#142646] border border-[#19c7f3]/60 flex items-center justify-center text-[#19c7f3]">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#20d6a1]/20 text-[#20d6a1] border border-[#20d6a1]/40 font-bold uppercase">
                ACTIVE SIEM TELEMETRY
              </span>
              <span className="text-xs font-mono-tech text-slate-400">SOC-L2 Triage Console</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold font-display text-white mt-0.5">
              Mini SOC Dashboard & Incident Response
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-[#0b162c] hover:bg-[#122344] border border-[#1a335c] text-slate-200 font-mono-tech text-xs transition-all"
          >
            ← Back to Main Dashboard
          </button>
        </div>
      </div>

      {/* METRIC STATUS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">TOTAL SECURITY EVENTS</span>
            <div className="text-2xl font-extrabold font-mono-tech text-white mt-1">{totalEvents}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#19c7f3]/10 border border-[#19c7f3]/30 flex items-center justify-center text-[#19c7f3]">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">CRITICAL / HIGH ALERTS</span>
            <div className="text-2xl font-extrabold font-mono-tech text-[#ef4444] mt-1">{criticalCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-center justify-center text-[#ef4444]">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">BLOCKED THREATS</span>
            <div className="text-2xl font-extrabold font-mono-tech text-[#20d6a1] mt-1">{blockedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#20d6a1]/10 border border-[#20d6a1]/30 flex items-center justify-center text-[#20d6a1]">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#091224] border border-[#1b2c4e] rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">REVIEWED / RESOLVED</span>
            <div className="text-2xl font-extrabold font-mono-tech text-[#19c7f3] mt-1">{reviewedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/10 border border-[#7c5cfc]/30 flex items-center justify-center text-[#7c5cfc]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TABS & CONTROLS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#070e1e] p-4 rounded-xl border border-[#172d56]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('live-stream')}
            className={`px-4 py-2 rounded-lg font-mono-tech text-xs font-bold transition-all ${activeTab === 'live-stream' ? 'bg-[#19c7f3] text-[#050a14] shadow-[0_0_15px_rgba(25,199,243,0.4)]' : 'bg-[#0b162c] text-slate-300 hover:text-white'}`}
          >
            Live Syslog & Event Triage
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg font-mono-tech text-xs font-bold transition-all ${activeTab === 'analytics' ? 'bg-[#19c7f3] text-[#050a14] shadow-[0_0_15px_rgba(25,199,243,0.4)]' : 'bg-[#0b162c] text-slate-300 hover:text-white'}`}
          >
            Telemetry & Chart Analytics
          </button>
        </div>

        {activeTab === 'live-stream' && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search IP, Event, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#050a14] border border-[#1b2c4e] rounded-xl pl-9 pr-4 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-[#19c7f3] w-48"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-[#050a14] border border-[#1b2c4e] rounded-xl px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-[#19c7f3]"
            >
              <option value="ALL">Severity: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="OK">OK / Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#050a14] border border-[#1b2c4e] rounded-xl px-3 py-2 text-xs font-mono-tech text-white focus:outline-none focus:border-[#19c7f3]"
            >
              <option value="ALL">Status: All</option>
              <option value="BLOCKED">Blocked</option>
              <option value="DETECTED">Detected</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB CONTENT: LIVE STREAM & EVENT TABLE */}
      {activeTab === 'live-stream' && (
        <div className="bg-[#070e1e] border border-[#172d56] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-[#091224] border-b border-[#172d56] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#20d6a1] animate-pulse"></span>
              <span className="font-mono-tech text-xs text-white font-bold tracking-wider">SECURITY EVENT LOG TABLE (SQLITE STORED)</span>
            </div>
            <span className="text-[10px] font-mono-tech text-slate-400">Showing {filteredEvents.length} of {events.length} events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#172d56] text-[11px] font-mono-tech text-slate-400 bg-[#050a14]/50">
                  <th className="p-3.5">TIMESTAMP</th>
                  <th className="p-3.5">EVENT ID</th>
                  <th className="p-3.5">EVENT TYPE</th>
                  <th className="p-3.5">SOURCE IP</th>
                  <th className="p-3.5">TARGET NODE</th>
                  <th className="p-3.5">SEVERITY</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-right">TRIAGE ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172d56]/50 text-xs font-mono-tech">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No security events match your current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((ev) => {
                    const sevColor = 
                      ev.severity === 'CRITICAL' ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40' :
                      ev.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                      ev.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                      'bg-[#20d6a1]/20 text-[#20d6a1] border-[#20d6a1]/40';

                    const statusColor =
                      ev.status === 'BLOCKED' ? 'text-[#20d6a1] bg-[#20d6a1]/10 border-[#20d6a1]/30' :
                      ev.status === 'DETECTED' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                      ev.status === 'REVIEWED' ? 'text-[#19c7f3] bg-[#19c7f3]/10 border-[#19c7f3]/30' :
                      'text-slate-300 bg-slate-500/10 border-slate-500/30';

                    return (
                      <tr key={ev.id} className="hover:bg-[#0b162c]/60 transition-colors">
                        <td className="p-3.5 text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {ev.time}
                        </td>
                        <td className="p-3.5 text-[#19c7f3] font-bold">{ev.id}</td>
                        <td className="p-3.5 text-white font-semibold">
                          <div>{ev.type}</div>
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">{ev.details}</div>
                        </td>
                        <td className="p-3.5 text-slate-300 font-mono">{ev.sourceIp}</td>
                        <td className="p-3.5 text-slate-300">{ev.target}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${sevColor}`}>
                            {ev.severity}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${statusColor}`}>
                            {ev.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ev.status !== 'BLOCKED' && (
                              <button
                                onClick={() => handleUpdateStatus(ev.id, 'BLOCKED')}
                                className="px-2.5 py-1 rounded bg-[#20d6a1]/20 hover:bg-[#20d6a1]/30 text-[#20d6a1] border border-[#20d6a1]/40 text-[10px] font-bold transition-all"
                                title="Block IP / Contain Threat"
                              >
                                Block
                              </button>
                            )}
                            {ev.status !== 'REVIEWED' && (
                              <button
                                onClick={() => handleUpdateStatus(ev.id, 'REVIEWED')}
                                className="px-2.5 py-1 rounded bg-[#19c7f3]/20 hover:bg-[#19c7f3]/30 text-[#19c7f3] border border-[#19c7f3]/40 text-[10px] font-bold transition-all"
                                title="Mark as Reviewed"
                              >
                                Review
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ANALYTICS & CHART.JS VISUALIZATIONS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Threat Volume Trend Chart */}
            <div className="bg-[#070e1e] border border-[#172d56] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-mono-tech text-white font-bold">Threat Volume Over Time</h3>
                  <p className="text-[11px] font-mono-tech text-slate-400">Simulated SIEM telemetry trend stream (Chart.js / SVG)</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['6h', '12h', '24h'] as const).map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono-tech font-bold transition-all ${selectedTimeRange === range ? 'bg-[#19c7f3] text-[#050a14]' : 'bg-[#091224] text-slate-300 hover:text-white'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="relative w-full h-[200px] bg-[#050a14] rounded-xl border border-[#172d56] p-3 flex flex-col justify-end">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="socAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#19c7f3" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#19c7f3" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2={svgWidth} y2="40" stroke="#172d56" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" y1="80" x2={svgWidth} y2="80" stroke="#172d56" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="0" y1="120" x2={svgWidth} y2="120" stroke="#172d56" strokeDasharray="4 4" strokeWidth="1" />

                  {/* Area Path */}
                  <path d={areaPath} fill="url(#socAreaGrad)" />

                  {/* Smooth Line Path */}
                  <path d={linePath} fill="none" stroke="#19c7f3" strokeWidth="2.5" />

                  {/* Data Points */}
                  {points.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      className="fill-[#19c7f3] stroke-[#050a14] stroke-2 hover:scale-150 transition-all cursor-pointer"
                    />
                  ))}
                </svg>
                <div className="flex justify-between text-[10px] font-mono-tech text-slate-400 mt-2 border-t border-[#172d56] pt-1.5">
                  <span>04:00 AM</span>
                  <span>05:00 AM</span>
                  <span>06:00 AM</span>
                </div>
              </div>
            </div>

            {/* Severity Distribution Breakdown */}
            <div className="bg-[#070e1e] border border-[#172d56] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-mono-tech text-white font-bold mb-1">Alert Severity Distribution</h3>
                <p className="text-[11px] font-mono-tech text-slate-400 mb-6">Percentage breakdown of intercepted security events</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono-tech mb-1">
                    <span className="text-[#ef4444] font-bold">Critical / High Severity</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#050a14] rounded-full overflow-hidden border border-[#172d56]">
                    <div className="h-full bg-[#ef4444] rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono-tech mb-1">
                    <span className="text-amber-400 font-bold">Medium Severity</span>
                    <span className="text-white">40%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#050a14] rounded-full overflow-hidden border border-[#172d56]">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono-tech mb-1">
                    <span className="text-[#20d6a1] font-bold">Low / OK / Resolved</span>
                    <span className="text-white">25%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#050a14] rounded-full overflow-hidden border border-[#172d56]">
                    <div className="h-full bg-[#20d6a1] rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#172d56] flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                <span>Database Table: <code className="text-[#19c7f3]">security_events</code></span>
                <span className="text-[#20d6a1]">● SQLite Synchronized</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
