import { motion } from "framer-motion";
import { Ticket as TicketIcon, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export const TicketCard = ({ ticket, onSelect, isSelected }: any) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative flex flex-col bg-[#EA1D2C]/5 shadow-sm transition-all duration-300
        ${isSelected ? "ring-4 ring-[#EA1D2C] z-10 scale-105 rounded-[1rem] bg-white Shadow-2xl" : ticket.isPopular ? "ring-2 ring-gray-400 z-10 scale-105 rounded-[1rem]" : "rounded-[1rem]"}
      `}
      style={{
        // This creates the receipt zigzag effect at the bottom
        WebkitMaskImage:
          "radial-gradient(circle at 10px 100%, transparent 10px, white 10px)",
        WebkitMaskSize: "20px 100%",
        paddingBottom: "40px",
      }}
    >
      {/* Header Section */}
      <div className="p-8 pb-4 text-start">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-[#EA1D2C] font-black text-xl leading-tight font-glancyr">
              {ticket.name}
            </h4>
            <p className="text-[#EA1D2C] text-sm font-medium">
              {ticket.subName}
            </p>
          </div>
          {ticket.isPopular && (
            <span className="bg-gray-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
              most popular ✨
            </span>
          )}
        </div>

        <div className="text-[2.5rem] font-black text-black flex items-center gap-1 mb-6">
          <span className="text-2xl mt-1">₦</span>
          {ticket.price.toLocaleString()}
        </div>

        <div className="border-t border-dashed border-gray-300 my-6" />

        <Button
          onClick={() => onSelect(ticket)}
          className={`w-full h-14 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2
            ${isSelected ? "bg-black text-white" : ticket.isPopular ? "bg-[#EA1D2C] text-white hover:bg-[#d41a28]" : "bg-white text-black border border-gray-300 hover:bg-gray-50"}
          `}
        >
          {isSelected ? (
            <>
              Selected <CheckCircle2 size={18} />
            </>
          ) : (
            <>
              Select Ticket <TicketIcon size={18} />
            </>
          )}
        </Button>
      </div>

      {/* Features List */}
      <div className="px-8 pb-10 flex-grow">
        <ul className="space-y-4">
          {ticket.features.map((feature: string, i: number) => (
            <li
              key={i}
              className="flex gap-3 items-start text-[0.85rem] leading-snug text-gray-800 font-medium"
            >
              <CheckCircle2
                size={16}
                className="text-[#EA1D2C] shrink-0 mt-0.5"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shadow Bottom detail to make it look like paper */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-50 opacity-50" />
    </motion.div>
  );
};
