import React, { useState } from 'react';
import { GeneratedImageItem } from '../types';
import { Download, Sliders, RefreshCw, Trash2, Camera, Layers } from 'lucide-react';
import { SpecificationPanel } from './SpecificationPanel';

interface LibraryViewProps {
  history: GeneratedImageItem[];
  onSelectImage: (item: GeneratedImageItem) => void;
  onClearHistory: () => void;
  onRegenerateItem: (item: GeneratedImageItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  history,
  onSelectImage,
  onClearHistory,
  onRegenerateItem,
}) => {
  const [selectedSpecItem, setSelectedSpecItem] = useState<GeneratedImageItem | null>(null);

  if (history.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#141417] border border-[#27272e] flex items-center justify-center text-[#71717a] mx-auto mb-4">
          <Camera className="w-7 h-7 stroke-[1.5]" />
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-2">
          Your Library is Empty
        </h3>
        <p className="text-xs font-mono-spec text-[#71717a] max-w-sm mx-auto mb-6">
          Generations created in HONCH Laboratory will be stored here for review, variation, and technical specification analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1c1c20] mb-8">
        <div>
          <span className="text-[10px] font-mono-spec tracking-[0.25em] text-[#d4af37] uppercase font-medium">
            COMMERCIAL RESULTS SHOWCASE
          </span>
          <h2 className="font-display font-black text-3xl text-white tracking-commercial-headline mt-0.5">
            Generation Library ({history.length})
          </h2>
        </div>

        <button
          onClick={onClearHistory}
          className="flex items-center gap-2 text-xs font-mono-spec text-[#71717a] hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          CLEAR ARCHIVE
        </button>
      </div>

      {/* Grid of Generations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="group bg-[#121215] border border-[#232328] hover:border-[#d4af37]/50 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div
              onClick={() => onSelectImage(item)}
              className="relative aspect-square w-full bg-black cursor-pointer overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.conceptPrompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[10px] font-mono-spec tracking-wider text-[#f4e09f] uppercase bg-black/70 px-2 py-1 rounded border border-[#d4af37]/30">
                  INSPECT EDITORIAL WORK
                </span>
              </div>
            </div>

            {/* Info Footer */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-sans-ui text-white font-medium line-clamp-2 mb-2">
                  &ldquo;{item.conceptPrompt}&rdquo;
                </p>
                <p className="text-[10px] font-mono-spec text-[#71717a] mb-4">
                  {new Date(item.createdAt).toLocaleDateString()} · {item.spec?.camera || '80MM MEDIUM FORMAT'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1c1c20] gap-2">
                <button
                  onClick={() => setSelectedSpecItem(item)}
                  className="flex items-center gap-1.5 text-[11px] font-mono-spec text-[#d4af37] hover:text-[#f4e09f]"
                  title="View Technical Specification"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  SPEC
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRegenerateItem(item)}
                    className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#1f1f24] rounded transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={item.imageUrl}
                    download={`HONCH_${item.id}.png`}
                    className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#1f1f24] rounded transition-colors"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Spec Inspector */}
      {selectedSpecItem && (
        <SpecificationPanel
          spec={selectedSpecItem.spec}
          isOpen={Boolean(selectedSpecItem)}
          onClose={() => setSelectedSpecItem(null)}
          conceptPrompt={selectedSpecItem.conceptPrompt}
        />
      )}
    </div>
  );
};
