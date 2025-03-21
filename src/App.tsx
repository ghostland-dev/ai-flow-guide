
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataProvider } from "@/context/UserDataContext";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import BuildProfile from "./pages/BuildProfile";
import WorkContext from "./pages/WorkContext";
import AIReport from "./pages/AIReport";
import ImplementationGuide from "./pages/ImplementationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserDataProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/build-profile" element={<BuildProfile />} />
              <Route path="/work-context" element={<WorkContext />} />
              <Route path="/ai-report" element={<AIReport />} />
              <Route path="/implementation-guide" element={<ImplementationGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </UserDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
