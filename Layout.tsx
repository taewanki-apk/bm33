
import React from 'react';
import { TabType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col pb-20 shadow-xl overflow-hidden">
      {/* Header */}
      <header className="golf-gradient text-white p-6 shadow-md relative">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 gold-border overflow-hidden">
                    <img src="https://picsum.photos/seed/golf/100/100" alt="BM Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-tight">배명고 33기</h1>
                    <p className="text-xs opacity-80">응답하라 1987 골프 모임</p>
                </div>
            </div>
            <div className="text-right">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">2026 SEASON</span>
            </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-50">
        <NavItem 
            active={activeTab === TabType.DASHBOARD} 
            onClick={() => setActiveTab(TabType.DASHBOARD)} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
            label="홈"
        />
        <NavItem 
            active={activeTab === TabType.ROUNDS} 
            onClick={() => setActiveTab(TabType.ROUNDS)} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
            label="라운딩"
        />
        <NavItem 
            active={activeTab === TabType.RANKING} 
            onClick={() => setActiveTab(TabType.RANKING)} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>}
            label="랭킹"
        />
        <NavItem 
            active={activeTab === TabType.ACCOUNTING} 
            onClick={() => setActiveTab(TabType.ACCOUNTING)} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1c.538-.1 1.074-.339 1.538-.701l.461-.351M12 16c-1.11 0-2.08-.402-2.599-1M12 16V15m0 1v-8m-1.401 1.701c-.538.1-1.074.339-1.538.701l-.461.351"></path></svg>}
            label="회계"
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center space-y-1 transition-colors ${active ? 'gold-text' : 'text-gray-400'}`}
    >
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default Layout;
