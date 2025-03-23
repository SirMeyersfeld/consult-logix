
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlusCircle, Search, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

interface Interaction {
  id: number;
  severity: 'high' | 'medium' | 'low' | 'none';
  description: string;
  recommendation: string;
  medications: [string, string];
}

const MedicationInteractions = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
    { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "At bedtime" },
    { id: 4, name: "Aspirin", dosage: "81mg", frequency: "Daily" }
  ]);
  
  const [newMedication, setNewMedication] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: 1,
      severity: 'medium',
      description: 'Potential blood pressure lowering effect may be enhanced when taken together.',
      recommendation: 'Monitor blood pressure regularly and adjust dosage if needed.',
      medications: ['Lisinopril', 'Aspirin']
    },
    {
      id: 2,
      severity: 'low',
      description: 'May slightly increase the risk of muscle pain or weakness.',
      recommendation: 'Report any unusual muscle pain to your doctor.',
      medications: ['Atorvastatin', 'Metformin']
    }
  ]);

  const handleAddMedication = () => {
    if (!newMedication.trim()) {
      toast.error("Please enter a medication name");
      return;
    }

    const newMed: Medication = {
      id: medications.length + 1,
      name: newMedication,
      dosage: "",
      frequency: ""
    };

    setMedications([...medications, newMed]);
    setNewMedication("");
    toast.success("Medication added successfully!");
    
    // Simulate checking for interactions
    setTimeout(() => {
      toast.info("Checking for potential interactions...");
    }, 500);
  };

  const handleCheckInteractions = () => {
    // In a real application, this would make an API call to check for interactions
    toast.success("Medication interactions checked!");
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'none': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'low': return <Info className="h-5 w-5" />;
      case 'none': return <CheckCircle2 className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Medication Interactions Checker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check for potential interactions between your medications to ensure your safety.
            </p>
          </div>
          
          <Tabs defaultValue="current" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="current">My Medications</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Current Medications</span>
                    <Button onClick={handleCheckInteractions}>Check Interactions</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-6">
                    <Input 
                      placeholder="Add a medication..."
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddMedication}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search medications..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {filteredMedications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No medications found.
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredMedications.map((med) => (
                        <div key={med.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <h3 className="font-medium">{med.name}</h3>
                            {med.dosage && (
                              <p className="text-sm text-muted-foreground">
                                {med.dosage} - {med.frequency}
                              </p>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Potential Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {interactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No interactions found between your medications.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {interactions.map((interaction) => (
                        <Alert key={interaction.id} className={`${getSeverityColor(interaction.severity)}`}>
                          <div className="flex items-start">
                            {getSeverityIcon(interaction.severity)}
                            <div className="ml-2">
                              <AlertTitle className="font-medium">
                                Interaction between {interaction.medications[0]} and {interaction.medications[1]}
                              </AlertTitle>
                              <AlertDescription className="mt-1">
                                <p>{interaction.description}</p>
                                <p className="mt-2 font-medium">Recommendation: {interaction.recommendation}</p>
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default MedicationInteractions;
