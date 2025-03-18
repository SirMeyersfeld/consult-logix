
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedTransition from './AnimatedTransition';
import { toast } from 'sonner';

interface ConsultationData {
  patientName: string;
  patientAge: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

const ConsultationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [data, setData] = useState<ConsultationData>({
    patientName: '',
    patientAge: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Recording saved successfully");
    } else {
      setIsRecording(true);
      toast.info("Voice recording started");
    }
  };

  const handleSubmit = () => {
    // Save data to localStorage for demo purposes
    localStorage.setItem('consultationData', JSON.stringify(data));
    toast.success("Consultation recorded successfully");
    
    // Navigate to prescription page
    setTimeout(() => {
      navigate('/prescription');
    }, 1000);
  };

  const formStepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <AnimatedTransition type="fadeInUp" delay={0.1}>
        <Card className="overflow-hidden border border-border/50 shadow-lg glass-panel">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">New Consultation</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Step {currentStep} of 3</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`w-3 h-3 rounded-full ${
                        step === currentStep 
                          ? 'bg-primary' 
                          : step < currentStep 
                            ? 'bg-primary/40' 
                            : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <motion.div
                key={`step-${currentStep}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formStepVariants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={data.patientName}
                        onChange={handleInputChange}
                        placeholder="Enter patient name"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Patient Age</Label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        value={data.patientAge}
                        onChange={handleInputChange}
                        placeholder="Enter patient age"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Symptoms</Label>
                      <div className="relative">
                        <Textarea
                          id="symptoms"
                          name="symptoms"
                          value={data.symptoms}
                          onChange={handleInputChange}
                          placeholder="Describe the symptoms..."
                          className="min-h-[120px] w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={toggleRecording}
                          className={`absolute right-3 bottom-3 p-2 rounded-full ${
                            isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="22"></line>
                          </svg>
                        </button>
                      </div>
                      {isRecording && (
                        <div className="flex items-center mt-2 text-red-500 text-sm">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                          Recording...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={data.diagnosis}
                        onChange={handleInputChange}
                        placeholder="Enter diagnosis details..."
                        className="min-h-[120px] w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="treatment">Treatment Plan</Label>
                      <Textarea
                        id="treatment"
                        name="treatment"
                        value={data.treatment}
                        onChange={handleInputChange}
                        placeholder="Describe the treatment plan..."
                        className="min-h-[120px] w-full"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={data.notes}
                        onChange={handleInputChange}
                        placeholder="Any additional notes or instructions..."
                        className="min-h-[120px] w-full"
                      />
                    </div>
                    
                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Consultation Summary</h3>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p><span className="font-medium">Patient:</span> {data.patientName || 'Not specified'}, {data.patientAge || 'Age not specified'}</p>
                        <p><span className="font-medium">Symptoms:</span> {data.symptoms || 'None recorded'}</p>
                        <p><span className="font-medium">Diagnosis:</span> {data.diagnosis || 'None recorded'}</p>
                        <p><span className="font-medium">Treatment Plan:</span> {data.treatment || 'None recorded'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="transition-all duration-200"
              >
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white transition-all duration-200"
              >
                {currentStep === 3 ? 'Complete Consultation' : 'Next'}
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default ConsultationForm;
