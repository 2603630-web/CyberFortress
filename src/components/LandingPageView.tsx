import React, { useState, useRef } from 'react';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Terminal, 
  Lock, 
  MailWarning, 
  ShieldAlert, 
  KeyRound, 
  Smartphone, 
  Trophy, 
  Users, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Compass,
  ChevronDown,
  CheckCircle
} from 'lucide-react';

interface LandingPageViewProps {
  onEnterPlatform: () => void;
  onLaunchDemoModule: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterPlatform,
  onLaunchDemoModule,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050a14] text-slate-100 select-none">
      
      {/* 1. FULLSCREEN VIDEO HERO (100% VIEWPORT) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Fullscreen Background Video */}
        <video
          ref={videoRef}
          src="/landing-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />

        {/* Cinematic Overlays & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 via-[#050a14]/30 to-[#050a14] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#19c7f315_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10"></div>

        {/* Video Control Bar Top-Right */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mr-2">
            <span className="w-2 h-2 rounded-full bg-[#20d6a1] animate-ping"></span>
            <span className="text-[10px] font-mono-tech text-[#19c7f3]">IMMERSIVE FEED</span>
          </div>
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hero Overlay Center Content */}
        <div className="relative z-20 max-w-4xl px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1c38]/80 backdrop-blur-md border border-[#19c7f3]/50 text-xs font-mono-tech text-[#19c7f3] mb-6 shadow-[0_0_25px_rgba(25,199,243,0.3)] animate-pulse">
            <Users className="w-4 h-4 text-[#7c5cfc]" />
            <span className="font-bold tracking-wider">CYBERFORTRESS DEFENSE TEAM • LIVE SIMULATION INTRO</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight font-display text-white mb-4 drop-shadow-[0_0_40px_rgba(25,199,243,0.5)]">
            CyberFortress
          </h1>

          <div className="px-6 py-2.5 rounded-xl bg-[#070e1e]/80 backdrop-blur-md border border-[#19c7f3]/40 shadow-[0_0_30px_rgba(25,199,243,0.2)] mb-6">
            <p className="text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#20d6a1] via-[#19c7f3] to-[#818cf8] font-mono-tech tracking-widest uppercase font-extrabold">
              DETECT • DEFEND • RECOVER
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 font-mono-tech">
            Scroll down to explore the complete threat intelligence platform, architectural blueprint, and interactive security modules.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech font-bold text-sm shadow-[0_0_35px_rgba(25,199,243,0.6)] transition-all transform hover:scale-105 active:scale-95"
            >
              <span>CONTINUE TO DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToContent}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0b162c]/80 backdrop-blur-md hover:bg-[#122344] border border-[#1a335c] text-white font-mono-tech text-sm transition-all"
            >
              <span>Explore Landing Details</span>
              <ChevronDown className="w-4 h-4 text-[#19c7f3] animate-bounce" />
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator at bottom of viewport */}
        <div 
          onClick={scrollToContent}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group text-slate-400 hover:text-[#19c7f3] transition-colors"
        >
          <span className="text-[10px] font-mono-tech tracking-widest uppercase">Scroll Down to Reveal Landing Page</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#19c7f3]" />
        </div>

      </section>

      {/* 2. LANDING DETAILS & ARCHITECTURE SECTION (REVEALED ON SCROLL) */}
      <section className="py-24 px-4 md:px-8 max-w-[1500px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d1c38] border border-[#1b3464] text-xs font-mono-tech text-[#19c7f3] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#19c7f3]" />
            <span>QUERYTEL PLATFORM • SECURITY OPERATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white mb-4">
            Interactive Cyber Defense & Awareness
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-mono-tech">
            Engineered by <span className="text-[#19c7f3] font-bold">CyberFortress Defense Team</span> for academic presentation, practical threat analysis, and hands-on ICT demonstrations.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Phishing */}
          <div className="bg-[#091326] border border-[#19c7f3]/40 rounded-2xl p-6 hover:border-[#19c7f3] transition-all shadow-[0_0_25px_rgba(25,199,243,0.12)] relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#19c7f3]/15 flex items-center justify-center text-[#19c7f3] group-hover:scale-110 transition-transform">
                <MailWarning className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30 font-bold uppercase">
                Interactive Ready
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              01. Phishing Awareness Simulator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Realistic email client simulation. Classify malicious messages, identify typosquatted domains, and evaluate link destinations safely.
            </p>
            <button
              onClick={onLaunchDemoModule}
              className="text-xs font-mono-tech text-[#19c7f3] hover:underline flex items-center gap-1.5 font-semibold"
            >
              <span>Test Live Simulator Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Attack & Defense */}
          <div className="bg-[#091326] border border-[#152544] rounded-2xl p-6 hover:border-[#19c7f3]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#7c5cfc]/15 flex items-center justify-center text-[#7c5cfc]">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              02. Attack & Defense Simulator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Interactive node topology showing attacker, WAF, and server. Deploy rate limiting and firewall rules against SYN floods and brute-force.
            </p>
          </div>

          {/* Card 3: Password Checker */}
          <div className="bg-[#091326] border border-[#152544] rounded-2xl p-6 hover:border-[#19c7f3]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#20d6a1]/15 flex items-center justify-center text-[#20d6a1]">
                <KeyRound className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              03. Password Security Checker
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Client-side zero-storage entropy analyzer. Evaluates pattern strength, dictionary vulnerability, and GPU crack time estimations.
            </p>
          </div>

          {/* Card 4: MFA Demo */}
          <div className="bg-[#091326] border border-[#152544] rounded-2xl p-6 hover:border-[#19c7f3]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center text-[#f59e0b]">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              04. Multi-Factor Authentication
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Step-by-step practical comparison of passwords alone versus TOTP authenticators, SMS, and FIDO2 cryptographic tokens.
            </p>
          </div>

          {/* Card 5: Mini SOC */}
          <div className="bg-[#091326] border border-[#152544] rounded-2xl p-6 hover:border-[#19c7f3]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#19c7f3]/15 flex items-center justify-center text-[#19c7f3]">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              05. Mini SOC Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Compact Security Operations Center console with incident severity scoring, searchable event logs, and remediation workflows.
            </p>
          </div>

          {/* Card 6: CTF & Learning */}
          <div className="bg-[#091326] border border-[#152544] rounded-2xl p-6 hover:border-[#19c7f3]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#ff6577]/15 flex items-center justify-center text-[#ff6577]">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#101f3b] text-slate-400 border border-[#192f58]">
                COMING SOON
              </span>
            </div>
            <h3 className="text-lg font-bold font-mono-tech text-white mb-2">
              06. CTF Challenges & Learning
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Solve safe ciphers, log forensics, and security flags formatted as CS&#123;...&#125; with leaderboards and verifiable badges.
            </p>
          </div>

        </div>

        {/* BOTTOM CONTINUE TO DASHBOARD BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0d1c38] via-[#12264a] to-[#0d1c38] border-2 border-[#19c7f3]/50 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(25,199,243,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#19c7f315_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono-tech text-[#20d6a1] tracking-widest uppercase font-bold block mb-2">
              READY FOR OPERATIONAL DEPLOYMENT
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-4">
              Enter the CyberFortress Sentinel Operations Center
            </h3>
            <p className="text-sm text-slate-300 mb-8 font-mono-tech">
              Experience real-time threat telemetry, live SOC analytics, AI Copilot, and interactive defense simulation labs.
            </p>
            <button
              onClick={onEnterPlatform}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-[#19c7f3] hover:bg-[#34d4fc] text-[#050a14] font-mono-tech font-bold text-base shadow-[0_0_35px_rgba(25,199,243,0.6)] transition-all transform hover:scale-105 active:scale-95"
            >
              <span>CONTINUE TO DASHBOARD</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[#13223f] text-center text-xs font-mono-tech text-slate-500">
        <p>CyberFortress — Interactive Cybersecurity Awareness & Simulation Platform • CyberFortress Defense Team 2026</p>
        <p className="text-[10px] mt-1 text-slate-600">Motto: DETECT • DEFEND • RECOVER. All simulated educational telemetry isolated from production networks.</p>
      </footer>

    </div>
  );
};
