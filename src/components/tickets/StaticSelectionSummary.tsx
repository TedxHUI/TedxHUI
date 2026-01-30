import React from "react";
import { ShoppingBag, Ticket, ChevronRight, Lock } from "lucide-react";
import { Button } from "../ui/button";

interface StaticSelectionSummaryProps {
  selectedTicket: any;
  ticketQuantity: number;
  cart: any[];
  subtotal: number;
  cartTotal: number;
  txFee: number;
  total: number;
  onConfirm: () => void;
}

export const StaticSelectionSummary = ({
  selectedTicket,
  ticketQuantity,
  cart,
  subtotal,
  cartTotal,
  txFee,
  total,
  onConfirm,
}: StaticSelectionSummaryProps) => {
  if (!selectedTicket) return null;

  return (
    <div
      id="summary-section"
      className="mt-20 mb-16 bg-[#FFF5F5] rounded-[2.5rem] p-8 md:p-12 border border-[#EA1D2C]/5 scroll-mt-24 shadow-sm"
    >
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-black mb-8 font-glancyr text-center uppercase tracking-tight">
          Order <span className="text-[#EA1D2C]">Summary</span>
        </h3>

        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EA1D2C]/5 flex items-center justify-center text-[#EA1D2C]">
                <Ticket size={20} />
              </div>
              <div>
                <p className="font-black text-base">{selectedTicket.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Qty: {ticketQuantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-lg">₦{subtotal.toLocaleString()}</p>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="space-y-3">
              <span className="block font-black text-[9px] uppercase tracking-[0.2em] text-[#EA1D2C]/60 px-2 italic">
                Merchandise
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-black/5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-8 h-8 object-cover rounded-md"
                      />
                      <p className="font-bold text-xs">
                        {item.quantity}x {item.name}
                      </p>
                    </div>
                    <p className="font-black text-xs text-[#EA1D2C]">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-black/5 space-y-2">
            <div className="flex justify-between font-bold text-gray-400 uppercase text-[10px] tracking-wider">
              <span>Subtotal</span>
              <span className="text-black">
                ₦{(subtotal + cartTotal).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-bold text-gray-400 uppercase text-[10px] tracking-wider">
              <span>Txn Fee</span>
              <span className="text-black">₦{txFee.toLocaleString()}</span>
            </div>
            <div className="pt-4 flex justify-between items-center text-3xl font-black">
              <span className="text-xl uppercase tracking-tighter">Total</span>
              <span className="text-[#EA1D2C]">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onConfirm}
          className="w-full h-16 rounded-2xl bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Confirm Order <ChevronRight size={24} />
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-widest">
          <Lock size={12} className="text-[#EA1D2C]" /> Review order before
          payment
        </div>
      </div>
    </div>
  );
};
