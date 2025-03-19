
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pill, Clock, CalendarDays, AlertCircle, Search, PlusCircle, 
  CheckCircle, XCircle, ChevronRight
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const Medications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const medications = [
    { 
      id: 1, 
      name: "Amoxicillin", 
      dosage: "500mg", 
      frequency: "Every 8 hours", 
      startDate: "2024-04-10", 
      endDate: "2024-04-24", 
      instructions: "Take with food",
      status: "active",
      doctor: "Dr. Sarah Johnson",
      type: "Antibiotic"
    },
    { 
      id: 2, 
      name: "Lisinopril", 
      dosage: "10mg", 
      frequency: "Once daily", 
      startDate: "2023-10-15", 
      endDate: null, 
      instructions: "Take in the morning",
      status: "active",
      doctor: "Dr. Michael Lee",
      type: "Blood Pressure"
    },
    { 
      id: 3, 
      name: "Metformin", 
      dosage: "850mg", 
      frequency: "Twice daily", 
      startDate: "2023-11-20", 
      endDate: null, 
      instructions: "Take with meals",
      status: "active",
      doctor: "Dr. Emily Wong",
      type: "Diabetes"
    },
    { 
      id: 4, 
      name: "Ibuprofen", 
      dosage: "400mg", 
      frequency: "As needed", 
      startDate: "2024-03-05", 
      endDate: "2024-03-12", 
      instructions: "Take for pain",
      status: "completed",
      doctor: "Dr. Robert Chen",
      type: "Pain Reliever"
    },
    { 
      id: 5, 
      name: "Prednisone", 
      dosage: "20mg", 
      frequency: "Once daily", 
      startDate: "2024-02-18", 
      endDate: "2024-03-03", 
      instructions: "Taper as directed",
      status: "completed",
      doctor: "Dr. Sarah Johnson",
      type: "Corticosteroid"
    }
  ];

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMedications = filteredMedications.filter(med => med.status === "active");
  const completedMedications = filteredMedications.filter(med => med.status === "completed");

  const handleAddMedication = () => {
    toast.success('Redirecting to add medication form');
    navigate('/add-medication');
  };

  const handleMedicationDetails = (id) => {
    navigate(`/medication-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Medications</h1>
              <p className="text-muted-foreground max-w-2xl">
                Track your current and past medications
              </p>
            </div>
            
            <Button 
              onClick={handleAddMedication}
              className="mt-4 md:mt-0 flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              Add Medication
            </Button>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.1}>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search medications..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="active">Active ({activeMedications.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedMedications.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              {activeMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeMedications.map((med) => (
                    <Card 
                      key={med.id} 
                      className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleMedicationDetails(med.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Pill className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{med.name}</h3>
                            <p className="text-sm text-muted-foreground">{med.type}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="p-2 bg-primary/5 rounded-md">
                          <div className="flex items-center text-sm">
                            <AlertCircle className="w-4 h-4 mr-1 text-primary" />
                            <span>{med.dosage}</span>
                          </div>
                        </div>
                        <div className="p-2 bg-primary/5 rounded-md">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1 text-primary" />
                            <span>{med.frequency}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span>Since {new Date(med.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          <span>Active</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Pill className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Medications</h3>
                  <p className="text-muted-foreground mb-6">You don't have any active medications at the moment.</p>
                  <Button onClick={handleAddMedication}>Add Medication</Button>
                </div>
              )}
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              {completedMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedMedications.map((med) => (
                    <Card 
                      key={med.id} 
                      className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleMedicationDetails(med.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center mr-3">
                            <Pill className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{med.name}</h3>
                            <p className="text-sm text-muted-foreground">{med.type}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/20 rounded-md">
                          <div className="flex items-center text-sm">
                            <AlertCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span>{med.dosage}</span>
                          </div>
                        </div>
                        <div className="p-2 bg-muted/20 rounded-md">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span>{med.frequency}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span>{new Date(med.startDate).toLocaleDateString()} - {new Date(med.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <XCircle className="w-4 h-4 mr-1" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Pill className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Completed Medications</h3>
                  <p className="text-muted-foreground mb-6">You don't have any completed medications yet.</p>
                </div>
              )}
            </AnimatedTransition>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Medications;
