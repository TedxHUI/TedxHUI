import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { ShoppingBag, Ticket, X, ChevronRight, Check } from "lucide-react";
import { useMediaQuery } from "../../hooks/use-media-query";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedTicket: any;
  ticketQuantity: number;
  cart: any[];
  subtotal: number;
  cartTotal: number;
  txFee: number;
  total: number;
  isProcessing: boolean;
}

export const ConfirmOrderModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedTicket,
  ticketQuantity,
  cart,
  subtotal,
  cartTotal,
  txFee,
  total,
  isProcessing,
}: ConfirmOrderModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const SummaryContent = () => (
    <div className="space-y-6 p-6 md:p-0 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#EA1D2C]">
          <Ticket size={20} className="font-black" />
          <span className="text-sm font-black uppercase tracking-widest">
            Ticket Selection
          </span>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
          <div>
            <h4 className="font-black text-lg">{selectedTicket.name}</h4>
            <p className="text-sm text-gray-500 font-bold uppercase">
              {selectedTicket.subName}
            </p>
          </div>
          <div className="text-right">
            <div className="font-black text-lg">
              ₦{(selectedTicket.price * ticketQuantity).toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 font-bold">
              Qty: {ticketQuantity}
            </p>
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#EA1D2C]">
            <ShoppingBag size={20} className="font-black" />
            <span className="text-sm font-black uppercase tracking-widest">
              Merchandise
            </span>
          </div>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="font-black text-sm">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-black/5 space-y-3">
        <div className="flex justify-between text-sm font-bold text-gray-400 uppercase">
          <span>Subtotal</span>
          <span className="text-black">
            ₦{(subtotal + cartTotal).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold text-gray-400 uppercase">
          <span>Txn Fee</span>
          <span className="text-black">₦{txFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-black/10">
          <span className="text-xl font-black uppercase tracking-tighter">
            Grand Total
          </span>
          <span className="text-3xl font-black text-[#EA1D2C]">
            ₦{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Button
        onClick={onConfirm}
        disabled={isProcessing}
        className="w-full h-16 md:h-20 rounded-2xl bg-[#EA1D2C] hover:bg-[#ff2b3a] text-white font-black text-lg md:text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 sticky bottom-0"
      >
        Continue to Billing <ChevronRight size={24} />
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-2xl p-8 bg-white border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black font-glancyr tracking-tight">
              Confirm Your <span className="text-[#EA1D2C]">Order</span>
            </DialogTitle>
          </DialogHeader>
          <SummaryContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white border-none rounded-t-[3rem] min-h-[70vh] focus:outline-none">
        <div className="mx-auto w-12 h-1.5 bg-gray-200 rounded-full mt-4 mb-6" />
        <DrawerHeader className="px-6 pb-0">
          <DrawerTitle className="text-3xl font-black font-glancyr text-left">
            Confirm Your <span className="text-[#EA1D2C]">Order</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto max-h-[70vh]">
          <SummaryContent />
          <div className="h-10" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
