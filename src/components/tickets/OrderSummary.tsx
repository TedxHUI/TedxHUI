import { Lock } from "lucide-react";
import { Button } from "../ui/button";

export const OrderSummary = ({ subtotal, txFee, total, quantity, isProcessing, onPay }: any) => (
  <div className="sticky top-24 bg-[#FFF5F5] rounded-[3.5rem] p-10 shadow-2xl border border-[#EA1D2C]/5">
    <h3 className="text-3xl font-black mb-8 font-glancyr">Summary</h3>
    <div className="space-y-6 mb-12">
      <div className="flex justify-between font-bold text-gray-500 uppercase text-xs">
        <span>Quantity (x{quantity})</span>
        <span className="text-black">₦{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-bold text-gray-500 uppercase text-xs">
        <span>Txn Fee</span>
        <span className="text-black">₦{txFee.toLocaleString()}</span>
      </div>
      <div className="pt-6 border-t border-black/5 flex justify-between items-center text-3xl font-black">
        <span>Total</span>
        <span className="text-[#EA1D2C]">₦{total.toLocaleString()}</span>
      </div>
    </div>
    <Button onClick={onPay} disabled={isProcessing} className="w-full h-20 rounded-full bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-black text-xl shadow-xl transition-all active:scale-95">
      {isProcessing ? "Processing..." : "Proceed to Payment"}
    </Button>
    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-black uppercase">
      <Lock size={14} className="text-[#EA1D2C]" /> Secured by Paystack
    </div>
  </div>
);