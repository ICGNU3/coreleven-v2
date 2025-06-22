
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import InvitePage from "./pages/InvitePage";
import DashboardPage from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";
import AuthPage from "./pages/AuthPage";
import GroveCompletePage from "./pages/GroveCompletePage";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import AboutPage from "./pages/AboutPage";
import StartGrovePage from "./pages/StartGrovePage";
import { ScrollToTop } from "./components/ScrollToTop";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const AppContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "mobile-app" : ""}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/invite/:inviteId?" element={<InvitePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/grove-complete" element={<GroveCompletePage />} />
        <Route path="/grove" element={<StartGrovePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
