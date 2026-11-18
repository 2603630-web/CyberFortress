import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PhishingDemoModule } from './components/PhishingDemoModule';
import { ComingSoonModule } from './components/ComingSoonModule';
import { LandingPageView } from './components/LandingPageView';
import { QuickCopilotModal } from './components/QuickCopilotModal';
import { ConsoleModal } from './components/ConsoleModal';
import { AuditModal } from './components/AuditModal';
import { initialUserStats } from './data/mockData';
import { ModuleId, UserStats } from './types';

export const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleId>('landing');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('cyberfortress_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialUserStats;
      }
    }
    return initialUserStats;
  });

  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Sync stats to localStorage
  useEffect(() => {
    localStorage.setItem('cyberfortress_stats', JSON.stringify(stats));
  }, [stats]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K triggers Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCopilotOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const handleResetStats = () => {
    if (window.confirm('Reset prototype simulation progress to baseline default?')) {
      setStats(initialUserStats);
      localStorage.removeItem('cyberfortress_stats');
      setCurrentModule('dashboard');
    }
  };

  const isLandingView = currentModule === 'landing';

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col font-sans">
      {/* Top Header matching reference UI (hidden on landing page) */}
      {!isLandingView && (
        <Header
          onOpenCopilot={() => setIsCopilotOpen(true)}
          onOpenConsole={() => setIsConsoleOpen(true)}
          onToggleLanding={() => setCurrentModule(prev => prev === 'landing' ? 'dashboard' : 'landing')}
          isLandingView={isLandingView}
          onSearchClick={() => setIsCopilotOpen(true)}
          onSelectModule={(id) => setCurrentModule(id)}
        />
      )}

      {/* Main Workspace with Left Sidebar & Content Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (visible on non-landing views) */}
        {!isLandingView && (
          <Sidebar
            currentModule={currentModule}
            onSelectModule={(id) => setCurrentModule(id)}
            isExpanded={isSidebarExpanded}
            onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
            onResetStats={handleResetStats}
          />
        )}

        {/* Dynamic Main View */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {isLandingView && (
            <LandingPageView
              onEnterPlatform={() => setCurrentModule('dashboard')}
              onLaunchDemoModule={() => setCurrentModule('phishing')}
            />
          )}

          {!isLandingView && currentModule === 'dashboard' && (
            <DashboardView
              stats={stats}
              onNavigateToModule={(id) => setCurrentModule(id)}
              onOpenConsole={() => setIsConsoleOpen(true)}
              onOpenAudit={() => setIsAuditOpen(true)}
            />
          )}

          {!isLandingView && currentModule === 'phishing' && (
            <PhishingDemoModule
              stats={stats}
              onUpdateStats={handleUpdateStats}
              onBackToDashboard={() => setCurrentModule('dashboard')}
            />
          )}

          {!isLandingView && currentModule !== 'dashboard' && currentModule !== 'phishing' && (
            <ComingSoonModule
              moduleId={currentModule}
              onNavigateToModule={(id) => setCurrentModule(id)}
              onBackToDashboard={() => setCurrentModule('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <QuickCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />

      <ConsoleModal
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />

      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        stats={stats}
      />
    </div>
  );
};

export default App;
