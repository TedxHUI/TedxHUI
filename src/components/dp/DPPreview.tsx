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
        className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] overflow-hidden shadow-2xl"
      >
        <div 
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{
            // This creates the circular "window" for the photo
            clipPath: 'circle(28% at 50% 39%)', 
          }}
        >
          {image ? (
            <img 
              src={image} 
              alt="User" 
              className="w-full h-full object-cover z"
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
        </div>
        
        {/* Layer 2: The Transparent TEDx Template */}
        <img 
          src={FRAME_PATH} 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          alt="TEDx Frame"
        />

        {/* Layer 3: Dynamic Name Overlay */}
        <div className="absolute bottom-[32%] left-0 w-full text-center z-20 pointer-events-none px-4">
          <span className="inline-block px-3 py-1 text-[#000000] font-glancyr font-light text-[1rem] tracking-tighter">
            {name || "Your Name"}
          </span>
        </div>
      </div>
    </div>
  );
});