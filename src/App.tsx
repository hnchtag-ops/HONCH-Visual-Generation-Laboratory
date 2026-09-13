import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CreateView } from './components/CreateView';
import { OutputView } from './components/OutputView';
import { LibraryView } from './components/LibraryView';
import { GenerationSynthesis } from './components/GenerationSynthesis';
import { GeneratedImageItem, ReferenceImageData } from './types';
import { CameraPresetId, FinishProfileId, AdvancedCameraParams } from './services/cameraPresets';
import { AlertCircle, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'honch_generation_history_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'library'>('create');
  const [history, setHistory] = useState<GeneratedImageItem[]>([]);
  const [currentItem, setCurrentItem] = useState<GeneratedImageItem | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatingPrompt, setGeneratingPrompt] = useState<string>('');
  const [errorInfo, setErrorInfo] = useState<{
    message: string;
    isQuota: boolean;
    lastParams?: {
      conceptPrompt: string;
      sourceImage: { base64: string; mimeType: string; previewUrl: string } | null;
      referenceImage: ReferenceImageData | null;
      materialInspiration: string | null;
      cameraPreset?: CameraPresetId;
      finishProfile?: FinishProfileId;
      advancedCameraParams?: AdvancedCameraParams;
    };
  } | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  // Save history to localStorage safely without quota exceptions
  const saveHistory = (newHistory: GeneratedImageItem[]) => {
    setHistory(newHistory);
    let itemsToSave = [...newHistory];
    while (itemsToSave.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave));
        break;
      } catch (e) {
        itemsToSave = itemsToSave.slice(0, itemsToSave.length - 1);
        if (itemsToSave.length === 0) {
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (_) {}
          break;
        }
      }
    }
  };

  const handleGenerate = async (
    conceptPrompt: string,
    sourceImage: { base64: string; mimeType: string; previewUrl: string } | null,
    referenceImage: ReferenceImageData | null = null,
    materialInspiration: string | null = null,
    cameraPreset?: CameraPresetId,
    finishProfile?: FinishProfileId,
    advancedCameraParams?: AdvancedCameraParams,
    aspectRatio: string = '1:1'
  ) => {
    setIsGenerating(true);
    setGeneratingPrompt(conceptPrompt);
    setErrorInfo(null);

    const currentParams = {
      conceptPrompt,
      sourceImage,
      referenceImage,
      materialInspiration,
      cameraPreset,
      finishProfile,
      advancedCameraParams,
      aspectRatio,
    };

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptPrompt,
          sourceImageBase64: sourceImage?.base64,
          sourceImageMimeType: sourceImage?.mimeType,
          referenceImageBase64: referenceImage?.base64,
          referenceImageMimeType: referenceImage?.mimeType,
          referenceStrength: referenceImage?.strength,
          aspectRatio,
          materialInspiration: materialInspiration || undefined,
          cameraPreset: cameraPreset || 'hero',
          finishProfile: finishProfile || 'pristine',
          advancedCameraParams,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData.error || `Generation failed with status ${res.status}`;
        const isQuota = errMsg.toLowerCase().includes('429') || errMsg.toLowerCase().includes('depleted') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('resource_exhausted');
        throw { message: errMsg, isQuota };
      }

      const newItem: GeneratedImageItem = await res.json();
      setCurrentItem(newItem);

      const updatedHistory = [newItem, ...history];
      saveHistory(updatedHistory);
    } catch (err: any) {
      console.error('Generation Error:', err);
      const isQuota = err?.isQuota || Boolean(err?.message && (err.message.includes('429') || err.message.includes('depleted') || err.message.includes('quota')));
      setErrorInfo({
        message: isQuota
          ? 'Generation limit reached. Try again when your available requests reset.'
          : "Your image couldn't be generated this time.",
        isQuota,
        lastParams: currentParams,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    if (errorInfo?.lastParams) {
      const p = errorInfo.lastParams;
      handleGenerate(
        p.conceptPrompt,
        p.sourceImage,
        p.referenceImage,
        p.materialInspiration,
        p.cameraPreset,
        p.finishProfile,
        p.advancedCameraParams,
        (p as any).aspectRatio || '1:1'
      );
    }
  };

  const handleRegenerate = () => {
    if (!currentItem) return;
    handleGenerate(
      currentItem.conceptPrompt,
      null,
      null,
      null,
      currentItem.cameraPreset,
      currentItem.finishProfile,
      currentItem.advancedCameraParams,
      currentItem.aspectRatio || '1:1'
    );
  };

  const handleMoreRealistic = () => {
    if (!currentItem) return;
    const realisticPrompt = `${currentItem.conceptPrompt} — Photographed with grounded physical realism, exact contact shadows, realistic material response, natural optical depth.`;
    handleGenerate(
      realisticPrompt,
      null,
      null,
      null,
      currentItem.cameraPreset,
      'pristine',
      currentItem.advancedCameraParams,
      currentItem.aspectRatio || '1:1'
    );
  };

  const handleMoreSurreal = () => {
    if (!currentItem) return;
    const surrealPrompt = `${currentItem.conceptPrompt} — Heightened surreal contrast, striking physical impossibility, dramatic scale, grounded photographic context.`;
    handleGenerate(
      surrealPrompt,
      null,
      null,
      null,
      currentItem.cameraPreset,
      currentItem.finishProfile,
      currentItem.advancedCameraParams,
      currentItem.aspectRatio || '1:1'
    );
  };

  const handleChangeCamera = () => {
    if (!currentItem) return;
    const presets: CameraPresetId[] = ['hero', 'immersive', 'observer', 'cinema'];
    const currentIndex = presets.indexOf(currentItem.cameraPreset || 'hero');
    const nextPreset = presets[(currentIndex + 1) % presets.length];
    handleGenerate(
      currentItem.conceptPrompt,
      null,
      null,
      null,
      nextPreset,
      currentItem.finishProfile,
      currentItem.advancedCameraParams,
      currentItem.aspectRatio || '1:1'
    );
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all generations from archive?')) {
      saveHistory([]);
      setCurrentItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-[#e4e4e7] flex flex-col font-sans-ui selection:bg-[#d4af37]/30 selection:text-[#f4e09f]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {/* Error Alert Banner */}
        {errorInfo && (
          <div className="max-w-4xl mx-auto px-4 mt-6 animate-fade-in">
            <div className="bg-[#1a1213] border border-red-800/70 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-red-200 text-xs font-mono-spec shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-950/80 rounded-md border border-red-800/80 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <span className="font-bold uppercase tracking-widest text-red-400 text-xs block">
                    GENERATION PAUSED
                  </span>
                  <p className="mt-1 text-red-200 font-sans-ui text-xs sm:text-sm">
                    {errorInfo.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {errorInfo.lastParams && (
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#f4e09f] text-black font-mono-spec font-bold text-xs tracking-wider uppercase rounded transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => setErrorInfo(null)}
                  className="text-red-400 hover:text-white text-xs underline font-mono-spec"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Synthesis Overlay Modal */}
        {isGenerating && (
          <GenerationSynthesis conceptPrompt={generatingPrompt} />
        )}

        {/* Dynamic View Controller */}
        {activeTab === 'library' ? (
          <LibraryView
            history={history}
            onSelectImage={(item) => {
              setCurrentItem(item);
              setActiveTab('create');
            }}
            onClearHistory={handleClearHistory}
            onRegenerateItem={(item) => {
              handleGenerate(item.conceptPrompt, null, null, null, item.cameraPreset, item.finishProfile);
            }}
          />
        ) : currentItem && !isGenerating ? (
          <OutputView
            item={currentItem}
            onRegenerate={handleRegenerate}
            onMoreRealistic={handleMoreRealistic}
            onMoreSurreal={handleMoreSurreal}
            onChangeCamera={handleChangeCamera}
            onNewRequest={() => setCurrentItem(null)}
          />
        ) : (
          <CreateView
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-[#18181c] py-6 px-6 text-center bg-[#09090b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs tracking-wider text-white">
              HONCH<span className="text-[#d4af37]">™</span>
            </span>
            <span className="text-[10px] font-mono-spec text-[#52525b]">
              · IMAGE ENGINE
            </span>
          </div>
          <p className="text-[10px] font-mono-spec text-[#52525b] uppercase tracking-widest">
            THE USER PROVIDES AN IDEA &amp; REFERENCE. HONCH DETERMINES HOW IT IS PHOTOGRAPHED.
          </p>
        </div>
      </footer>
    </div>
  );
}
