import React, { useRef } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface SourceImageUploaderProps {
  sourceImage: { base64: string; mimeType: string; previewUrl: string } | null;
  setSourceImage: (img: { base64: string; mimeType: string; previewUrl: string } | null) => void;
}

export const SourceImageUploader: React.FC<SourceImageUploaderProps> = ({
  sourceImage,
  setSourceImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setSourceImage({
          base64: base64Data,
          mimeType: file.type,
          previewUrl: rawResult,
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
          setSourceImage({
            base64: base64Data,
            mimeType: 'image/jpeg',
            previewUrl: resizedDataUrl,
          });
        } else {
          const base64Data = rawResult.split(',')[1];
          setSourceImage({
            base64: base64Data,
            mimeType: file.type,
            previewUrl: rawResult,
          });
        }
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSourceImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!sourceImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group border border-dashed border-[#2d2d34] hover:border-[#d4af37]/60 bg-[#121215]/50 hover:bg-[#16161a] p-4 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#1c1c21] border border-[#2d2d35] flex items-center justify-center text-[#71717a] group-hover:text-[#d4af37] transition-colors">
              <Upload className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-xs font-sans-ui text-[#d4d4d8] group-hover:text-white font-medium">
                Upload Source Photograph
              </p>
              <p className="text-[11px] font-mono-spec text-[#71717a] mt-0.5">
                Preserves subject identity, pose & composition (Optional)
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono-spec tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded border border-[#d4af37]/20">
            ATTACH
          </span>
        </div>
      ) : (
        <div className="border border-[#33333d] bg-[#141417] p-3 rounded-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded border border-[#3f3f46] overflow-hidden bg-black flex-shrink-0">
              <img
                src={sourceImage.previewUrl}
                alt="Source preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-xs font-mono-spec tracking-wider text-[#d4af37] uppercase font-semibold">
                  IMAGE UNDERSTOOD
                </span>
              </div>
              <p className="text-[11px] font-sans-ui text-[#a1a1aa] mt-0.5">
                Source subject profile and geometry mapped
              </p>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="p-1.5 text-[#71717a] hover:text-white hover:bg-[#27272a] rounded transition-colors"
            title="Remove source image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
