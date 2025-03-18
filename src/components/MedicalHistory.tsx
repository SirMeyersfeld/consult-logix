
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AnimatedTransition from './AnimatedTransition';

interface ConsultationData {
  patientName: string;
  patientAge: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  date?: string;
}

interface PrescriptionData {
  patientName: string;
  patientAge: string;
  date: string;
  diagnosis: string;
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  notes: string;
}

const MedicalHistory = () => {
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([]);

  useEffect(() => {
    // Get saved consultation and prescription data
    const storedConsultation = localStorage.getItem('consultationData');
    const storedPrescription = localStorage.getItem('prescriptionData');
    
    // For demo purposes, we'll create a history of fake consultations and prescriptions
    // along with the actual ones if they exist
    
    const demoConsultations: ConsultationData[] = [
      {
        patientName: "John Doe",
        patientAge: "35",
        symptoms: "Persistent cough, fever, and fatigue for 5 days.",
        diagnosis: "Acute bronchitis",
        treatment: "Rest, increased fluid intake, and prescribed antibiotics.",
        notes: "Follow up in 7 days if symptoms persist.",
        date: "2023-09-15"
      },
      {
        patientName: "John Doe",
        patientAge: "35",
        symptoms: "Headache, sore throat, and nasal congestion.",
        diagnosis: "Common cold",
        treatment: "Rest, over-the-counter decongestants, and throat lozenges.",
        notes: "Advised to stay hydrated and get plenty of rest.",
        date: "2023-07-22"
      }
    ];
    
    const demoPrescriptions: PrescriptionData[] = [
      {
        patientName: "John Doe",
        patientAge: "35",
        date: "2023-09-15",
        diagnosis: "Acute bronchitis",
        medications: [
          {
            id: "1",
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "Every 8 hours",
            duration: "7 days"
          },
          {
            id: "2",
            name: "Guaifenesin",
            dosage: "400mg",
            frequency: "Every 12 hours",
            duration: "5 days"
          }
        ],
        notes: "Take with food. Complete the full course of antibiotics."
      },
      {
        patientName: "John Doe",
        patientAge: "35",
        date: "2023-07-22",
        diagnosis: "Common cold",
        medications: [
          {
            id: "1",
            name: "Pseudoephedrine",
            dosage: "60mg",
            frequency: "Every 6 hours as needed",
            duration: "3 days"
          }
        ],
        notes: "Do not take more than 4 doses in 24 hours."
      }
    ];
    
    // Add actual data if it exists
    if (storedConsultation) {
      const parsedConsultation = JSON.parse(storedConsultation);
      // Add current date for the new consultation
      parsedConsultation.date = new Date().toISOString().split('T')[0];
      demoConsultations.unshift(parsedConsultation);
    }
    
    if (storedPrescription) {
      const parsedPrescription = JSON.parse(storedPrescription);
      demoPrescriptions.unshift(parsedPrescription);
    }
    
    setConsultations(demoConsultations);
    setPrescriptions(demoPrescriptions);
  }, []);

  return (
    <div className="w-full">
      <AnimatedTransition type="fadeInUp" delay={0.1}>
        <Tabs defaultValue="consultations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consultations" className="text-sm">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-sm">Prescriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultations" className="space-y-4">
            {consultations.map((consultation, index) => (
              <Card key={index} className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{consultation.diagnosis || "No diagnosis"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {consultation.date ? new Date(consultation.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Date not recorded"}
                      </p>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="mt-1">
                      {index === 0 ? "Recent" : "Past"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Symptoms</p>
                      <p className="text-muted-foreground">{consultation.symptoms || "None recorded"}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Treatment</p>
                      <p className="text-muted-foreground">{consultation.treatment || "None recorded"}</p>
                    </div>
                    
                    {consultation.notes && (
                      <div className="col-span-full">
                        <p className="font-medium">Additional Notes</p>
                        <p className="text-muted-foreground">{consultation.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.map((prescription, index) => (
              <Card key={index} className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{prescription.diagnosis || "No diagnosis"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {prescription.date ? new Date(prescription.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Date not recorded"}
                      </p>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="mt-1">
                      {index === 0 ? "Current" : "Past"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Medications</p>
                      <div className="space-y-3">
                        {prescription.medications.map((med, medIndex) => (
                          <div key={med.id} className="bg-secondary/50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <p className="font-medium">{med.name || "Unnamed medication"}</p>
                              <p className="text-sm">{med.dosage}</p>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <p>{med.frequency}</p>
                              <p>{med.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {prescription.notes && (
                      <div>
                        <p className="font-medium text-sm">Instructions</p>
                        <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </AnimatedTransition>
    </div>
  );
};

export default MedicalHistory;
