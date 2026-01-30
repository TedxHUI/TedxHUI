import React from "react";
import { ShoppingBag, Ticket, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface SelectionSummaryProps {
  selectedTicket: any;
  ticketQuantity: number;
  cart: any[];
  total: number;
  onConfirm: () => void;
}

export const SelectionSummary = ({
  selectedTicket,
  ticketQuantity,
  cart,
  total,
  onConfirm,
}: SelectionSummaryProps) => {
  const merchCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-40 transform translate-y-0 transition-transform shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EA1D2C]/5 flex items-center justify-center text-[#EA1D2C]">
              <Ticket size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Selected Ticket
              </p>
              <p className="text-sm font-black">
                {selectedTicket.name} (x{ticketQuantity})
              </p>
            </div>
          </div>

          {merchCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Merchandise
                </p>
                <p className="text-sm font-black">
                  {merchCount} items selected
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">
              Estimated Total
            </p>
            <p className="text-2xl font-black text-[#EA1D2C]">
              ₦{total.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={onConfirm}
            className="flex-grow md:flex-grow-0 h-14 px-10 rounded-2xl bg-black hover:bg-gray-900 text-white font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95"
          >
            Confirm Order <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
