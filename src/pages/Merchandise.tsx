import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import {
  merchandiseService,
  Merchandise,
} from "../services/merchandiseService";
import { notificationService } from "../services/notificationService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Drawer, DrawerContent } from "../components/ui/drawer";
import { useMediaQuery } from "../hooks/use-media-query";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import Elipse1 from "../assets/Ellipse 1.png";

const MerchandisePage = () => {
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Merchandise | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("tedxhui_merch_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }

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

  const allImages = selectedItem
    ? Array.from(
        new Set(
          [selectedItem.image_url, ...(selectedItem.image_urls || [])].filter(
            Boolean,
          ),
        ),
      )
    : [];

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: (selectedItem?.price || 0) * quantity * 100, // Paystack amount is in kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    if (!selectedItem) return;
    setIsProcessing(true);
    try {
      const totalPrice = selectedItem.price * quantity;

      // 1. Create order in Supabase
      await merchandiseService.createOrder({
        user_email: email,
        merchandise_id: selectedItem.id,
        quantity: quantity,
        total_price: totalPrice,
        payment_reference: reference.reference,
        payment_status: "paid", // Since Paystack confirmed it
      });

      // 2. Queue notification
      await notificationService.queueNotification({
        user_email: email,
        type: "merchandise_order",
        subject: `Order Confirmed: ${selectedItem.name}`,
        content: `Hi! Your order for ${quantity}x ${
          selectedItem.name
        } has been confirmed. Total: ₦${totalPrice.toLocaleString()}. Reference: ${
          reference.reference
        }`,
      });

      toast({
        title: "Purchase Successful!",
        description: `Thank you for supporting TEDxHUI! Order ref: ${reference.reference}`,
      });

      // Clear saved form data
      localStorage.removeItem("tedxhui_merch_email");

      navigate("/payment-success", {
        state: {
          type: "merch",
          reference: reference.reference,
          data: {
            name: selectedItem.name,
            quantity: quantity,
            email: email,
          },
        },
      });

      setEmail("");
      setQuantity(1);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Purchase error:", error);
      toast({
        title: "Order Failed",
        description:
          error.message ||
          "Something went wrong. Please contact support with your payment reference.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onClose = () => {
    setIsProcessing(false);
    toast({
      title: "Payment Cancelled",
      description: "You closed the payment window. Your email has been saved.",
      variant: "default",
    });
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !email) {
      toast({
        title: "Missing Information",
        description: "Please select an item and enter your email.",
        variant: "destructive",
      });
      return;
    }

    if (!process.env.REACT_APP_PAYSTACK_PUBLIC_KEY) {
      toast({
        title: "Configuration Error",
        description: "Paystack key is missing. Please contact admin.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Double check stock before initializing payment
      const hasStock = await merchandiseService.checkStock(
        selectedItem.id,
        quantity,
      );
      if (!hasStock) {
        setIsProcessing(false);
        toast({
          title: "Out of Stock",
          description:
            "Sorry, this item just sold out or doesn't have enough stock.",
          variant: "destructive",
        });
        return;
      }

      // 2. Save email
      localStorage.setItem("tedxhui_merch_email", email);

      // 3. Initialize Paystack
      const paymentTimeout = setTimeout(() => {
        if (isProcessing) {
          setIsProcessing(false);
          toast({
            title: "Payment Timeout",
            description:
              "Payment initialization took too long. Please try again.",
            variant: "destructive",
          });
        }
      }, 30000);

      initializePayment({
        onSuccess: (ref) => {
          clearTimeout(paymentTimeout);
          onSuccess(ref);
        },
        onClose: () => {
          clearTimeout(paymentTimeout);
          onClose();
        },
      });
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description:
          error.message || "Failed to initialize purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleItemClick = (item: Merchandise) => {
    setSelectedItem(item);
    setQuantity(1);
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  };

  const MerchandiseContent = () => (
    <div className="grid md:grid-cols-2 gap-8 py-4">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
          <img
            src={allImages[activeImageIndex]}
            alt={selectedItem?.name}
            className="w-full h-full object-cover"
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Details & Form */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-glancyr mb-2">
            {selectedItem?.name}
          </h2>
          <p className="text-2xl font-bold text-primary">
            ₦{selectedItem?.price.toLocaleString()}
          </p>
        </div>

        <div className="prose prose-sm text-gray-600">
          <p>{selectedItem?.description}</p>
        </div>

        <form onSubmit={handlePurchase} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="font-bold text-xl w-8 text-center">
                {quantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Delivery Email
            </label>
            <Input
              type="email"
              placeholder="Where should we send your receipt?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-2xl font-bold mb-6">
              <span>Total</span>
              <span>
                ₦{((selectedItem?.price || 0) * quantity).toLocaleString()}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full h-14 rounded-full font-bold text-lg flex items-center gap-3"
              disabled={isProcessing}
            >
              <CreditCard size={20} />
              {isProcessing ? "Processing..." : "Pay with Paystack"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-glancyr mb-4">
              Official Merchandise
            </h1>
            <p className="text-gray-600">
              Wear the spirit of TEDxHUI and support the movement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {merchandise.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-none bg-gray-50/50 rounded-2xl overflow-hidden"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ShoppingCart className="text-primary w-6 h-6" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold text-xl">
                    ₦{item.price.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Modal */}
      {isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl">
            <div className="p-8">
              <MerchandiseContent />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DrawerContent className="max-h-[80vh]">
            <div className="px-6 pb-8 overflow-y-auto">
              <MerchandiseContent />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Decorative background */}
      <div className="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10 pointer-events-none">
        <img src={Elipse1} alt="" />
      </div>
    </div>
  );
};

export default MerchandisePage;
