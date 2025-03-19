
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import Prescription from "./pages/Prescription";
import MediPort from "./pages/MediPort";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import MedicalRecords from "./pages/MedicalRecords";
import RecordDetails from "./pages/RecordDetails";
import Medications from "./pages/Medications";
import AddMedication from "./pages/AddMedication";
import MedicationDetails from "./pages/MedicationDetails";
import LabResults from "./pages/LabResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/mediport" element={<MediPort />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/record-details/:id" element={<RecordDetails />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/medication-details/:id" element={<MedicationDetails />} />
          <Route path="/lab-results" element={<LabResults />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
