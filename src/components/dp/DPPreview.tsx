import { forwardRef, useState, useEffect } from "react";

interface DPPreviewProps {
  image: string | null;
  name: string;
  crop: { x: number; y: number };
  zoom: number;
}

export const DPPreview = forwardRef<HTMLDivElement, DPPreviewProps>(
  ({ image, name, crop, zoom }, ref) => {
    const FRAME_PATH = "/images/dp-template.jpg";

    // State to hold the calculated factor
    const [factor, setFactor] = useState(0.565); // Initial value for the smallest size

    useEffect(() => {
      const calculateFactor = () => {
        // The cropper in CropModal has a fixed height of 320px (h-80)
        // Our window in the preview is 56.5% of the total width.
        // We need to scale the cropper's pixel drift to match our preview's scale.
        const previewElement = (ref as React.RefObject<HTMLDivElement>)
          ?.current;
        if (previewElement) {
          const previewWidth = previewElement.offsetWidth;
          const newFactor = (previewWidth * 0.565) / 320;
          setFactor(newFactor);
        }
      };

      // Calculate initially
      calculateFactor();

      // Add event listener for window resize to recalculate
      window.addEventListener("resize", calculateFactor);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", calculateFactor);
      };
    }, [ref]); // Dependency on ref to ensure it runs if ref object itself changes (though unlikely for forwardRef)

    return (
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] overflow-hidden shadow-2xl"
        >
          <div
            className="absolute z-20 overflow-hidden"
            style={{
              top: "35%",
              left: "50%",
              width: "30.5%",
              height: "30.5%",
              borderRadius: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="User"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${zoom}) translate(${crop.x * factor}px, ${crop.y * factor}px)`,
                  transition: "transform 0.1s ease-out",
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
  },
);
