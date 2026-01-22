import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Lock } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import { usePaystackPayment } from "react-paystack";
import { merchandiseService } from "../services/merchandiseService";
import { notificationService } from "../services/notificationService";
import CartSummary from "../components/CartSummary";
import Footer from "../components/Footer";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    discountCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const txnFee = 100;
  const finalTotal = totalPrice + (totalPrice > 0 ? txnFee : 0);

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: finalTotal * 100, // Paystack amount is in kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      // Create orders for each item in cart
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
          content: `Hi ${formData.firstName}! Your order for ${item.quantity}x ${
            item.name
          } has been confirmed. Total: ₦${(item.price * item.quantity).toLocaleString()}. Reference: ${
            reference.reference
          }`,
        });
      }

      toast({
        title: "Purchase Successful!",
        description: `Thank you for supporting TEDxHUI! Order ref: ${reference.reference}`,
      });

      clearCart();
      navigate("/payment-success", {
        state: {
          type: "merch",
          reference: reference.reference,
          data: {
            name: cart.map((i) => i.name).join(", "),
            email: formData.email,
          },
        },
      });
    } catch (error: any) {
      console.error("Purchase error:", error);
      toast({
        title: "Order Failed",
        description:
          error.message || "Something went wrong. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required billing details.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    initializePayment({
      onSuccess: handlePaymentSuccess,
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "You closed the payment window.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mini Header */}
      <div className="container mx-auto px-6 py-6 md:py-8">
        <Link
          to="/merchandise"
          className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-400 hover:text-black transition-colors"
        >
          <ChevronLeft size={18} />
          Checkout
        </Link>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Billing Form */}
          <div className="flex-grow max-w-2xl order-1">
            <h1 className="text-2xl md:text-3xl font-black font-glancyr mb-8">
              Billing Address
            </h1>

            <form
              onSubmit={handleProceedToPayment}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name here"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus:ring-2 focus:ring-[#EA1D2C]/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name here"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus:ring-2 focus:ring-[#EA1D2C]/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus:ring-2 focus:ring-[#EA1D2C]/20 transition-all outline-none"
                />
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                  Make sure this email is correct - Your merch receipt will be
                  sent here. We skipped the confirm email step to keep checkout
                  fast.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your email address"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus:ring-2 focus:ring-[#EA1D2C]/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">
                  Discount Code (Optional)
                </label>
                <input
                  type="text"
                  name="discountCode"
                  placeholder="Enter a discount code"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                  className="w-full h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus:ring-2 focus:ring-[#EA1D2C]/20 transition-all outline-none"
                />
              </div>
            </form>
          </div>

          {/* Cart Sidebar */}
          <div className="w-full lg:w-[400px] flex-shrink-0 order-2">
            <CartSummary
              buttonLabel="Proceed to Payment"
              onButtonClick={() => {
                const form = document.querySelector("form");
                if (form) form.requestSubmit();
              }}
              isProcessing={isProcessing}
            />

            {/* Paystack Badge Section (Mobile - below CartSummary) */}
            <div className="pt-12 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold">
                <Lock size={14} className="text-gray-400" />
                Secured by <span className="font-black">paystack</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-3 md:h-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-5 md:h-6"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-3 md:h-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_Pay_logo.svg"
                  alt="Apple Pay"
                  className="h-4 md:h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
