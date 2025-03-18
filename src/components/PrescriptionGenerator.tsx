
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedTransition from './AnimatedTransition';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionData {
  patientName: string;
  patientAge: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  notes: string;
}

const PrescriptionGenerator = () => {
  const navigate = useNavigate();
  const [consultationData, setConsultationData] = useState<any>(null);
  const [prescription, setPrescription] = useState<PrescriptionData>({
    patientName: '',
    patientAge: '',
    date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    medications: [{ id: Date.now().toString(), name: '', dosage: '', frequency: '', duration: '' }],
    notes: '',
  });

  useEffect(() => {
    // Get consultation data from localStorage
    const savedData = localStorage.getItem('consultationData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setConsultationData(parsedData);
      
      // Pre-fill prescription with consultation data
      setPrescription(prev => ({
        ...prev,
        patientName: parsedData.patientName || '',
        patientAge: parsedData.patientAge || '',
        diagnosis: parsedData.diagnosis || '',
        notes: parsedData.treatment || '',
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrescription(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.id === id ? { ...med, [field]: value } : med
      )
    }));
  };

  const addMedication = () => {
    setPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { 
        id: Date.now().toString(), 
        name: '', 
        dosage: '', 
        frequency: '', 
        duration: '' 
      }]
    }));
  };

  const removeMedication = (id: string) => {
    if (prescription.medications.length > 1) {
      setPrescription(prev => ({
        ...prev,
        medications: prev.medications.filter(med => med.id !== id)
      }));
    }
  };

  const generatePrescription = () => {
    // Save the prescription data to localStorage
    localStorage.setItem('prescriptionData', JSON.stringify(prescription));
    
    toast.success("Prescription generated successfully");
    
    // Navigate to MediPort
    setTimeout(() => {
      navigate('/mediport');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <AnimatedTransition type="fadeInUp" delay={0.1}>
        <Card className="overflow-hidden border border-border/50 shadow-lg glass-panel">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Digital Prescription</h2>
                <p className="text-muted-foreground mt-1">Generate a digital prescription based on consultation</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="block text-right">Date</span>
                <span className="font-medium text-foreground">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    value={prescription.patientName}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Patient Age</Label>
                  <Input
                    id="patientAge"
                    name="patientAge"
                    value={prescription.patientAge}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  name="diagnosis"
                  value={prescription.diagnosis}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medications</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addMedication}
                    className="flex items-center gap-1 text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    Add Medication
                  </Button>
                </div>
                
                {prescription.medications.map((medication, index) => (
                  <div key={medication.id} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Medication #{index + 1}</span>
                      {prescription.medications.length > 1 && (
                        <button 
                          onClick={() => removeMedication(medication.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18"></path>
                            <path d="M6 6l12 12"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Medication Name</Label>
                        <Input
                          value={medication.name}
                          onChange={(e) => handleMedicationChange(medication.id, 'name', e.target.value)}
                          placeholder="Enter medication name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Dosage</Label>
                        <Input
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(medication.id, 'dosage', e.target.value)}
                          placeholder="e.g., 500mg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Input
                          value={medication.frequency}
                          onChange={(e) => handleMedicationChange(medication.id, 'frequency', e.target.value)}
                          placeholder="e.g., Twice daily"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input
                          value={medication.duration}
                          onChange={(e) => handleMedicationChange(medication.id, 'duration', e.target.value)}
                          placeholder="e.g., 7 days"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Instructions</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={prescription.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes or instructions..."
                  className="min-h-[100px] w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button 
                onClick={generatePrescription}
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-200"
              >
                Generate Prescription
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default PrescriptionGenerator;
