
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvitePage from "./pages/InvitePage";
import DashboardPage from "./pages/DashboardPage";
import StartPage from "./pages/StartPage";
import SignupPage from "./pages/SignupPage";
import GroveCompletePage from "./pages/GroveCompletePage";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import AboutPage from "./pages/AboutPage";
import StartGrovePage from "./pages/StartGrovePage";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/invite/:inviteId?" element={<InvitePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/grove-complete" element={<GroveCompletePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/grove" element={<StartGrovePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
