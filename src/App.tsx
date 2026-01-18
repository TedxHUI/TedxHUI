import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Speakers from "./pages/Speakers";
import Agenda from "./pages/Agenda";
import SpeakerDetail from "./pages/SpeakerDetail";
import CreateDP from "./pages/CreateDP";
import Merchandise from "./pages/Merchandise";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import TicketBooking from "./pages/TicketBooking";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="/book-ticket" element={<TicketBooking />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

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
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
