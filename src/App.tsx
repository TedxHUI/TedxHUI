import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import Agenda from "./pages/Agenda";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import CreateDP from "./pages/CreateDP";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Merchandise from "./pages/Merchandise";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PendingApproval from "./pages/PendingApproval";
import Signup from "./pages/Signup";
import SpeakerDetail from "./pages/SpeakerDetail";
import Speakers from "./pages/Speakers";
import TicketBooking from "./pages/TicketBooking";

import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/speakers" element={<Speakers />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/speakers/:id" element={<SpeakerDetail />} />
                <Route path="/createdp" element={<CreateDP />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/merchandise" element={<Merchandise />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/book-ticket" element={<TicketBooking />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/pending-approval" element={<PendingApproval />} />

                {/* Protected admin route */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
