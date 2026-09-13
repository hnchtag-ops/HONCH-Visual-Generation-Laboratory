import React from 'react';
import { X, Aperture, Sun, Eye, Sliders, Film, Compass, Box } from 'lucide-react';
import { VisualSpecification } from '../types';

interface SpecificationPanelProps {
  spec: VisualSpecification;
  isOpen: boolean;
  onClose: () => void;
  conceptPrompt: string;
}

export const SpecificationPanel: React.FC<SpecificationPanelProps> = ({
  spec,
  isOpen,
  onClose,
  conceptPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#0e0e11] border-l border-[#232328] h-full overflow-y-auto p-6 text-[#e4e4e7] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1c1c20] mb-6">
            <div>
              <span className="text-[10px] font-mono-spec tracking-[0.2em] text-[#d4af37] uppercase">
                AUTOMATED ART DIRECTION
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-0.5">
                HONCH Visual Specification
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#1c1c21] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs font-mono-spec text-[#a1a1aa] bg-[#141417] p-3 rounded border border-[#232328] mb-6">
            <span className="text-[#71717a] block text-[10px] uppercase mb-1">USER CONCEPT</span>
            <p className="text-white italic">&ldquo;{conceptPrompt}&rdquo;</p>
          </div>

          {/* Primary Specs Highlight */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-[#141418] border border-[#27272e] p-3.5 rounded-md">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <Aperture className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono-spec tracking-widest uppercase">CAMERA SYSTEM</span>
              </div>
              <p className="text-sm font-mono-spec font-bold text-white tracking-wide">
                {spec.camera || '80MM · F/2.8 · MEDIUM FORMAT'}
              </p>
            </div>

            <div className="bg-[#141418] border border-[#27272e] p-3.5 rounded-md">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono-spec tracking-widest uppercase">LIGHTING SETUP</span>
              </div>
              <p className="text-sm font-mono-spec font-bold text-white tracking-wide">
                {spec.lighting || 'REMBRANDT / DIRECTIONAL KEY'}
              </p>
            </div>

            <div className="bg-[#141418] border border-[#27272e] p-3.5 rounded-md">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <Eye className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono-spec tracking-widest uppercase">SPATIAL DEPTH</span>
              </div>
              <p className="text-sm font-mono-spec font-bold text-white tracking-wide">
                {spec.spatialDepth || 'EDITORIAL OPTICAL SEPARATION'}
              </p>
            </div>

            <div className="bg-[#141418] border border-[#27272e] p-3.5 rounded-md">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <Box className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono-spec tracking-widest uppercase">MATERIAL RESPONSE</span>
              </div>
              <p className="text-sm font-mono-spec font-bold text-white tracking-wide">
                {spec.materials || 'PHYSICAL SURFACE RESPONSE'}
              </p>
            </div>

            <div className="bg-[#141418] border border-[#27272e] p-3.5 rounded-md">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <Film className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono-spec tracking-widest uppercase">FINISH & TEXTURE</span>
              </div>
              <p className="text-sm font-mono-spec font-bold text-white tracking-wide">
                {spec.finish || 'CINEMATIC GRADE / SUBTLE FILM TEXTURE'}
              </p>
            </div>
          </div>

          {/* Full 14-Point Grid */}
          <div className="border-t border-[#1c1c22] pt-4">
            <h4 className="text-[11px] font-mono-spec tracking-widest text-[#71717a] uppercase mb-3 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
              FULL 14-POINT SPECIFICATION METADATA
            </h4>

            <div className="space-y-2.5 font-mono-spec text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">1. SUBJECT</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.subject}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">2. ACTION</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.action}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">3. IMPOSSIBLE IDEA</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.impossibleIdea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">4. OBJECTS</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">
                  {spec.objects?.join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">5. ENVIRONMENT</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.environment}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">6. GEOMETRY</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.geometry}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">7. PERSPECTIVE</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.perspective}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">8. PHYSICAL INTERACTION</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.physicalInteraction}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#18181c]">
                <span className="text-[#71717a]">9. COLOR PALETTE</span>
                <span className="text-[#d4d4d8] text-right font-medium max-w-[200px] truncate">{spec.color}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-[#1c1c22] text-center">
          <p className="text-[10px] font-mono-spec text-[#52525b] uppercase tracking-widest">
            AUTONOMOUS ART DIRECTION BY HONCH™
          </p>
        </div>
      </div>
    </div>
  );
};
