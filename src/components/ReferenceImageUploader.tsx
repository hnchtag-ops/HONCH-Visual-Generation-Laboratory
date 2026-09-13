import React, { useRef, useEffect, useState } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { ReferenceImageData, ReferenceStrength } from '../types';

interface ReferenceImageUploaderProps {
  referenceImage: ReferenceImageData | null;
  setReferenceImage: (img: ReferenceImageData | null) => void;
  strength: ReferenceStrength;
  setStrength: (strength: ReferenceStrength) => void;
}

export const ReferenceImageUploader: React.FC<ReferenceImageUploaderProps> = ({
  referenceImage,
  setReferenceImage,
  strength,
  setStrength,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [strength]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const rawResult = reader.result as string;
      const img = new Image();
      img.onerror = () => {
        const base64Data = rawResult.split(',')[1];
        setReferenceImage({
          base64: base64Data,
          mimeType: file.type,
          previewUrl: rawResult,
          strength,
        });
      };
      img.onload = () => {
        const MAX_DIM = 1280;
        let width = img.width;
        let height = img.height;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const base64Data = resizedDataUrl.split(',')[1];
          setReferenceImage({
            base64: base64Data,
            mimeType: 'image/jpeg',
            previewUrl: resizedDataUrl,
            strength,
          });
        } else {
          const base64Data = rawResult.split(',')[1];
          setReferenceImage({
            base64: base64Data,
            mimeType: file.type,
            previewUrl: rawResult,
            strength,
          });
        }
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReferenceImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const STRENGTH_OPTIONS: { id: ReferenceStrength; label: string; desc: string }[] = [
    {
      id: 'light',
      label: 'Light',
      desc: 'Use reference primarily for mood, color & photographic language.',
    },
    {
      id: 'balanced',
      label: 'Balanced',
      desc: 'Preserve composition, camera logic & lighting while transforming concept.',
    },
    {
      id: 'strong',
      label: 'Strong',
      desc: 'Preserve exact visual structure & geometry closely.',
    },
  ];

  return (
    <div className="w-full rounded-lg border border-[#232328] bg-[#111114] p-5 shadow-lg">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1c1c22]">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#d4af37]" />
          <h3 className="font-mono-spec text-xs font-bold text-white tracking-widest uppercase">
            REFERENCE IMAGE
          </h3>
        </div>
        <span className="text-[10px] font-mono-spec text-[#71717a] hidden sm:inline">
          Give HONCH a visual direction.
        </span>
      </div>

      {!referenceImage ? (
        /* Empty Upload Zone */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group border-2 border-dashed rounded-md p-6 cursor-pointer transition-all duration-200 text-center flex flex-col items-center justify-center ${
            isDragging
              ? 'border-[#d4af37] bg-[#1a1712]'
              : 'border-[#2d2d34] hover:border-[#d4af37]/60 bg-[#0d0d0f] hover:bg-[#121215]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#18181c] border border-[#2a2a32] flex items-center justify-center text-[#71717a] group-hover:text-[#d4af37] group-hover:scale-105 transition-all mb-3 shadow-inner">
            <Upload className="w-5 h-5 stroke-[1.5]" />
          </div>

          <span className="font-mono-spec text-xs font-bold text-white tracking-wider uppercase mb-1">
            + Upload reference image
          </span>
          <p className="text-xs font-sans-ui text-[#8e8e99] max-w-sm">
            Upload a photograph to guide composition, lighting, or visual language.
          </p>
          <p className="text-[10px] font-mono-spec text-[#52525b] mt-2">
            Drag &amp; drop, click to browse, or paste image from clipboard
          </p>
        </div>
      ) : (
        /* Loaded Reference View */
        <div className="space-y-4">
          <div className="border border-[#2d2d35] bg-[#0c0c0e] rounded-md p-3 flex flex-col sm:flex-row items-center gap-4">
            {/* Large Thumbnail */}
            <div className="relative w-full sm:w-36 h-36 rounded border border-[#3f3f46] overflow-hidden bg-black flex-shrink-0">
              <img
                src={referenceImage.previewUrl}
                alt="Reference loaded"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Information & Action */}
            <div className="flex-1 flex flex-col justify-between w-full h-full py-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-mono-spec tracking-widest text-[#d4af37] uppercase font-bold">
                    REFERENCE LOADED
                  </span>
                </div>
                <p className="text-xs font-sans-ui text-[#d4d4d8] leading-relaxed">
                  Composition + lighting + material language captured.
                </p>
                <p className="text-[10px] font-mono-spec text-[#71717a] mt-1">
                  HONCH will extract camera angle, lighting behavior and spatial depth automatically.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#18181c] hover:bg-[#222228] border border-[#2f2f38] hover:border-[#d4af37]/50 text-white font-mono-spec text-[10px] uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-[#d4af37]" />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-1.5 bg-[#18181c] hover:bg-[#281818] border border-[#2f2f38] hover:border-red-500/50 text-red-300 font-mono-spec text-[10px] uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* REFERENCE STRENGTH SELECTION */}
          <div className="pt-2 border-t border-[#1a1a1e]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-mono-spec tracking-widest text-[#d4af37] uppercase font-semibold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3 h-3 text-[#d4af37]" />
                REFERENCE STRENGTH
              </label>
              <span className="text-[10px] font-mono-spec text-[#71717a]">
                INFLUENCE LEVEL
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {STRENGTH_OPTIONS.map((opt) => {
                const isSelected = strength === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStrength(opt.id)}
                    className={`p-2.5 rounded text-left border transition-all ${
                      isSelected
                        ? 'bg-[#1a1813] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-[#d4af37]'
                        : 'bg-[#121215] border-[#23232a] text-[#8e8e99] hover:bg-[#16161a] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-mono-spec text-xs font-bold uppercase tracking-wider">
                      <span
                        className={`w-2 h-2 rounded-full border ${
                          isSelected ? 'bg-[#d4af37] border-[#d4af37]' : 'bg-transparent border-[#52525b]'
                        }`}
                      />
                      {opt.label}
                    </div>
                    <p className="text-[10px] font-sans-ui text-[#71717a] mt-1 leading-tight line-clamp-2">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
