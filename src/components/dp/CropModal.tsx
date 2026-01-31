import Cropper from "react-easy-crop";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface CropModalProps {
  isOpen: boolean;
  image: string | null;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (area: any, pixels: any) => void;
  onApply: () => void;
  onClose: () => void;
}

export const CropModal = ({
  isOpen,
  image,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onApply,
  onClose,
}: CropModalProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0000001A] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adjust Your Photo</DialogTitle>
        </DialogHeader>
        <div className="relative h-80 w-full bg-black rounded-lg overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="space-y-2 py-4">
          <label className="text-xs text-gray-400 uppercase tracking-widest">
            Zoom Level
          </label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#EA1D2C]"
          />
        </div>
        <Button onClick={onApply} className="w-full py-6 text-lg font-bold">
          Looks Perfect!
        </Button>
      </DialogContent>
    </Dialog>
  );
};
