import React, { useState } from "react";
import { ticketService } from "../services/ticketService";
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
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { usePaystackPayment } from "react-paystack";
import Elipse1 from "../assets/Ellipse 1.png";

const TicketBooking = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getPrice = (type: string) => {
    switch (type) {
      case "vip":
        return 15000;
      case "vvip":
        return 50000;
      default:
        return 5000;
    }
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: getPrice(ticketType) * 100, // Paystack amount is in kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      const ticket = await ticketService.registerTicket({
        full_name: fullName,
        email: email,
        ticket_type: ticketType,
        payment_reference: reference.reference,
      });

      await notificationService.queueNotification({
        user_email: email,
        type: "ticket_confirmation",
        subject: "Your TEDxHUI Ticket",
        content: `Hi ${fullName}, your ${ticketType.toUpperCase()} ticket has been confirmed! Ticket ID: ${
          ticket.id
        }. Reference: ${reference.reference}`,
      });

      toast({
        title: "Booking Successful!",
        description: "Your ticket has been confirmed. Check your email!",
      });

      navigate("/payment-success", {
        state: {
          type: "ticket",
          reference: reference.reference,
          data: {
            fullName,
            email,
            ticket_type: ticketType,
          },
        },
      });

      setFullName("");
      setEmail("");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please contact support.",
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
      description: "You closed the payment window.",
      variant: "default",
    });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !ticketType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
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
    initializePayment({ onSuccess, onClose });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-glancyr mb-4">
              Get Your Ticket
            </h1>
            <p className="text-gray-600">
              Join us for an unforgettable experience at TEDxHUI 2026.
            </p>
          </div>

          <Card className="max-w-xl mx-auto border-2 border-primary/10">
            <CardHeader>
              <CardTitle>Attendee Information</CardTitle>
              <CardDescription>
                Enter your details to receive your ticket.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ticket Type</label>
                  <Select
                    value={ticketType}
                    onValueChange={(value) => setTicketType(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard - ₦5,000
                      </SelectItem>
                      <SelectItem value="vip">VIP - ₦15,000</SelectItem>
                      <SelectItem value="vvip">VVIP - ₦50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full font-bold text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Register for Ticket"}
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500">
                  By continuing, you agree to our terms and conditions.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10 pointer-events-none">
        <img src={Elipse1} alt="" />
      </div>
    </div>
  );
};

export default TicketBooking;
