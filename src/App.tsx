
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Medications from './pages/Medications';
import MedicationDetails from './pages/MedicationDetails';
import Telemedicine from './pages/Telemedicine';
import MedicalRecords from './pages/MedicalRecords';
import RecordDetails from './pages/RecordDetails';
import HealthTracker from './pages/HealthTracker';
import LabResults from './pages/LabResults';
import Vaccinations from './pages/Vaccinations';
import Prescription from './pages/Prescription';
import Activity from './pages/Activity';
import Documents from './pages/Documents';
import Consultation from './pages/Consultation';
import Profile from './pages/Profile';
import AddMedication from './pages/AddMedication';
import Subscription from './pages/Subscription';
import MediPort from './pages/MediPort';
import NotFound from './pages/NotFound';
import DoctorProfile from './pages/DoctorProfile';
import HealthTipsPage from './pages/HealthTipsPage';
import MedicationRemindersPage from './pages/MedicationRemindersPage';
import HealthDashboard from './pages/HealthDashboard';
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-dashboard" element={<HealthDashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/medication-details/:id" element={<MedicationDetails />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/record-details" element={<RecordDetails />} />
          <Route path="/health-tracker" element={<HealthTracker />} />
          <Route path="/lab-results" element={<LabResults />} />
          <Route path="/vaccinations" element={<Vaccinations />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/mediport" element={<MediPort />} />
          <Route path="/health-tips" element={<HealthTipsPage />} />
          <Route path="/medication-reminders" element={<MedicationRemindersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
