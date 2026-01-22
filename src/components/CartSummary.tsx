import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

interface CartSummaryProps {
  buttonLabel?: string;
  onButtonClick?: () => void;
  checkoutLink?: string;
  isProcessing?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  buttonLabel = "Proceed to Checkout",
  onButtonClick,
  checkoutLink,
  isProcessing = false,
}) => {
  const { cart, totalPrice } = useCart();
  const txnFee = 100; // Fixed fee as per design
  const finalTotal = totalPrice + (totalPrice > 0 ? txnFee : 0);

  return (
    <div className="w-full max-w-sm ml-auto sticky top-24">
      <div className="relative bg-[#FFF5F5] rounded-t-3xl overflow-hidden shadow-sm">
        {/* Banner Image */}
        <div className="h-32 bg-black relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#EA1D2C] opacity-10 blur-2xl" />
          <div className="relative text-center">
            <span className="text-[8px] font-bold text-[#EA1D2C] uppercase tracking-widest block mb-1">
              THEME:
            </span>
            <h4 className="text-white font-glancyr text-4xl leading-none">
              THE <span className="text-[#EA1D2C]">GIFT</span>
            </h4>
          </div>
          {/* Decorative dots/circles from design */}
          <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-white opacity-20" />
          <div className="absolute bottom-4 right-8 w-3 h-3 rounded-full bg-[#EA1D2C]" />
          <div className="absolute top-8 right-4 w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        <div className="p-8 pb-10 space-y-8">
          <h2 className="text-2xl font-black font-glancyr">Cart Summary</h2>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm font-medium italic">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-bold text-gray-500 capitalize">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-black text-gray-700">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="pt-6 border-t-2 border-dotted border-[#EA1D2C]/20 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-400">Txn fee</span>
              <span className="font-black text-gray-700">
                ₦{cart.length > 0 ? txnFee.toLocaleString() : "0"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xl">
              <span className="font-black">Total</span>
              <span className="font-black text-black">
                ₦{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {checkoutLink ? (
              <Link
                to={checkoutLink}
                className={`w-full h-12 rounded-full bg-[#EA1D2C] text-white font-black text-sm flex items-center justify-center hover:bg-[#ff2b3a] transition-all active:scale-[0.98] ${
                  cart.length === 0 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                {buttonLabel}
              </Link>
            ) : (
              <button
                onClick={onButtonClick}
                disabled={cart.length === 0 || isProcessing}
                className="w-full h-12 rounded-full bg-[#EA1D2C] text-white font-black text-sm flex items-center justify-center hover:bg-[#ff2b3a] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : buttonLabel}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400">
              <Lock size={12} className="text-[#EA1D2C]" />
              <span className="uppercase tracking-widest">
                Protected checkout - SSL encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Wavy bottom effect */}
        <div className="absolute -bottom-1 left-0 right-0 h-4 bg-white">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 15px, white 12px, transparent 13px)`,
              backgroundSize: "20px 40px",
              backgroundRepeat: "repeat-x",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
