import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-[#EA1D2C] font-black text-2xl font-glancyr tracking-tighter">
            TED<span className="text-black">X</span>HUI
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-2.5 rounded-full border border-gray-100 text-sm font-bold text-gray-500 hover:text-black hover:border-black transition-all"
        >
          Close
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 md:py-20 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-48 h-48 md:w-64 md:h-64 bg-[#FFF5F5] rounded-full flex items-center justify-center mb-8 md:mb-12 shadow-inner"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 md:w-32 md:h-32 bg-[#EA1D2C] rounded-full flex items-center justify-center shadow-2xl shadow-red-200"
          >
            <Check
              className="text-white w-10 h-10 md:w-16 md:h-16"
              strokeWidth={4}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl md:text-6xl font-black font-glancyr mb-4 tracking-tight">
            Payment Successful
          </h1>
          <p className="text-gray-500 text-xs md:text-base font-bold max-w-sm md:max-w-md mx-auto leading-relaxed mb-10 md:mb-12">
            Thank you for purchasing TEDxHUI Merch! A confirmation email has
            been sent to you with your receipt details.
          </p>

          <Button
            asChild
            className="h-12 md:h-14 px-10 md:px-12 rounded-full bg-[#EA1D2C] hover:bg-[#ff2b3a] font-bold text-sm md:text-base shadow-xl shadow-red-100 transition-all active:scale-95 w-full md:w-auto"
          >
            <Link to="/">Go Home</Link>
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
