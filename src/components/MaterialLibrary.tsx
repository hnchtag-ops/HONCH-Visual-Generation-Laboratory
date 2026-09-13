import React from 'react';
import { Layers, Sparkles, Check } from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const MATERIALS: MaterialItem[] = [
  {
    id: 'silk',
    name: 'SHEER SILK CHIFFON',
    subtitle: 'TRANSLUCENT WEAVE',
    description: 'Soft directional specular highlights, micro-translucency, and fluid drape dynamics.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'metallic',
    name: 'LIQUID METALLIC DRAPERY',
    subtitle: 'RAY REFLECTION',
    description: 'High-frequency environmental reflections with razor-sharp specular highlights and fluid metallic folds.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'wool',
    name: 'MATTE WOOL',
    subtitle: 'TACTILE ABSORPTION',
    description: 'Micro-textural diffuse light scattering with zero harsh sheen and deep absorption.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'leather',
    name: 'PATENT LEATHER',
    subtitle: 'WET-LOOK GLOSS',
    description: 'Mirror-like sheen with controlled surface refraction and subtle micro-imperfections.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
  },
];

interface MaterialLibraryProps {
  selectedMaterial: string | null;
  onSelectMaterial: (materialName: string | null) => void;
}

export const MaterialLibrary: React.FC<MaterialLibraryProps> = ({
  selectedMaterial,
  onSelectMaterial,
}) => {
  return (
    <div className="mt-8 border-t border-[#1a1a1d] pt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-black text-base tracking-commercial-tight text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#d4af37]" />
            MATERIAL INTELLIGENCE DEMONSTRATIONS
          </h3>
          <p className="text-[11px] font-mono-spec text-[#a1a1aa] mt-0.5 tracking-wider">
            HONCH&apos;s physical surface response &amp; ray-tracing material lookbook
          </p>
        </div>
        {selectedMaterial && (
          <button
            onClick={() => onSelectMaterial(null)}
            className="text-[10px] font-mono-spec text-[#d4af37] hover:underline uppercase tracking-widest font-semibold"
          >
            RESET OVERRIDE
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MATERIALS.map((mat) => {
          const isSelected = selectedMaterial === mat.name;
          return (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(isSelected ? null : mat.name)}
              className={`rounded-lg border transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#181613] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]'
                  : 'bg-[#121215] border-[#232328] hover:border-[#3d3d47] hover:bg-[#16161a]'
              }`}
            >
              {/* Luxury Lookbook Image Demonstration */}
              <div className="w-full h-44 relative overflow-hidden bg-black/60">
                <img
                  src={mat.imageUrl}
                  alt={mat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Subtitle Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[9px] font-mono-spec tracking-widest text-[#f4e09f] uppercase bg-black/80 px-2 py-0.5 rounded border border-[#d4af37]/30 backdrop-blur-md">
                    {mat.subtitle}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 bg-[#d4af37] text-black p-1 rounded-full shadow-lg">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Text Description */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-mono-spec text-xs font-bold tracking-wider text-white group-hover:text-[#f4e09f] transition-colors">
                      {mat.name}
                    </h4>
                    {isSelected && (
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] font-sans-ui text-[#8e8e99] leading-relaxed line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-spec text-[#71717a]">
                  <span>APPLY TO CONCEPT</span>
                  <span className={isSelected ? 'text-[#d4af37] font-bold' : 'text-[#a1a1aa]'}>
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
