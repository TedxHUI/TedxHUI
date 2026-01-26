import confetti from "canvas-confetti";
import { Variants } from 'framer-motion';
import { toPng } from "html-to-image";
import { Download, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { motion } from 'framer-motion';
import { CropModal } from "../components/dp/CropModal";
import { DPPreview } from "../components/dp/DPPreview";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/use-toast";

const CreateDP = () => {

  const sentence = "A Day of Ideas Worth Spreading";
  const words = sentence.split(" ");
  // Variants for the container to stagger the words
  const container: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
  };
  
  // Variants for each individual word
  const child: Variants = {
  visible: {
      opacity: 1,
      y: 0,
      transition: {
      type: "spring", 
      damping: 12,
      stiffness: 100,
      },
  },
  hidden: {
      opacity: 0,
      y: 20,
  },
  };
  
  const [name, setName] = useState("");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const onDrop = useCallback((files: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setIsCropOpen(true);
    };
    reader.readAsDataURL(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const dataUrl = await toPng(previewRef.current, { quality: 1, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `TEDxHUI-DP-${name || 'Attendee'}.png`;
    link.href = dataUrl;
    link.click();
    toast({ title: "Downloaded!", description: "Share it on your socials!" });
  };

  const finalizeCrop = () => {
    setIsCropOpen(false);
    setIsDone(true);
    confetti({ particleCount: 150, spread: 60, colors: ['#ff2b06', '#ffffff', '#000000'] });
  };

  return (
    <section className="bg-white min-h-screen font-glancyr">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">
  
          {/* Shimmer/Glow Background Effect */}
          <motion.div 
              animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EA1D2C_0%,_transparent_50%)] opacity-20 pointer-events-none"
          />
          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-white leading-tight font-glancyr flex flex-wrap justify-center gap-x-4"
                  variants={container}
                  initial="hidden"
                  animate="visible"
              >
                  {words.map((word, index) => (
                  <motion.span
                      variants={child}
                      key={index}
                      className={word === "Day" ? "text-[#EA1D2C]" : "text-white"}
                  >
                      {word}
                  </motion.span>
                  ))}
              </motion.h2>
              
              {/* Subtle underline for the "Story" word */}
              <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="h-1 bg-[#EA1D2C] mx-auto mt-4 rounded-full"
              />
              </div>
          </div>
      </section>
      <div className="min-h-screen bg-black text-white pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* FORM SIDE */}
            <div className="space-y-8">
              <h1 className="text-5xl font-extrabold leading-tight">
                Create Your <br/><span className="text-primary">Attendee Badge</span>
              </h1>
              
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                  Step 1: Your Name
                </label>
                <Input 
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="How should it appear?" 
                  className="h-14 bg-zinc-900 border-zinc-800 text-lg focus:border-primary"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                  Step 2: Your Photo
                </label>
                <div {...getRootProps()} className="group border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center hover:border-primary/50 hover:bg-zinc-900/50 cursor-pointer transition-all">
                  <input {...getInputProps()} />
                  <Upload className="mx-auto w-10 h-10 text-zinc-600 group-hover:text-primary mb-4" />
                  <p className="text-zinc-400">Click to upload your profile picture</p>
                </div>
              </div>

              {isDone && (
                <Button onClick={handleDownload} className="w-full h-16 rounded-full text-xl font-black uppercase tracking-tighter shadow-lg shadow-primary/20">
                  <Download className="mr-2" /> 
                  Download DP
                </Button>
              )}
            </div>

            {/* PREVIEW SIDE */}
            <DPPreview ref={previewRef} image={rawImage} name={name} crop={crop} zoom={zoom} />
          </div>
        </div>

        <CropModal 
          isOpen={isCropOpen} image={rawImage} crop={crop} zoom={zoom}
          onCropChange={setCrop} onZoomChange={setZoom}
          onCropComplete={() => {}} 
          onApply={finalizeCrop} onClose={() => setIsCropOpen(false)}
        />
      </div>
    </section>
  );
};

export default CreateDP;