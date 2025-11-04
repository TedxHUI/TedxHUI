import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Image, Upload } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Elipse1 from "../assets/Ellipse 1.png";

const CreateDP = () => {

  const [name, setName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image under 10MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1
  });

  const handleGenerate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    if (!uploadedImage) {
      toast({
        title: "Photo required",
        description: "Please upload a profile photo",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "DP Generated!",
      description: "Your display picture has been created successfully.",
    });
  };


  return (
    <div>
      {/* Hero Section */}
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">
        <div className="py-24 md:py-36">
          <div className="container mx-auto px-4">
            <div className="max-w-1xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Show Your <span className="text-primary">TEDx</span> Spirit
              </h2>
            </div>
          </div>
        </div>
      </section>



    <section className="py-16 md:py-24 bg-">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-2 border-primary rounded-3xl p-8 md:p-12">
            <div className="space-y-8">
              {/* Name Field */}
              <div>
                <label className="block text-white font-bold text-lg mb-4">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name/nickname etc..."
                  className="bg-black border-2 border-white/20 rounded-xl h-14 text-white placeholder:text-gray-500 focus:border-primary"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-white font-bold text-lg mb-4">Profile Photo</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Image className="w-8 h-8 text-primary" />
                    </div>
                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img 
                          src={uploadedImage} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-xl mx-auto"
                        />
                        <p className="text-white text-lg">Image uploaded successfully</p>
                        <p className="text-gray-400 text-sm">Click or drag to change</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-white text-lg">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-gray-400 text-sm">
                          JPG, PNG, WebP up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                className="w-full h-14 rounded-full font-bold text-lg"
              >
                Generate DP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

      
      <section className="relative max-h-screen bg-gradient-to-br from-[#330609] via-[#000000] to-[#330609] text-white overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <img src={Elipse1} alt="Elipse" />
        </div>

        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Be Part of the First TEDxHUI Experience
              </h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Seats are limited, reserve yours today and witness history in the making.
              </p>
              <button className="bg-white hover:bg-primary/90 text-black font-bold px-10 py-4 text-base rounded-full mt-6 transition-colors">
                Get Your Ticket
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default CreateDP