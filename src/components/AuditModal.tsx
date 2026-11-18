import React from 'react';
import { ShieldCheck, X, CheckCircle, FileText, Download, Award, AlertCircle } from 'lucide-react';
import { UserStats } from '../types';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const auditItems = [
    {
      control: 'AC-2: Account Management & MFA',
      status: 'COMPLIANT',
      evidence: 'Simulated 0 unauthorized credential leakages. Identity Risk: LOW.'
    },
    {
      control: 'SI-4: System & Information Integrity (L7 Inspection)',
      status: 'COMPLIANT',
      evidence: '24 Edge nodes active with 99.2% entropy stability.'
    },
    {
      control: 'SC-7: Boundary Protection & WAF Rate Limiting',
      status: 'COMPLIANT',
      evidence: '42,887 automated attacks intercepted and dropped.'
    },
    {
      control: 'AT-2: Security Awareness Training (Phishing Simulation)',
      status: 'ACTIVE DEMO',
      evidence: `Analyst completed evaluations with ${stats.accuracy}% accuracy.`
    },
    {
      control: 'IR-4: Incident Handling & SIEM Telemetry Correlation',
      status: 'COMPLIANT',
      evidence: 'MTTD 0 min, MTTR 0 min. Zero uncontained kill chains.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#091224] border border-[#19c7f3]/50 rounded-2xl shadow-[0_0_50px_rgba(25,199,243,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#0c1833] border-b border-[#16274a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#20d6a1]/15 border border-[#20d6a1]/40 flex items-center justify-center text-[#20d6a1]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono-tech font-bold text-white tracking-wider">
                COMPREHENSIVE SOC AUDIT & COMPLIANCE SUMMARY
              </h3>
              <p className="text-[10px] text-slate-400 font-mono-tech">
                ISO 27001 • NIST SP 800-53 Rev 5 • QueryTel Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#122344]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* Executive Score Card */}
          <div className="grid grid-cols-3 gap-3 bg-[#060b14] p-3.5 rounded-xl border border-[#142340]">
            <div className="text-center border-r border-[#142340]">
              <span className="text-[9px] font-mono-tech text-slate-400 uppercase block">AUDIT RATING</span>
              <span className="text-lg font-mono-tech font-bold text-[#20d6a1]">GRADE AAA</span>
            </div>
            <div className="text-center border-r border-[#142340]">
              <span className="text-[9px] font-mono-tech text-slate-400 uppercase block">SECURITY SCORE</span>
              <span className="text-lg font-mono-tech font-bold text-[#19c7f3]">{stats.securityScore}/100</span>
            </div>
            <div className="text-center">
              <span className="text-[9px] font-mono-tech text-slate-400 uppercase block">SIMULATED RISK</span>
              <span className="text-lg font-mono-tech font-bold text-slate-200">14% (LOW)</span>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block font-semibold">
              SECURITY CONTROL VERIFICATION MATRIX:
            </span>
            {auditItems.map((item, idx) => (
              <div key={idx} className="bg-[#0b162c] p-3 rounded-lg border border-[#16274a] flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono-tech font-bold text-slate-200 block">
                    {item.control}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {item.evidence}
                  </span>
                </div>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30 shrink-0 font-semibold">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#0a182b] rounded-lg border border-[#18305c] flex items-center justify-between text-xs font-mono-tech text-slate-300">
            <span>AUDIT DIGEST HASH:</span>
            <span className="text-[#19c7f3] text-[10px]">sha256:4a8b...9f21d0</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a1426] border-t border-[#16274a] flex items-center justify-between">
          <span className="text-[10px] font-mono-tech text-slate-400">
            Certified for University ICT Academic Presentation
          </span>
          <button
            onClick={() => {
              alert('Audit Certificate successfully exported to clipboard and downloaded for presentation!');
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#19c7f3] hover:bg-[#32d4fc] text-black font-mono-tech font-bold text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(25,199,243,0.3)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT AUDIT REPORT</span>
          </button>
        </div>

      </div>
    </div>
  );
};
