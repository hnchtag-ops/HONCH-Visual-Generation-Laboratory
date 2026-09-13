import React, { useEffect, useState } from 'react';
import { Camera, Check, Sparkles } from 'lucide-react';

interface GenerationSynthesisProps {
  conceptPrompt: string;
}

export const GenerationSynthesis: React.FC<GenerationSynthesisProps> = ({ conceptPrompt }) => {
  const [progressStep, setProgressStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressStep((prev) => (prev < 9 ? prev + 1 : prev));
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const refSteps = [
    'Composition analyzed',
    'Perspective analyzed',
    'Lighting analyzed',
    'Materials analyzed',
  ];

  const sceneSteps = [
    'Scale resolved',
    'Environment resolved',
    'Shadows resolved',
    'Reflections resolved',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
      {/* Background Subtle Aperture Glow */}
      <div className="absolute w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Animated Camera / Aperture Symbol */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border border-[#d4af37]/40 bg-[#121215] flex items-center justify-center text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-pulse">
            <Camera className="w-8 h-8 stroke-[1.2]" />
          </div>
          <div className="absolute -inset-2 border border-dashed border-[#d4af37]/20 rounded-full animate-spin [animation-duration:12s]" />
        </div>

        {/* Brand Title */}
        <h2 className="font-display font-bold text-2xl text-white tracking-wider flex items-center justify-center gap-1.5">
          HONCH<span className="text-[#d4af37] text-xs font-sans tracking-widest uppercase">™</span>
        </h2>
        <p className="text-xs font-mono-spec tracking-[0.2em] text-[#d4af37] uppercase mt-1 mb-5">
          VISUAL SYNTHESIS
        </p>

        {/* User Prompt Echo */}
        <div className="w-full bg-[#121215] border border-[#23232a] p-3 rounded-md mb-6 text-left">
          <span className="text-[10px] font-mono-spec text-[#71717a] uppercase tracking-widest block mb-1">
            CONCEPT INGESTION
          </span>
          <p className="text-xs font-sans-ui text-[#d4d4d8] italic line-clamp-2">
            &ldquo;{conceptPrompt}&rdquo;
          </p>
        </div>

        {/* UNDERSTANDING REFERENCE SECTION */}
        <div className="w-full space-y-3 text-left font-mono-spec text-xs">
          <div className="bg-[#121215] border border-[#232328] p-3 rounded-md">
            <span className="text-[10px] font-mono-spec text-[#d4af37] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              UNDERSTANDING REFERENCE
            </span>
            <div className="space-y-1.5 pl-1">
              {refSteps.map((label, idx) => {
                const isComplete = progressStep > idx;
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-2 transition-colors duration-300 ${
                      isComplete ? 'text-white' : 'text-[#52525b]'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isComplete ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'border border-[#3f3f46] text-transparent'
                      }`}
                    >
                      {isComplete ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : ''}
                    </span>
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONSTRUCTING SCENE SECTION */}
          <div className="bg-[#121215] border border-[#232328] p-3 rounded-md">
            <span className="text-[10px] font-mono-spec text-[#d4af37] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              CONSTRUCTING SCENE
            </span>
            <div className="space-y-1.5 pl-1">
              {sceneSteps.map((label, idx) => {
                const isComplete = progressStep > idx + 4;
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-2 transition-colors duration-300 ${
                      isComplete ? 'text-white' : 'text-[#52525b]'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isComplete ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'border border-[#3f3f46] text-transparent'
                      }`}
                    >
                      {isComplete ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : ''}
                    </span>
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GENERATING STATUS */}
          <div className="bg-[#181613] border border-[#d4af37]/50 p-3 rounded-md flex items-center justify-between">
            <span className="text-xs font-mono-spec text-[#f4e09f] font-bold uppercase tracking-widest">
              GENERATING
            </span>
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

