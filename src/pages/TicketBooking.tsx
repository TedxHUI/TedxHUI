import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { notificationService } from "../services/notificationService";
import { ticketService } from "../services/ticketService";
import {
  merchandiseService,
  Merchandise,
} from "../services/merchandiseService";
import { useCart } from "../contexts/CartContext";
import MerchandiseItem from "../components/MerchandiseItem";
import { RefreshCw } from "lucide-react";

// Sub-Components
import {
  TicketHero,
  CountdownTimer,
  ThemeSection,
  TicketCard,
  BillingForm,
  OrderSummary,
  ConfirmOrderModal,
  StaticSelectionSummary,
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
];

const TicketBooking = () => {
  const [step, setStep] = useState<"selection" | "checkout">("selection");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isTicketSelected, setIsTicketSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    discountCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [loadingMerch, setLoadingMerch] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {
    cart,
    updateQuantity,
    addToCart,
    totalPrice: cartTotal,
    clearCart,
  } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchMerch = async () => {
      try {
        const data = await merchandiseService.getAllMerchandise();
        setMerchandise(data);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      } finally {
        setLoadingMerch(false);
      }
    };
    fetchMerch();
  }, []);

  // Pricing Logic
  const subtotal = selectedTicket ? selectedTicket.price * quantity : 0;
  const txFee = selectedTicket
    ? Math.round((subtotal + cartTotal) * 0.015 + 100)
    : 0;
  const total = selectedTicket ? subtotal + cartTotal + txFee : 0;

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: total * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsConfirmModalOpen(false);
    setStep("checkout");
    window.scrollTo(0, 0);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    initializePayment({
      onSuccess: async (reference: any) => {
        try {
          const typeMapping: Record<string, string> = {
            "essence-ticket": "standard",
            "inspire-ticket": "vip",
            "legacy-ticket": "vvip",
          };
          await ticketService.registerTicket({
            full_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            ticket_type: typeMapping[selectedTicket?.id] || "standard",
            payment_reference: reference.reference,
          });

          // Build merch summary before clearing cart
          const merchSummary = cart
            .map((i) => `${i.quantity}x ${i.name}`)
            .join(", ");
          const hasMerch = cart.length > 0;

          // Create merchandise orders if any
          if (hasMerch) {
            for (const item of cart) {
              await merchandiseService.createOrder({
                user_email: formData.email,
                merchandise_id: item.id,
                quantity: item.quantity,
                total_price: item.price * item.quantity,
                payment_reference: reference.reference,
                payment_status: "paid",
              });

              await notificationService.queueNotification({
                user_email: formData.email,
                type: "merchandise_order",
                subject: `Order Confirmed: ${item.name}`,
                content: `Hi ${formData.firstName}! Your order for ${item.quantity}x ${item.name} has been confirmed. Reference: ${reference.reference}`,
              });
            }
            clearCart();
          }

          navigate("/payment-success", {
            state: {
              type: hasMerch ? "ticket_and_merch" : "ticket",
              reference: reference.reference,
              data: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                ticket: selectedTicket?.name,
                merch: merchSummary,
              },
            },
          });
        } catch (error) {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Registration failed. Contact support.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => setIsProcessing(false),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {step === "selection" ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
          >
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
                    isSelected={selectedTicket?.id === ticket.id}
                    onSelect={(t: any) => {
                      setSelectedTicket(t);
                      setIsTicketSelected(true);
                      // Scroll to next section slightly to show more
                      setTimeout(() => {
                        document
                          .getElementById("selection-summary")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                  />
                ))}
              </div>

              {isTicketSelected && (
                <div id="selection-summary" className="mt-20">
                  <StaticSelectionSummary
                    selectedTicket={selectedTicket}
                    ticketQuantity={quantity}
                    cart={cart}
                    subtotal={subtotal}
                    cartTotal={cartTotal}
                    txFee={txFee}
                    total={total}
                    onConfirm={handleOpenConfirmModal}
                  />
                </div>
              )}

              {/* Merchandise Section */}
              <div
                className={`mt-32 pb-60 transition-all duration-700 ${
                  isTicketSelected
                    ? "opacity-100 translate-y-0"
                    : "opacity-40 pointer-events-none translate-y-10"
                }`}
                id="merch-section"
              >
                <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-[3rem] font-medium font-glancyr mb-4">
                    Grab Your <span className="text-[#EA1D2C]">Merch</span>
                  </h3>
                  <p className="text-black/70 font-medium text-[1.25rem]">
                    Complete your TEDxHUI experience with official merchandise.
                  </p>
                </div>

                {loadingMerch ? (
                  <div className="flex justify-center py-20">
                    <RefreshCw className="w-8 h-8 animate-spin text-[#EA1D2C]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {merchandise.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 p-6 rounded-[2rem]"
                      >
                        <MerchandiseItem
                          item={item}
                          quantity={
                            cart.find((i) => i.id === item.id)?.quantity || 0
                          }
                          onUpdateQuantity={(newQty) => {
                            const existing = cart.find((i) => i.id === item.id);
                            if (existing) {
                              updateQuantity(item.id, newQty);
                            } else if (newQty > 0) {
                              addToCart(item, newQty);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isTicketSelected && (
                <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-black/5 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                  <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">
                        <ShoppingBag size={12} className="text-[#EA1D2C]" />
                        Total amount
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-black text-black">
                          ₦{total.toLocaleString()}
                        </span>
                        {cart.length > 0 && (
                          <span className="text-[10px] font-black bg-[#EA1D2C] text-white px-2 py-0.5 rounded-full uppercase">
                            +{cart.length} Merch
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenConfirmModal}
                      className="bg-[#EA1D2C] hover:bg-[#ff2b3a] text-white font-black py-4 px-8 md:px-12 rounded-2xl shadow-xl shadow-[#EA1D2C]/20 flex items-center gap-3 transition-all text-sm md:text-lg whitespace-nowrap"
                    >
                      Next: Confirm <ChevronRight size={24} />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="pb-24 px-6 max-w-7xl mx-auto pt-10"
          >
            <button
              onClick={() => setStep("selection")}
              className="flex items-center gap-3 text-base font-black mb-12 text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            >
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
                  cart={cart}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleProceedToCheckout}
        selectedTicket={selectedTicket}
        ticketQuantity={quantity}
        cart={cart}
        subtotal={subtotal}
        cartTotal={cartTotal}
        txFee={txFee}
        total={total}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default TicketBooking;
