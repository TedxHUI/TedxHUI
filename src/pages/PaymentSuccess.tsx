import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import Elipse1 from "../assets/Ellipse 1.png";

const PaymentSuccess = () => {
  const location = useLocation();
  const { type, data, reference } = location.state || { type: "unknown" };

  const isTicket = type === "ticket";
  const isMerch = type === "merch";

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-green-100 shadow-xl overflow-hidden">
              <div className="bg-green-500 h-2 w-full" />
              <CardHeader className="text-center pt-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold font-glancyr">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-lg">
                  Thank you for your purchase. Your transaction has been
                  completed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8">
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Payment Reference</span>
                    <span className="font-mono font-bold">{reference}</span>
                  </div>
                  <div className="h-px bg-gray-200" />

                  {isTicket && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Ticket className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Ticket Type
                          </p>
                          <p className="font-bold">
                            {data.ticket_type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Sent to
                          </p>
                          <p className="font-bold">{data.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {isMerch && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Product
                          </p>
                          <p className="font-bold">
                            {data.name} (x{data.quantity})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            Receipt Sent to
                          </p>
                          <p className="font-bold">{data.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    A confirmation email has been sent to your inbox. Please
                    check your spam folder if you don't see it.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pb-10 px-8">
                <Button asChild className="w-full h-12 rounded-full font-bold">
                  <Link to="/">
                    Return Home <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-full font-bold"
                  >
                    <Download className="mr-2 w-4 h-4" /> Print Receipt
                  </Button>
                  {isTicket && (
                    <Button
                      variant="outline"
                      className="flex-1 h-12 rounded-full font-bold border-primary text-primary hover:bg-primary/5"
                    >
                      View Ticket
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10 pointer-events-none">
        <img src={Elipse1} alt="" />
      </div>
      <div className="fixed top-20 left-0 w-64 h-64 -z-10 opacity-10 pointer-events-none rotate-180">
        <img src={Elipse1} alt="" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
