import React, { useState } from 'react';
import { Camera, Sliders, Check, Eye, ChevronDown, ChevronUp, Sparkles, Aperture, Compass, Film, Shield, Sun, Tv, Layers } from 'lucide-react';
import {
  CameraPresetId,
  FinishProfileId,
  CAMERA_PRESETS,
  FINISH_PROFILES,
  AdvancedCameraParams,
} from '../services/cameraPresets';

interface CameraSelectorProps {
  selectedPreset: CameraPresetId;
  onSelectPreset: (presetId: CameraPresetId) => void;
  selectedFinish: FinishProfileId;
  onSelectFinish: (finishId: FinishProfileId) => void;
  advancedParams: AdvancedCameraParams;
  onUpdateAdvancedParams: (params: AdvancedCameraParams) => void;
}

export const CameraSelector: React.FC<CameraSelectorProps> = ({
  selectedPreset,
  onSelectPreset,
  selectedFinish,
  onSelectFinish,
  advancedParams,
  onUpdateAdvancedParams,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const cameraList: { id: CameraPresetId; icon: React.ReactNode }[] = [
    {
      id: 'hero',
      icon: <Eye className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: 'immersive',
      icon: <Aperture className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: 'observer',
      icon: <Compass className="w-4 h-4 text-[#d4af37]" />,
    },
    {
      id: 'cinema',
      icon: <Film className="w-4 h-4 text-[#d4af37]" />,
    },
  ];

  const finishList: { id: FinishProfileId; icon: React.ReactNode }[] = [
    {
      id: 'pristine',
      icon: <Shield className="w-3.5 h-3.5 text-[#d4af37]" />,
    },
    {
      id: 'editorial',
      icon: <Sun className="w-3.5 h-3.5 text-[#d4af37]" />,
    },
    {
      id: 'filmic',
      icon: <Tv className="w-3.5 h-3.5 text-[#d4af37]" />,
    },
    {
      id: 'raw',
      icon: <Layers className="w-3.5 h-3.5 text-[#d4af37]" />,
    },
  ];

  return (
    <div className="mt-8 border-t border-[#1c1c20] pt-6 space-y-6">
      {/* 1. CAMERA SELECTION ROW */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-mono-spec tracking-[0.2em] text-[#d4af37] uppercase font-semibold flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#d4af37]" />
            CAMERA
          </label>
          <span className="text-[10px] font-mono-spec text-[#71717a] hidden sm:inline">
            AUTOMATIC VISUAL DIRECTION
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cameraList.map(({ id, icon }) => {
            const preset = CAMERA_PRESETS[id];
            const isSelected = selectedPreset === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectPreset(id)}
                className={`p-3 rounded-md border text-left transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#181613] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]'
                    : 'bg-[#101012] border-[#222228] hover:border-[#383842] hover:bg-[#151518]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-black/60 border border-white/10">
                      {icon}
                    </div>
                    <span className="font-mono-spec text-xs font-bold text-white tracking-wider">
                      {preset.title}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="bg-[#d4af37] text-black p-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-sans-ui text-[#90909a] leading-tight line-clamp-2">
                  {preset.purpose}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. FINISH SELECTION ROW */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-mono-spec tracking-[0.2em] text-[#d4af37] uppercase font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            FINISH
          </label>
          <span className="text-[10px] font-mono-spec text-[#71717a] hidden sm:inline">
            OPTICAL COHERENCE &amp; CHARACTER
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {finishList.map(({ id, icon }) => {
            const finish = FINISH_PROFILES[id];
            const isSelected = selectedFinish === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectFinish(id)}
                className={`p-3 rounded-md border text-left transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#181613] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]'
                    : 'bg-[#101012] border-[#222228] hover:border-[#383842] hover:bg-[#151518]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-black/60 border border-white/10">
                      {icon}
                    </div>
                    <span className="font-mono-spec text-xs font-bold text-white tracking-wider">
                      {finish.title}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="bg-[#d4af37] text-black p-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-sans-ui text-[#90909a] leading-tight line-clamp-2">
                  {finish.purpose}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ADVANCED TOGGLE & DRAWER */}
      <div className="pt-2 border-t border-[#1a1a1e] flex flex-col items-end">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-[10px] font-mono-spec text-[#d4af37] hover:underline uppercase tracking-widest font-semibold flex items-center gap-1.5 bg-[#161412] px-3 py-1.5 rounded border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
        >
          <Sliders className="w-3 h-3" />
          ADVANCED CAMERA SETTINGS
          {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 w-full p-4 rounded-lg bg-[#0d0d0f] border border-[#27272e] animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c1c22]">
              <span className="text-[10px] font-mono-spec tracking-widest text-[#d4af37] uppercase font-semibold">
                OPTICAL MANUAL OVERRIDES
              </span>
              <span className="text-[10px] font-mono-spec text-[#71717a]">
                HONCH AUTO-RESOLVES THESE IF LEFT BLANK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans-ui">
              {/* Focal Length */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Focal Length
                </label>
                <select
                  value={advancedParams.focalLength || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, focalLength: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="24mm Wide Angle">24mm Wide Angle</option>
                  <option value="35mm Wide Editorial">35mm Wide Editorial</option>
                  <option value="50mm Standard Optical">50mm Standard Optical</option>
                  <option value="85mm Portrait Lens">85mm Portrait Lens</option>
                  <option value="105mm Macro Detail">105mm Macro Detail</option>
                  <option value="135mm Telephoto Compression">135mm Telephoto Compression</option>
                </select>
              </div>

              {/* Camera Height */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Camera Height
                </label>
                <select
                  value={advancedParams.cameraHeight || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, cameraHeight: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="Eye-Level Position">Eye-Level Position</option>
                  <option value="Low Angle Upward">Low Angle Upward</option>
                  <option value="Overhead High Viewpoint">Overhead High Viewpoint</option>
                  <option value="Ground Level Perspective">Ground Level Perspective</option>
                </select>
              </div>

              {/* Camera Distance */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Camera Distance
                </label>
                <select
                  value={advancedParams.cameraDistance || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, cameraDistance: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="Extreme Close-Up">Extreme Close-Up</option>
                  <option value="Close Framing">Close Framing</option>
                  <option value="Medium Studio Placement">Medium Studio Placement</option>
                  <option value="Far Environmental View">Far Environmental View</option>
                </select>
              </div>

              {/* Perspective Strength */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Perspective Strength
                </label>
                <select
                  value={advancedParams.perspectiveStrength || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, perspectiveStrength: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="Normal Coherence">Normal Coherence</option>
                  <option value="Compressed Depth">Compressed Depth</option>
                  <option value="Exaggerated Perspective">Exaggerated Perspective</option>
                </select>
              </div>

              {/* Depth of Field */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Depth of Field
                </label>
                <select
                  value={advancedParams.depthOfField || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, depthOfField: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="Ultra-Shallow f/1.4">Ultra-Shallow f/1.4</option>
                  <option value="Shallow f/2.8">Shallow f/2.8</option>
                  <option value="Deep Architectural Focus f/8">Deep Architectural Focus f/8</option>
                </select>
              </div>

              {/* Focus Distance */}
              <div>
                <label className="block text-[10px] font-mono-spec text-[#a1a1aa] uppercase mb-1">
                  Focus Plane
                </label>
                <select
                  value={advancedParams.focusDistance || ''}
                  onChange={(e) =>
                    onUpdateAdvancedParams({ ...advancedParams, focusDistance: e.target.value || undefined })
                  }
                  className="w-full bg-[#151518] border border-[#2a2a32] text-white rounded p-2 focus:border-[#d4af37] outline-none text-xs font-mono-spec"
                >
                  <option value="">Auto (Profile Default)</option>
                  <option value="Subject Plane">Subject Plane</option>
                  <option value="Foreground Texture">Foreground Texture</option>
                  <option value="Background Depth">Background Depth</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
