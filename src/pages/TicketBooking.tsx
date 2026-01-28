import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { notificationService } from "../services/notificationService";
import { ticketService } from "../services/ticketService";

// Sub-Components
import { 
  TicketHero, 
  CountdownTimer, 
  ThemeSection, 
  TicketCard, 
  BillingForm, 
  OrderSummary 
} from "../components/tickets";

const TICKETS = [
  {
    id: "essence-ticket",
    name: "Essence Ticket",
    subName: "(General Access)",
    price: 10000,
    features: [
      "Standard entry to TEDxHUI",
      "Access to all speaker sessions",
      "Community networking opportunities",
      "Access to official event photos",
      "TEDxHUI-themed mobile wallpapers",
    ],
  },
  {
    id: "legacy-ticket",
    name: "Legacy Ticket",
    subName: "(VIP Experience)",
    price: 50000,
    isPopular: true,
    features: [
      "Everything in the Inspire Ticket",
      "Front-row VIP seating with premium comfort",
      "Meet & Greet with select speakers backstage",
      "Behind-the-scenes tour of TEDxHUI production",
      "Exclusive access to TEDxHUI-curated playlist",
      "Early access to event talk recordings",
      "Signed thank-you note from the TEDxHUI team",
      "Upgraded TEDxHUI Gift Pack (T-shirt, Tote Bag)",
      "Access to one-on-one mentorship session",
      "Invitation to pre-event rehearsal & dinner",
    ],
  },
  {
    id: "inspire-ticket",
    name: "Inspire Ticket",
    subName: "(Premium Access)",
    price: 25000,
    features: [
      "Everything in the Essence Ticket",
      "Fast-track entry & priority seating",
      "Exclusive TEDxHUI swag bag (Notebook, Pen)",
      "Access to an exclusive Q&A session",
      "Personalized certificate of attendance",
      "Refreshments & light snacks",
      "TEDxHUI eBook (Key insights)",
    ],
  },
];

const TicketBooking = () => {
  const [step, setStep] = useState<"selection" | "checkout">("selection");
  const [selectedTicket, setSelectedTicket] = useState(TICKETS[0]);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", discountCode: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Pricing Logic
  const subtotal = selectedTicket.price * quantity;
  const txFee = Math.round(subtotal * 0.015 + 100);
  const total = subtotal + txFee;

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: total * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    if (!formData.firstName || !formData.email || !formData.phone) {
      toast({ title: "Missing Info", description: "Fill in required fields.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    initializePayment({
      onSuccess: async (reference: any) => {
        try {
          const typeMapping: Record<string, string> = { "essence-ticket": "standard", "inspire-ticket": "vip", "legacy-ticket": "vvip" };
          await ticketService.registerTicket({
            full_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            ticket_type: typeMapping[selectedTicket.id] || "standard",
            payment_reference: reference.reference,
          });
          navigate("/payment-success");
        } catch (error) {
          toast({ title: "Error", description: "Registration failed. Contact support.", variant: "destructive" });
        } finally { setIsProcessing(false); }
      },
      onClose: () => setIsProcessing(false)
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {step === "selection" ? (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            <TicketHero />
            <div className="max-w-7xl mx-auto px-6">
              <CountdownTimer />
              <ThemeSection />
              
              <div className="text-center mb-16" id="tickets-grid">
                <h3 className="text-4xl md:text-[3rem] font-medium font-glancyr mb-4">
                  Choose Your <span className="text-[#EA1D2C]">Ticket</span>
                </h3>
                <p className="text-black/70 font-medium text-[1.25rem]">
                  Select the tier that best fits your experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                {TICKETS.map((ticket) => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onSelect={(t: any) => {
                      setSelectedTicket(t); 
                      setStep("checkout"); 
                      window.scrollTo(0, 0); 
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="pb-24 px-6 max-w-7xl mx-auto pt-10">
            <button onClick={() => setStep("selection")} className="flex items-center gap-3 text-base font-black mb-12 text-gray-400 hover:text-black uppercase tracking-widest transition-colors">
              <ChevronLeft size={24} /> Back to Selection
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <div className="lg:col-span-3 space-y-16">
                <BillingForm 
                  selectedTicket={selectedTicket} 
                  quantity={quantity} 
                  setQuantity={setQuantity} 
                  formData={formData} 
                  setFormData={setFormData} 
                />
              </div>
              <div className="lg:col-span-2">
                <OrderSummary 
                  subtotal={subtotal} 
                  txFee={txFee} 
                  total={total} 
                  quantity={quantity} 
                  isProcessing={isProcessing} 
                  onPay={handlePayment} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketBooking;