import { Dialog, DialogContent } from "../ui/dialog";
import { X, Linkedin, Instagram, Twitter, MessageCircle, Share2 } from "lucide-react";

export const ShareModal = ({ isOpen, onClose, onShare }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-[32px] p-8 border-none">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <Share2 className="w-8 h-8 text-[#EA1D2C]" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-zinc-900">Don't keep it to yourself</h2>
            <p className="text-zinc-500 text-sm px-4">
              Share your TEDxHUI DP and spread the word about ideas worth spreading!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <button onClick={() => onShare('linkedin')} className="flex flex-col items-center p-6 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
              <Linkedin className="w-8 h-8 text-[#0077b5] mb-2" />
              <span className="text-xs font-semibold">LinkedIn</span>
            </button>
            <button onClick={() => onShare('whatsapp')} className="flex flex-col items-center p-6 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
              <MessageCircle className="w-8 h-8 text-[#25D366] mb-2" />
              <span className="text-xs font-semibold">WhatsApp</span>
            </button>
            <button onClick={() => onShare('x')} className="flex flex-col items-center p-6 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
              <Twitter className="w-8 h-8 text-black mb-2" />
              <span className="text-xs font-semibold">X (Twitter)</span>
            </button>
            <button onClick={() => onShare('native')} className="flex flex-col items-center p-6 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
              <Instagram className="w-8 h-8 text-[#E4405F] mb-2" />
              <span className="text-xs font-semibold">Instagram</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};