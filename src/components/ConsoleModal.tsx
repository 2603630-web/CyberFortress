import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Shield } from 'lucide-react';
import { mockSecurityEvents } from '../data/mockData';

interface ConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsoleModal: React.FC<ConsoleModalProps> = ({ isOpen, onClose }) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'CyberFortress Sentinel Security Shell [v2.4.0-enterprise]',
    '(c) 2026 QueryTel Platform. All simulated telemetry isolated.',
    '',
    'Type "help" for a list of operational diagnostic commands.',
    'System status: 24/24 edge nodes reporting normal telemetry. Zero critical escalations.'
  ]);
  const [commandInput, setCommandInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, `root@sentinel-l3:~# ${commandInput}`];

    if (cmd === 'help') {
      newLogs.push(
        'Available Diagnostic Commands:',
        '  status    - Print live health of 24 inspection nodes & L7 status',
        '  scan      - Execute synthetic heuristic vulnerability probe',
        '  events    - Display recent SIEM security events and firewall blocks',
        '  nodes     - List active clusters (Gateway, Deep Inspection, Vault)',
        '  entropy   - Check neural network stability metric',
        '  clear     - Wipe terminal output buffer',
        '  exit      - Terminate shell session'
      );
    } else if (cmd === 'status') {
      newLogs.push(
        '[STATUS REPORT]',
        '  CORE DEFENSE   : ONLINE',
        '  GLOBAL RISK    : 14 (LOW THREAT)',
        '  MTTD / MTTR    : 0 min (Automated Block Active)',
        '  KILL CHAIN     : NONE DETECTED',
        '  ACTIVE MODULE  : Phishing Awareness Simulator (Module 01 Ready)'
      );
    } else if (cmd === 'scan') {
      newLogs.push(
        '[SCAN INITIALIZED]',
        '  > Probing 10.0.0.0/16 subnet...',
        '  > Checking TLS certificates on port 443... [VALID]',
        '  > Analyzing DNS query entropy... [CLEAN - NO EXFILTRATION]',
        '  > Heuristic check finished: 0 anomalies, 42,887 historical threats blocked.'
      );
    } else if (cmd === 'events') {
      mockSecurityEvents.forEach(evt => {
        newLogs.push(`  [${evt.time}] ${evt.severity} | ${evt.type} | SRC: ${evt.sourceIp} | STATUS: ${evt.status}`);
      });
    } else if (cmd === 'nodes') {
      newLogs.push(
        '  [NODE-ALPHA] 192.168.1.10 - Edge Gateway - LOAD: 14% [ONLINE]',
        '  [NODE-BETA]  192.168.1.11 - DPI Inspection - LOAD: 32% [ONLINE]',
        '  [NODE-GAMMA] 192.168.1.12 - Core DB Vault - LOAD: 8% [ONLINE]',
        '  [NODE-DELTA] 192.168.1.13 - Standby Failover - LOAD: 0% [IDLE]'
      );
    } else if (cmd === 'entropy') {
      newLogs.push('  SYSTEM ENTROPY: 99.2% STABLE. Neural variance < 0.04% over past 10,000 requests.');
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCommandInput('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newLogs.push(`command not recognized: "${cmd}". Type "help" for syntax.`);
    }

    setTerminalLogs(newLogs);
    setCommandInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-3xl bg-[#060b14] border border-[#19c7f3]/60 rounded-xl shadow-[0_0_40px_rgba(25,199,243,0.3)] flex flex-col h-[520px] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="p-3 bg-[#0a1224] border-b border-[#142340] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff6577] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#20d6a1] inline-block"></span>
            </div>
            <span className="text-xs font-mono-tech text-slate-300 ml-2">
              root@sentinel-l3: /var/log/neural-awareness (bash)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono-tech text-xs text-[#20d6a1] space-y-1 bg-[#040810]">
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {log}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-[#081020] border-t border-[#142340]">
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-xs font-mono-tech text-[#19c7f3] shrink-0">
              root@sentinel-l3:~#
            </span>
            <input
              type="text"
              autoFocus
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="type help, status, scan, events, nodes, clear..."
              className="flex-1 bg-transparent border-none text-xs font-mono-tech text-white focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="text-slate-400 hover:text-[#19c7f3]"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
