import React from "react";
import { Star, Minus, Plus } from "lucide-react";
import { Merchandise } from "../services/merchandiseService";

interface MerchandiseItemProps {
  item: Merchandise;
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
}

const MerchandiseItem: React.FC<MerchandiseItemProps> = ({
  item,
  quantity,
  onUpdateQuantity,
}) => {
  const stockLeft = item.stock_quantity || 100;
  const totalStock = 100;
  const percentage = Math.max(0, Math.min(100, (stockLeft / totalStock) * 100));

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-100 last:border-0 gap-4 md:gap-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
        {/* Image */}
        <div className="w-full aspect-square md:w-32 md:h-32 bg-[#FFF5F5] rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#FDB022] text-[#FDB022]"
              />
            ))}
          </div>
          <h3 className="text-lg md:text-2xl font-black font-glancyr tracking-tight">
            {item.name}
          </h3>
          <div className="space-y-1.5">
            <div className="w-full md:w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EA1D2C] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[10px] md:text-xs font-bold text-gray-400">
              {stockLeft} items left
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
        <span className="text-lg md:text-2xl font-black font-glancyr">
          ₦{item.price.toLocaleString()}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(Math.max(0, quantity - 1))}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-gray-100 flex items-center justify-center hover:border-gray-300 transition-colors disabled:opacity-50"
            disabled={quantity === 0}
          >
            <Minus size={14} className="text-gray-400" />
          </button>
          <span className="w-4 text-center text-base md:text-lg font-bold text-gray-400">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#EA1D2C] flex items-center justify-center hover:bg-[#ff2b3a] transition-colors text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseItem;
