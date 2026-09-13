import React from 'react';
import { Camera, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'create' | 'library';
  setActiveTab: (tab: 'create' | 'library') => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, historyCount }) => {
  return (
    <header className="border-b border-[#1c1c1f] bg-[#0b0b0c]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#1f1f23] to-[#0d0d0e] border border-[#2d2d34] flex items-center justify-center text-[#d4af37] shadow-inner">
            <Camera className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl tracking-commercial-hero text-white flex items-center gap-1.5">
                HONCH<span className="text-[#d4af37] text-xs font-sans tracking-widest uppercase ml-0.5">™</span>
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono-spec tracking-widest text-[#f4e09f] bg-[#d4af37]/15 border border-[#d4af37]/30 rounded-full uppercase font-medium">
                IMAGE ENGINE
              </span>
            </div>
            <p className="text-[10px] font-mono-spec tracking-[0.2em] text-[#a1a1aa] uppercase mt-0.5 font-medium">
              VISUAL DIRECTION & OPTICAL SYNTHESIS
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-[#121214] p-1 rounded-md border border-[#1f1f23]">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-sans-ui tracking-wider uppercase transition-all duration-200 rounded ${
              activeTab === 'create'
                ? 'bg-[#1e1e24] text-white font-medium border border-[#33333d] shadow-sm'
                : 'text-[#909099] hover:text-white hover:bg-[#161619]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'create' ? 'text-[#d4af37]' : 'text-[#71717a]'}`} />
            CREATE
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-sans-ui tracking-wider uppercase transition-all duration-200 rounded relative ${
              activeTab === 'library'
                ? 'bg-[#1e1e24] text-white font-medium border border-[#33333d] shadow-sm'
                : 'text-[#909099] hover:text-white hover:bg-[#161619]'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${activeTab === 'library' ? 'text-[#d4af37]' : 'text-[#71717a]'}`} />
            LIBRARY
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono-spec bg-[#d4af37]/20 text-[#f4e09f] border border-[#d4af37]/30 rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
