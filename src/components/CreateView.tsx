import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { SourceImageUploader } from './SourceImageUploader';
import { ReferenceImageUploader } from './ReferenceImageUploader';
import { MaterialLibrary } from './MaterialLibrary';
import { CameraSelector } from './CameraSelector';
import { ImageFormatSelector, ImageAspectRatio } from './ImageFormatSelector';
import { CameraPresetId, FinishProfileId, AdvancedCameraParams } from '../services/cameraPresets';
import { ReferenceImageData, ReferenceStrength } from '../types';

interface CreateViewProps {
  onGenerate: (
    conceptPrompt: string,
    sourceImage: { base64: string; mimeType: string; previewUrl: string } | null,
    referenceImage: ReferenceImageData | null,
    materialInspiration: string | null,
    cameraPreset?: CameraPresetId,
    finishProfile?: FinishProfileId,
    advancedCameraParams?: AdvancedCameraParams,
    aspectRatio?: ImageAspectRatio
  ) => void;
  isGenerating: boolean;
}

const SAMPLE_CONCEPTS = [
  'A luxury perfume bottle carved out of volcanic obsidian stone.',
  'A high-top sneaker composed of layered liquid chrome and silk.',
  'An archway floating over a silent mirror-still ocean at dawn.',
  'A classic leather chair submerged inside translucent blue glacial ice.',
];

export const CreateView: React.FC<CreateViewProps> = ({ onGenerate, isGenerating }) => {
  const [conceptPrompt, setConceptPrompt] = useState('');
  const [sourceImage, setSourceImage] = useState<{
    base64: string;
    mimeType: string;
    previewUrl: string;
  } | null>(null);
  const [referenceImage, setReferenceImage] = useState<ReferenceImageData | null>(null);
  const [referenceStrength, setReferenceStrength] = useState<ReferenceStrength>('balanced');
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>('1:1');
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('hero');
  const [finishProfile, setFinishProfile] = useState<FinishProfileId>('pristine');
  const [advancedCameraParams, setAdvancedCameraParams] = useState<AdvancedCameraParams>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conceptPrompt.trim()) return;

    const refDataWithStrength = referenceImage
      ? { ...referenceImage, strength: referenceStrength }
      : null;

    onGenerate(
      conceptPrompt.trim(),
      sourceImage,
      refDataWithStrength,
      selectedMaterial,
      cameraPreset,
      finishProfile,
      advancedCameraParams,
      aspectRatio
    );
  };

  const handleSelectSample = (sample: string) => {
    setConceptPrompt(sample);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
      {/* Cinematic Studio Frame */}
      <div className="relative border border-[#232328] bg-gradient-to-b from-[#121215] to-[#0d0d0e] rounded-lg p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Subtle top gold accent line */}
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono-spec tracking-[0.3em] text-[#d4af37] uppercase block mb-2 font-medium">
            HONCH™ VISUAL DIRECTION SYSTEM
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-commercial-hero leading-tight">
            What do you want to create?
          </h2>
          <p className="text-xs sm:text-sm font-sans-ui text-[#a1a1aa] mt-3 max-w-lg mx-auto leading-relaxed">
            Provide your raw concept and optional reference image. HONCH determines composition, camera profile, optical DNA, lighting schema, and material realism.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1 & 2: SOURCE & REFERENCE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SOURCE IMAGE */}
            <div className="rounded-lg border border-[#232328] bg-[#111114] p-5 shadow-lg flex flex-col justify-between">
              <div className="mb-3 pb-2 border-b border-[#1c1c22]">
                <h3 className="font-mono-spec text-xs font-bold text-white tracking-widest uppercase">
                  1. SOURCE SUBJECT
                </h3>
                <span className="text-[10px] font-mono-spec text-[#71717a]">
                  Structural item, pose, or geometry input (Optional)
                </span>
              </div>
              <SourceImageUploader
                sourceImage={sourceImage}
                setSourceImage={setSourceImage}
              />
            </div>

            {/* REFERENCE IMAGE */}
            <div className="flex flex-col justify-between">
              <ReferenceImageUploader
                referenceImage={referenceImage}
                setReferenceImage={setReferenceImage}
                strength={referenceStrength}
                setStrength={setReferenceStrength}
              />
            </div>
          </div>

          {/* STEP 3: IMAGINE CONCEPT INGESTION */}
          <div className="space-y-3 pt-2 border-t border-[#1a1a1e]">
            <label className="block text-[11px] font-mono-spec tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
              3. CONCEPT INGESTION
            </label>
            <div className="relative">
              <textarea
                value={conceptPrompt}
                onChange={(e) => setConceptPrompt(e.target.value)}
                placeholder="Describe your idea in plain language (e.g., 'Put an enormous black chess piece in the middle of the street')..."
                rows={4}
                className="w-full bg-[#0a0a0c] border border-[#2d2d34] focus:border-[#d4af37] rounded-md p-4 md:p-5 text-sm sm:text-base font-sans-ui text-white placeholder-[#52525b] outline-none transition-all duration-200 resize-none shadow-inner"
              />
              {conceptPrompt.length > 0 && (
                <span className="absolute bottom-3 right-3 text-[10px] font-mono-spec text-[#52525b]">
                  {conceptPrompt.length} chars
                </span>
              )}
            </div>

            {/* Sample Concept Shortcuts */}
            <div className="pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono-spec text-[#71717a] mb-2 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-[#d4af37]" />
                CONCEPT INSPIRATION
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_CONCEPTS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="text-left text-xs font-sans-ui text-[#a1a1aa] hover:text-white bg-[#161619] hover:bg-[#1f1f24] border border-[#27272e] hover:border-[#3f3f4a] px-3 py-1.5 rounded transition-all duration-200"
                  >
                    &ldquo;{sample}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: IMAGE FORMAT & CAMERA DIRECTION */}
          <div className="space-y-4 pt-2 border-t border-[#1a1a1e]">
            {/* Image Format Option Selector */}
            <ImageFormatSelector
              selectedFormat={aspectRatio}
              onSelectFormat={setAspectRatio}
            />

            <CameraSelector
              selectedPreset={cameraPreset}
              onSelectPreset={setCameraPreset}
              selectedFinish={finishProfile}
              onSelectFinish={setFinishProfile}
              advancedParams={advancedCameraParams}
              onUpdateAdvancedParams={setAdvancedCameraParams}
            />

            {/* Primary Dominant GENERATE Button */}
            <div className="pt-2 flex justify-start">
              <button
                type="submit"
                disabled={!conceptPrompt.trim() || isGenerating}
                className={`w-full sm:w-auto min-w-[320px] px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#f4e09f] to-[#d4af37] text-black font-mono-spec font-bold text-sm tracking-[0.18em] uppercase rounded-md shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-3 ${
                  !conceptPrompt.trim() || isGenerating
                    ? 'opacity-50 cursor-not-allowed shadow-none'
                    : 'hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                GENERATE
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Material Realism Showcase */}
          <MaterialLibrary
            selectedMaterial={selectedMaterial}
            onSelectMaterial={setSelectedMaterial}
          />
        </form>
      </div>
    </div>
  );
};
