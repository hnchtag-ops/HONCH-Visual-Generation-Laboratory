import React, { useState } from 'react';
import { Download, RefreshCw, ChevronDown, ChevronUp, Camera, Sparkles, Sliders, ArrowLeft, Check, Aperture, Sun, Eye, Box, Film, Wand2, Layout } from 'lucide-react';
import { GeneratedImageItem } from '../types';

interface OutputViewProps {
  item: GeneratedImageItem;
  onRegenerate: () => void;
  onMoreRealistic: () => void;
  onMoreSurreal: () => void;
  onChangeCamera: () => void;
  onNewRequest: () => void;
}

export const OutputView: React.FC<OutputViewProps> = ({
  item,
  onRegenerate,
  onMoreRealistic,
  onMoreSurreal,
  onChangeCamera,
  onNewRequest,
}) => {
  const [showPhotographedMeta, setShowPhotographedMeta] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');

  const handleDownload = () => {
    try {
      // If base64 or image URL, trigger download with selected format filename extension
      const link = document.createElement('a');
      link.href = item.imageUrl;
      link.download = `HONCH_${item.id}.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (e) {
      console.error('Download failed:', e);
    }
  };

  // Derive camera spec breakdowns
  const cameraText = item.spec.camera || '85MM · F/2.8 · ICONIC HERO';
  const lightingText = item.spec.lighting || 'REMBRANDT / DIRECTIONAL KEY LIGHT';
  const opticalText = item.spec.spatialDepth || 'EDITORIAL OPTICAL SEPARATION';
  const finishText = item.spec.finish || 'PRISTINE LARGE FORMAT CLARITY';
  const aspectRatioText = item.aspectRatio || '1:1';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center animate-fade-in space-y-6">
      {/* Top Bar Navigation */}
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onNewRequest}
          className="flex items-center gap-2 text-xs font-mono-spec text-[#a1a1aa] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          NEW CONCEPT
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-spec tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded border border-[#d4af37]/20 uppercase">
            {aspectRatioText} FRAME
          </span>
          <span className="text-[10px] font-mono-spec tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded border border-[#d4af37]/20 uppercase hidden sm:inline-block">
            HONCH PHOTOGRAPHIC DIRECTORIAL RESULT
          </span>
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative w-full max-w-4xl rounded-lg border border-[#27272a] bg-[#0d0d0e] p-2 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="relative w-full overflow-hidden rounded bg-black flex items-center justify-center min-h-[400px] max-h-[75vh]">
          <img
            src={item.imageUrl}
            alt={item.conceptPrompt}
            className="w-full h-auto max-h-[75vh] object-contain mx-auto rounded"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Concept Caption */}
        <div className="mt-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#1c1c20] pt-3">
          <p className="text-xs font-sans-ui text-[#e4e4e7] italic">
            &ldquo;{item.conceptPrompt}&rdquo;
          </p>
          <span className="text-[10px] font-mono-spec text-[#71717a] shrink-0">
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {aspectRatioText} FORMAT
          </span>
        </div>
      </div>

      {/* Expandable "How HONCH photographed this" Metadata Section */}
      <div className="w-full max-w-4xl rounded-lg border border-[#232328] bg-[#111114] overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPhotographedMeta(!showPhotographedMeta)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#16161a] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-[#d4af37]" />
            <span className="font-mono-spec text-xs font-bold text-white tracking-widest uppercase">
              How HONCH photographed this
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#a1a1aa]">
            <span>{showPhotographedMeta ? 'COLLAPSE' : 'EXPAND DETAILS'}</span>
            {showPhotographedMeta ? <ChevronUp className="w-3.5 h-3.5 text-[#d4af37]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />}
          </div>
        </button>

        {showPhotographedMeta && (
          <div className="px-5 pb-5 pt-2 border-t border-[#1c1c20] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono-spec animate-fade-in">
            {/* Aspect Format */}
            <div className="p-3 bg-[#0a0a0c] border border-[#222228] rounded">
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase mb-1">
                <Layout className="w-3 h-3" />
                FRAME FORMAT
              </div>
              <p className="text-white font-bold tracking-wide">{aspectRatioText} ASPECT</p>
            </div>

            {/* Camera / Lens */}
            <div className="p-3 bg-[#0a0a0c] border border-[#222228] rounded">
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase mb-1">
                <Aperture className="w-3 h-3" />
                CAMERA &amp; LENS
              </div>
              <p className="text-white font-bold tracking-wide truncate">{cameraText}</p>
            </div>

            {/* Lighting */}
            <div className="p-3 bg-[#0a0a0c] border border-[#222228] rounded">
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase mb-1">
                <Sun className="w-3 h-3" />
                LIGHTING SCHEMA
              </div>
              <p className="text-white font-bold tracking-wide truncate">{lightingText}</p>
            </div>

            {/* Optical & Atmosphere */}
            <div className="p-3 bg-[#0a0a0c] border border-[#222228] rounded">
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase mb-1">
                <Eye className="w-3 h-3" />
                OPTICAL PROFILE
              </div>
              <p className="text-white font-bold tracking-wide truncate">{opticalText}</p>
            </div>

            {/* Material & Finish */}
            <div className="p-3 bg-[#0a0a0c] border border-[#222228] rounded">
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase mb-1">
                <Film className="w-3 h-3" />
                FINISH &amp; MATERIAL
              </div>
              <p className="text-white font-bold tracking-wide truncate">{finishText}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Row: Regenerate, More Realistic, More Surreal, Change Camera, Export Format & Save */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-4xl pt-2">
        {/* REGENERATE */}
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#18181c] hover:bg-[#23232a] text-[#e4e4e7] hover:text-white border border-[#2d2d35] font-mono-spec text-xs tracking-wider uppercase rounded transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#d4af37]" />
          REGENERATE
        </button>

        {/* MORE REALISTIC */}
        <button
          onClick={onMoreRealistic}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#18181c] hover:bg-[#23232a] text-[#e4e4e7] hover:text-white border border-[#2d2d35] font-mono-spec text-xs tracking-wider uppercase rounded transition-all duration-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          MORE REALISTIC
        </button>

        {/* MORE SURREAL */}
        <button
          onClick={onMoreSurreal}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#18181c] hover:bg-[#23232a] text-[#e4e4e7] hover:text-white border border-[#2d2d35] font-mono-spec text-xs tracking-wider uppercase rounded transition-all duration-200"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#d4af37]" />
          MORE SURREAL
        </button>

        {/* CHANGE CAMERA */}
        <button
          onClick={onChangeCamera}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#18181c] hover:bg-[#23232a] text-[#e4e4e7] hover:text-white border border-[#2d2d35] font-mono-spec text-xs tracking-wider uppercase rounded transition-all duration-200"
        >
          <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
          CHANGE CAMERA
        </button>

        {/* EXPORT FILE FORMAT + SAVE GROUP */}
        <div className="flex items-center gap-1.5 bg-[#121215] border border-[#2d2d35] p-1 rounded-md">
          <div className="flex items-center px-1 text-[10px] font-mono-spec text-[#71717a] font-bold uppercase">
            FORMAT:
          </div>
          {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setExportFormat(fmt)}
              className={`px-2 py-1 text-[10px] font-mono-spec font-bold uppercase rounded transition-colors ${
                exportFormat === fmt
                  ? 'bg-[#d4af37] text-black'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#1f1f24]'
              }`}
            >
              .{fmt}
            </button>
          ))}

          {/* SAVE BUTTON */}
          <button
            onClick={handleDownload}
            className="ml-1 flex items-center gap-1.5 px-4 py-2 bg-[#d4af37] hover:bg-[#f4e09f] text-black font-mono-spec font-bold text-xs tracking-wider uppercase rounded transition-all duration-200 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                SAVED
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                SAVE
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
