import React from 'react';
import { AppTab } from '../types';

// Icons mapping since we can't depend on uninstalled packages in this specific prompt format easily, 
// but assuming standard Lucide icons are available or I will create SVG helpers.
// I will create simple SVG components here to be dependency-free.

const IconHome = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

interface NavigationProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, setTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
      <button 
        onClick={() => setTab(AppTab.HOME)}
        className={`flex flex-col items-center gap-1 transition-colors ${currentTab === AppTab.HOME ? 'text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
      >
        <IconHome className="w-6 h-6" />
        <span className="text-xs font-serif tracking-wider">聖殿</span>
      </button>

      <button 
        onClick={() => setTab(AppTab.DIVINATION)}
        className={`relative -top-6 bg-gradient-to-tr from-fuchsia-600 to-violet-600 p-4 rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] border border-white/20 transition-transform hover:scale-105 active:scale-95 ${currentTab === AppTab.DIVINATION ? 'ring-2 ring-white/50' : ''}`}
      >
        <IconSparkles className="w-8 h-8 text-white" />
      </button>

      <button 
        onClick={() => setTab(AppTab.COMMUNITY)}
        className={`flex flex-col items-center gap-1 transition-colors ${currentTab === AppTab.COMMUNITY ? 'text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
      >
        <IconUsers className="w-6 h-6" />
        <span className="text-xs font-serif tracking-wider">社群</span>
      </button>
    </div>
  );
};

export default Navigation;