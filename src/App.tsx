
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppsPage from "./pages/AppsPage";
import LockScreen from "./pages/LockScreen";
import SettingsPage from "./pages/SettingsPage";
import SetupPinPage from "./pages/SetupPinPage";
import SetupPasswordPage from "./pages/SetupPasswordPage";
import SetupFingerprintPage from "./pages/SetupFingerprintPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/lock" element={<LockScreen />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/setup/pin" element={<SetupPinPage />} />
          <Route path="/setup/password" element={<SetupPasswordPage />} />
          <Route path="/setup/fingerprint" element={<SetupFingerprintPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
