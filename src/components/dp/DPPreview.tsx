import { forwardRef } from "react";

interface DPPreviewProps {
  image: string | null;
  name: string;
  crop: { x: number; y: number };
  zoom: number;
}

export const DPPreview = forwardRef<HTMLDivElement, DPPreviewProps>(({ image, name, crop, zoom }, ref) => {
  const FRAME_PATH = "/images/dp-template.jpg";

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={ref}
        className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5"
      >
        {/* Layer 1: User Photo */}
        {image ? (
          <img 
            src={image} 
            alt="User" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `scale(${zoom}) translate(${crop.x}px, ${crop.y}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500 italic">
            Waiting for your photo...
          </div>
        )}

        {/* Layer 2: The Transparent TEDx Template */}
        <img 
          src={FRAME_PATH} 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          alt="TEDx Frame"
        />

        {/* Layer 3: Dynamic Name Overlay */}
        <div className="absolute bottom-[18%] left-0 w-full text-center z-20 pointer-events-none px-4">
          <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm text-white font-black text-xl md:text-2xl uppercase tracking-tighter">
            {name || "Your Name"}
          </span>
        </div>
      </div>
    </div>
  );
});