import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Lock,
  MapPin,
  Minus,
  Plus,
  Ticket as TicketIcon,
} from "lucide-react";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { notificationService } from "../services/notificationService";
import { ticketService } from "../services/ticketService";

const TICKETS = [
  {
    id: "essence-ticket",
    name: "Essence Ticket",
    subName: "(General Access)",
    price: 10000,
    color: "bg-[#FFF5F5]",
    textColor: "text-[#EA1D2C]",
    buttonColor: "bg-white text-gray-800 border-2 border-gray-100",
    features: [
      "Standard entry to TEDxHUI.",
      "Access to all speaker sessions.",
      "Community networking opportunities.",
      "Access to official event photos.",
      "TEDxHUI-themed mobile wallpapers.",
    ],
  },
  {
    id: "legacy-ticket",
    name: "Legacy Ticket",
    subName: "(VIP Experience)",
    price: 50000,
    color: "bg-[#EA1D2C]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#EA1D2C]",
    isPopular: true,
    features: [
      "Everything in the Inspire Ticket, PLUS:",
      "Front-row VIP seating with premium comfort",
      "Meet & Greet with select speakers backstage",
      "Behind-the-scenes tour of TEDxHUI production.",
      "Exclusive access to TEDxHUI-curated playlist.",
      "Early access to event talk recordings.",
      "Signed thank-you note from the TEDxHUI organizing team.",
      "Upgraded TEDxHUI Gift Pack (T-shirt, TEDxHUI-branded Tote Bag).",
      "Access to one-on-one mentorship session with a TEDxHUI speaker or expert.",
      "Invitation to a TEDxHUI pre-event speaker rehearsal & networking dinner.",
    ],
  },
  {
    id: "inspire-ticket",
    name: "Inspire Ticket",
    subName: "(Premium Access)",
    price: 25000,
    color: "bg-[#FFF5F5]",
    textColor: "text-[#EA1D2C]",
    buttonColor: "bg-white text-gray-800 border-2 border-gray-100",
    features: [
      "Everything in the Essence Ticket, PLUS:",
      "Fast-track entry & priority seating.",
      "Exclusive TEDxHUI swag bag (Notebook, Pen, Stickers).",
      "Access to an exclusive Q&A session with speakers.",
      "Personalized certificate of attendance.",
      "Refreshments & light snacks.",
      "TEDxHUI eBook (Key takeaways & insights from the event).",
    ],
  },
];

const TicketBooking = () => {
  const [step, setStep] = useState<"selection" | "checkout">("selection");
  const [selectedTicket, setSelectedTicket] = useState(TICKETS[0]);
  const [expandedTickets, setExpandedTickets] = useState<Set<string>>(
    new Set(),
  );
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    discountCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleDetails = (id: string) => {
    const newExpanded = new Set(expandedTickets);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTickets(newExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ticketPrice = selectedTicket.price;
  const subtotal = ticketPrice * quantity;
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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required billing details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    initializePayment({
      onSuccess: async (reference: any) => {
        try {
          // Map frontend IDs to backend-expected types
          const typeMapping: { [key: string]: string } = {
            "essence-ticket": "standard",
            "inspire-ticket": "vip",
            "legacy-ticket": "vvip",
          };

          await ticketService.registerTicket({
            full_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            ticket_type: typeMapping[selectedTicket.id] || "standard",
            payment_reference: reference.reference,
          });

          await notificationService.queueNotification({
            user_email: formData.email,
            type: "ticket_confirmation",
            subject: "Your TEDxHUI Ticket Receipt",
            content: `Hi ${formData.firstName}, thank you for your purchase of ${quantity} ${selectedTicket.name}(s). Your transaction reference is ${reference.reference}.`,
          });

          navigate("/payment-success");
        } catch (error) {
          console.error("Booking error:", error);
          toast({
            title: "Booking Error",
            description:
              "Payment was successful but we couldn't register your ticket. Please contact support.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => {
        setIsProcessing(false);
        toast({
          title: "Payment Cancelled",
          description: "You closed the payment window.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {step === "selection" ? (
          <SelectionStep
            key="selection"
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            expandedTickets={expandedTickets}
            toggleDetails={toggleDetails}
            setStep={setStep}
          />
        ) : (
          <CheckoutStep
            key="checkout"
            selectedTicket={selectedTicket}
            quantity={quantity}
            setQuantity={setQuantity}
            formData={formData}
            handleInputChange={handleInputChange}
            subtotal={subtotal}
            txFee={txFee}
            total={total}
            setStep={setStep}
            handlePayment={handlePayment}
            isProcessing={isProcessing}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SelectionStep = ({
  selectedTicket,
  setSelectedTicket,
  expandedTickets,
  toggleDetails,
  setStep,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="pb-24"
    >
      {/* Desktop Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-black overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EA1D2C]/10 to-black z-10" />
        <div className="relative z-20 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black font-glancyr mb-6 text-white leading-tight">
            <span className="text-[#EA1D2C]">Secure</span> Your Spot
            <br />
            at TEDxHUI
          </h1>
          <p className="text-gray-400 text-sm md:text-xl mb-10 max-w-2xl mx-auto">
            Choose your ticket category and be part of an unforgettable
            experience.
          </p>
          <Button
            onClick={() => {
              const el = document.getElementById("tickets-grid");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="h-14 px-10 rounded-full bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-black text-lg group shadow-xl"
          >
            Get tickets{" "}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Countdown - Centered for Desktop */}
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 flex justify-around items-center -mt-12 relative z-30 border border-white/10 shadow-2xl max-w-3xl mx-auto overflow-hidden">
          {[
            { label: "Days", val: "100" },
            { label: "Hours", val: "50" },
            { label: "Minutes", val: "36" },
            { label: "Seconds", val: "60" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-2 font-mono tracking-tighter">
                  {item.val}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">
                  {item.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="text-[#EA1D2C] font-bold text-2xl md:text-4xl">
                  :
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Theme Card - Desktop Version */}
        <div className="relative rounded-[3rem] overflow-hidden my-20 h-64 md:h-80 shadow-2xl group">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="/images/About/TEDx.jpg"
            className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105"
            alt="Theme"
          />
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-8">
            <div className="bg-[#EA1D2C] text-white text-xs font-black px-5 py-2 rounded-full mb-6 uppercase tracking-[0.3em]">
              THEME:
            </div>
            <h2 className="text-6xl md:text-9xl font-black font-glancyr tracking-tighter text-white">
              THE <span className="text-[#EA1D2C]">GIFT</span>
            </h2>
            <div className="flex gap-4 mt-8">
              <div className="w-2.5 h-2.5 bg-white rounded-full opacity-30"></div>
              <div className="w-2.5 h-2.5 bg-[#EA1D2C] rounded-full shadow-[0_0_15px_#EA1D2C]"></div>
              <div className="w-2.5 h-2.5 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Event Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <DetailItem
            icon={<MapPin className="text-[#EA1D2C] w-6 h-6" />}
            title="AL-Hikmah University, Ilorin"
            sub="Main Campus, Moot Court"
          />
          <DetailItem
            icon={<Calendar className="text-[#EA1D2C] w-6 h-6" />}
            title="Thursday, June 5th, 2025"
            sub="Mark your calendars"
          />
          <DetailItem
            icon={<Clock className="text-[#EA1D2C] w-6 h-6" />}
            title="9:00am - 12:00pm"
            sub="3 hours of inspiration"
          />
        </div>

        {/* Ticket Selection Title */}
        <div className="text-center mb-16" id="tickets-grid">
          <h3 className="text-4xl md:text-6xl font-black mb-4">
            Choose Your <span className="text-[#EA1D2C]">Ticket</span>
          </h3>
          <p className="text-gray-500 text-lg">
            Select the tier that best fits your experience.
          </p>
        </div>

        {/* Ticket Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {TICKETS.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative ${ticket.color} rounded-[3rem] p-10 pt-12 scalloped-bottom shadow-lg transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${ticket.isPopular ? "md:scale-105 md:z-10 shadow-2xl border-2 border-[#EA1D2C]/10" : ""}`}
            >
              {ticket.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EA1D2C] text-white text-[10px] font-black px-5 py-2 rounded-full shadow-xl flex items-center gap-2 uppercase tracking-widest whitespace-nowrap">
                  most popular <SparkleIcon className="w-3 h-3" />
                </div>
              )}

              <div className="mb-8">
                <h4
                  className={`text-base font-black uppercase tracking-widest mb-2 ${ticket.textColor}`}
                >
                  {ticket.name}
                </h4>
                <h5
                  className={`text-xs font-bold opacity-60 mb-6 ${ticket.textColor}`}
                >
                  {ticket.subName}
                </h5>
                <div className={`text-5xl font-black ${ticket.textColor}`}>
                  ₦{ticket.price.toLocaleString()}
                </div>
              </div>

              <div className="mt-auto space-y-8">
                <Button
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setStep("checkout");
                    window.scrollTo(0, 0);
                  }}
                  className={`w-full h-16 rounded-full font-black text-lg shadow-xl transition-all ${ticket.buttonColor}`}
                >
                  Select Ticket <TicketIcon className="ml-3 w-5 h-5" />
                </Button>

                <button
                  onClick={() => toggleDetails(ticket.id)}
                  className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest mx-auto w-full ${ticket.textColor} opacity-60 hover:opacity-100 transition-opacity`}
                >
                  {expandedTickets.has(ticket.id)
                    ? "Hide details"
                    : "See details"}
                  {expandedTickets.has(ticket.id) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                <AnimatePresence>
                  {expandedTickets.has(ticket.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-4 pt-6 border-t border-black/5">
                        {ticket.features.map((feature, i) => (
                          <li
                            key={i}
                            className={`flex gap-4 text-sm leading-relaxed ${ticket.textColor} opacity-80 font-medium`}
                          >
                            <Check size={18} className="shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsors Section */}
        <div className="mt-40 mb-20 text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-16">
            Our <span className="text-[#EA1D2C]">Amazing</span> Sponsors
            <br className="md:hidden" /> and Partners
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {["KFC", "amazon", "Google", "CNN", "kuda.", "KFC"].map(
              (brand, i) => (
                <span
                  key={i}
                  className="text-2xl md:text-4xl font-black font-glancyr italic tracking-tighter"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CheckoutStep = ({
  selectedTicket,
  quantity,
  setQuantity,
  formData,
  handleInputChange,
  subtotal,
  txFee,
  total,
  setStep,
  handlePayment,
  isProcessing,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24 px-6 max-w-7xl mx-auto pt-10"
    >
      <button
        onClick={() => setStep("selection")}
        className="flex items-center gap-3 text-base font-black mb-12 text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
      >
        <ChevronLeft size={24} /> Checkout
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Left Column: Brief and Billing */}
        <div className="lg:col-span-3 space-y-16">
          <div className="bg-[#1A1A1A] rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EA1D2C] blur-[120px] opacity-20 -z-0 group-hover:opacity-30 transition-opacity" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div>
                <h4 className="text-[#EA1D2C] text-sm font-black uppercase tracking-[0.2em] mb-2">
                  {selectedTicket.name}
                </h4>
                <h5 className="text-gray-500 text-xs mb-8 uppercase font-bold tracking-widest">
                  {selectedTicket.subName}
                </h5>
                <div className="text-6xl font-black text-white">
                  ₦{selectedTicket.price.toLocaleString()}
                </div>
              </div>

              <div className="pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-12 flex flex-col gap-4">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest text-center md:text-left">
                  Quantity
                </span>
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-3xl font-black min-w-[2rem] text-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 rounded-2xl bg-[#EA1D2C] flex items-center justify-center shadow-[0_10px_30px_rgba(234,29,44,0.3)] active:scale-95 transition-all"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl md:text-4xl font-black font-glancyr">
              Billing Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormGroup
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name here"
              />
              <FormGroup
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name here"
              />
            </div>
            <div className="space-y-8">
              <FormGroup
                label="Email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                type="email"
              />
              <p className="text-[10px] font-bold text-gray-400 -mt-6 leading-relaxed px-2 uppercase tracking-wide">
                Make sure this email is correct - Your ticket will be sent here.
                We skipped the confirm-email step to keep checkout fast.
              </p>
              <FormGroup
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
              <FormGroup
                label="Discount Code (Optional)"
                name="discountCode"
                value={formData.discountCode}
                onChange={handleInputChange}
                placeholder="Enter a discount code"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Summary Sticky */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-[#FFF5F5] rounded-[3.5rem] p-10 pb-12 shadow-2xl border border-[#EA1D2C]/5 h-fit">
            <div className="relative h-48 rounded-[2.5rem] overflow-hidden mb-10 group shadow-lg">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src="/images/About/TEDx.jpg"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                alt="Banner"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="bg-[#EA1D2C] text-white text-[8px] font-black px-3 py-1 rounded-full mb-2 uppercase tracking-widest mx-auto w-fit">
                    THEME:
                  </div>
                  <h4 className="text-white text-3xl font-black font-glancyr tracking-tighter px-4 leading-none">
                    THE <span className="text-[#EA1D2C]">GIFT</span>
                  </h4>
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-black mb-8 font-glancyr">Summary</h3>
            <div className="space-y-6 mb-12">
              <SummaryRow
                label={`Quantity (x${quantity})`}
                val={`₦${subtotal.toLocaleString()}`}
              />
              <SummaryRow label="Txn fee" val={`₦${txFee.toLocaleString()}`} />
              <div className="pt-6 border-t border-black/5 flex justify-between items-center text-3xl font-black">
                <span>Total</span>
                <span className="text-[#EA1D2C]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full h-20 rounded-full bg-[#EA1D2C] hover:bg-[#FF2E3D] text-white font-black text-xl shadow-[0_15px_40px_rgba(234,29,44,0.2)] transition-all active:scale-95"
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </Button>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                <Lock size={14} className="text-[#EA1D2C]" />
                Protected checkout - SSL encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paystack Branding Row */}
      <div className="mt-24 pt-16 border-t border-gray-100 max-w-3xl mx-auto text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 text-gray-400">
            <Lock size={16} className="text-[#EA1D2C]" />
            <span className="text-xl font-black tracking-tight text-gray-900">
              Secured by <span className="text-gray-400">paystack</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale scale-125 md:scale-150 py-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              className="h-6"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              className="h-10"
              alt="Mastercard"
            />
            <div className="text-2xl font-black tracking-tighter text-blue-900 italic">
              Verve
            </div>
            <div className="text-2xl font-black tracking-tighter text-blue-500">
              AMEX
            </div>
            <div className="text-2xl font-black tracking-tighter text-gray-100 bg-black px-2 rounded">
              Pay
            </div>
            <div className="text-xl font-black tracking-tighter text-green-600">
              AFRIGO
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, title, sub }: any) => (
  <div className="flex md:flex-col items-center gap-6 p-8 bg-gray-50/50 hover:bg-white rounded-[2rem] transition-all border border-transparent hover:border-gray-100 hover:shadow-xl text-center flex-1">
    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-gray-50 flex-shrink-0">
      {icon}
    </div>
    <div className="md:mt-4 text-left md:text-center">
      <div className="font-black text-gray-900 text-lg md:text-xl leading-tight mb-2">
        {title}
      </div>
      <div className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-[0.2em]">
        {sub}
      </div>
    </div>
  </div>
);

const FormGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: any) => (
  <div className="space-y-4">
    <label className="text-sm md:text-base font-black text-gray-800 ml-2 uppercase tracking-widest">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-18 px-8 py-6 bg-[#F8F8F8] border-2 border-transparent rounded-[1.5rem] text-gray-900 placeholder:text-gray-300 font-bold focus:bg-white focus:border-[#EA1D2C]/20 transition-all outline-none text-base"
    />
  </div>
);

const SummaryRow = ({ label, val }: any) => (
  <div className="flex justify-between items-center text-base md:text-lg">
    <span className="text-gray-500 font-black uppercase tracking-widest text-[10px] md:text-xs">
      {label}
    </span>
    <span className="text-gray-900 font-black">{val}</span>
  </div>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
);

export default TicketBooking;
