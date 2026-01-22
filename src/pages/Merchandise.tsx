import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  merchandiseService,
  Merchandise,
} from "../services/merchandiseService";
import { useToast } from "../hooks/use-toast";
import { RefreshCw, ShoppingBag, X } from "lucide-react";
import MerchandiseItem from "../components/MerchandiseItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../contexts/CartContext";
import Footer from "../components/Footer";
import { Drawer, DrawerContent } from "../components/ui/drawer";

const MerchandisePage = () => {
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const { cart, updateQuantity, addToCart, totalItems } = useCart();

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const data = await merchandiseService.getAllMerchandise();
        setMerchandise(data);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
        toast({
          title: "Error",
          description: "Failed to load merchandise. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMerch();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] bg-black overflow-hidden flex items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EA1D2C]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

        {/* Large Decorative Text */}
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-black font-glancyr text-white leading-tight tracking-tighter"
          >
            Wear the Spirit of{" "}
            <span className="text-[#EA1D2C]">
              TED<span className="text-white">X</span>HUI
            </span>
          </motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 md:py-20">
        {/* Floating Cart Button (Mobile) */}
        <div className="lg:hidden fixed top-24 right-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-14 h-14 bg-[#EA1D2C] rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-200 relative"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-[#EA1D2C] rounded-full text-xs font-black flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main List */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:max-w-3xl">
              {merchandise.map((item) => (
                <MerchandiseItem
                  key={item.id}
                  item={item}
                  quantity={cart.find((i) => i.id === item.id)?.quantity || 0}
                  onUpdateQuantity={(newQty) => {
                    const existing = cart.find((i) => i.id === item.id);
                    if (existing) {
                      updateQuantity(item.id, newQty);
                    } else if (newQty > 0) {
                      addToCart(item, newQty);
                    }
                  }}
                />
              ))}

              {merchandise.length === 0 && (
                <div className="col-span-2 text-center py-20">
                  <p className="text-gray-400 font-bold text-xl">
                    No merchandise available yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cart Sidebar (Desktop) */}
          <div className="hidden lg:block w-full lg:w-[400px] flex-shrink-0">
            <CartSummary
              buttonLabel="Proceed to Checkout"
              checkoutLink="/checkout"
            />
          </div>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DrawerContent className="h-[90vh] bg-white border-none rounded-t-[40px] overflow-hidden">
          <div className="h-full flex flex-col pt-6">
            <div className="px-6 flex items-center justify-between mb-4">
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex items-center gap-2 text-sm font-bold text-gray-500"
              >
                <X size={16} />
                Cart
              </button>
            </div>
            <div className="flex-grow overflow-y-auto px-6 pb-20">
              <CartSummary
                buttonLabel="Proceed to Checkout"
                checkoutLink="/checkout"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Footer />
    </div>
  );
};

export default MerchandisePage;
