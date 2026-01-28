import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Ticket as TicketIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const TicketCard = ({ ticket, onSelect }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${ticket.color} rounded-[3rem] p-10 pt-12 shadow-lg transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${ticket.isPopular ? "md:scale-105 z-10 border-2 border-[#EA1D2C]/10" : ""}`}>
      {ticket.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EA1D2C] text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest">Most Popular</div>}
      <div className="mb-8">
        <h4 className={`text-base font-black uppercase mb-2 ${ticket.textColor}`}>{ticket.name}</h4>
        <div className={`text-5xl font-black ${ticket.textColor}`}>₦{ticket.price.toLocaleString()}</div>
      </div>
      <div className="mt-auto space-y-6">
        <Button onClick={() => onSelect(ticket)} className={`w-full h-16 rounded-full font-black text-lg shadow-xl ${ticket.buttonColor}`}>
          Select Ticket <TicketIcon className="ml-3 w-5 h-5" />
        </Button>
        <button onClick={() => setIsExpanded(!isExpanded)} className={`flex items-center justify-center gap-2 text-xs font-black uppercase w-full ${ticket.textColor} opacity-60`}>
          {isExpanded ? "Hide details" : "See details"} {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 pt-6 border-t border-black/5 overflow-hidden">
              {ticket.features.map((f: string, i: number) => (
                <li key={i} className={`flex gap-4 text-sm ${ticket.textColor} opacity-80 font-medium`}>
                  <Check size={18} className="shrink-0" /> <span>{f}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};