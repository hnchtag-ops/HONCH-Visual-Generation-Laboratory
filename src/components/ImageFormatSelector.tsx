import React from 'react';
import { Layout, Maximize2, Smartphone, Monitor, Image as ImageIcon } from 'lucide-react';

export type ImageAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageFormatOption {
  id: ImageAspectRatio;
  label: string;
  category: string;
  ratioText: string;
  resolutionHint: string;
  icon: React.ReactNode;
  shapeClass: string;
}

export const FORMAT_OPTIONS: ImageFormatOption[] = [
  {
    id: '1:1',
    label: 'Square Studio',
    category: 'Product & Still Life',
    ratioText: '1:1',
    resolutionHint: '1024 × 1024 px',
    icon: <Layout className="w-4 h-4" />,
    shapeClass: 'w-5 h-5',
  },
  {
    id: '16:9',
    label: 'Cinematic Widescreen',
    category: 'Display & Hero Banner',
    ratioText: '16:9',
    resolutionHint: '1344 × 768 px',
    icon: <Monitor className="w-4 h-4" />,
    shapeClass: 'w-6 h-3.5',
  },
  {
    id: '9:16',
    label: 'Vertical Story',
    category: 'Mobile & Social Editorial',
    ratioText: '9:16',
    resolutionHint: '768 × 1344 px',
    icon: <Smartphone className="w-4 h-4" />,
    shapeClass: 'w-3.5 h-6',
  },
  {
    id: '4:3',
    label: 'Medium Format',
    category: 'Classic Gallery & Print',
    ratioText: '4:3',
    resolutionHint: '1152 × 864 px',
    icon: <ImageIcon className="w-4 h-4" />,
    shapeClass: 'w-5.5 h-4',
  },
  {
    id: '3:4',
    label: 'Editorial Portrait',
    category: 'Fashion & Cover Art',
    ratioText: '3:4',
    resolutionHint: '864 × 1152 px',
    icon: <Maximize2 className="w-4 h-4" />,
    shapeClass: 'w-4 h-5.5',
  },
];

interface ImageFormatSelectorProps {
  selectedFormat: ImageAspectRatio;
  onSelectFormat: (format: ImageAspectRatio) => void;
}

export const ImageFormatSelector: React.FC<ImageFormatSelectorProps> = ({
  selectedFormat,
  onSelectFormat,
}) => {
  return (
    <div className="rounded-lg border border-[#232328] bg-[#111114] p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1c1c22]">
        <div>
          <h3 className="font-mono-spec text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            IMAGE FORMAT &amp; ASPECT RATIO
          </h3>
          <span className="text-[10px] font-mono-spec text-[#71717a]">
            Select frame dimensions and composition aspect geometry
          </span>
        </div>
        <span className="text-[10px] font-mono-spec text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded border border-[#d4af37]/20 uppercase">
          {selectedFormat} FORMAT
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {FORMAT_OPTIONS.map((opt) => {
          const isSelected = selectedFormat === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectFormat(opt.id)}
              className={`p-3 rounded-md border text-left flex flex-col justify-between transition-all duration-200 group relative ${
                isSelected
                  ? 'bg-[#1a1813] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-[#0a0a0c] border-[#222228] hover:border-[#3f3f4a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              {/* Aspect Visual Icon Frame */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`border rounded-sm flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-[#3f3f46] bg-[#161619] text-[#71717a] group-hover:border-[#71717a]'
                  } ${opt.shapeClass}`}
                >
                  <span className="text-[9px] font-mono-spec font-bold"></span>
                </div>
                <span
                  className={`text-[11px] font-mono-spec font-bold ${
                    isSelected ? 'text-[#d4af37]' : 'text-[#71717a]'
                  }`}
                >
                  {opt.ratioText}
                </span>
              </div>

              {/* Title & Info */}
              <div>
                <p className={`text-xs font-mono-spec font-bold leading-snug ${isSelected ? 'text-white' : 'text-[#e4e4e7]'}`}>
                  {opt.label}
                </p>
                <p className="text-[9px] font-sans-ui text-[#71717a] mt-0.5 truncate">
                  {opt.category}
                </p>
                <span className="text-[9px] font-mono-spec text-[#52525b] block mt-1">
                  {opt.resolutionHint}
                </span>
              </div>

              {/* Active Golden Bar Indicator */}
              {isSelected && (
                <div className="absolute top-0 left-3 right-3 h-[2px] bg-[#d4af37] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
