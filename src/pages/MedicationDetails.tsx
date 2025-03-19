
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, Pill, Clock, CalendarDays, AlertCircle, 
  User, MessageSquare, Edit, Trash2, CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';

const MedicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get medication details
    setTimeout(() => {
      const mockMedication = {
        id: parseInt(id),
        name: "Amoxicillin", 
        dosage: "500mg", 
        frequency: "Every 8 hours", 
        startDate: "2024-04-10", 
        endDate: "2024-04-24", 
        instructions: "Take with food. Complete the full course even if you feel better. Do not take with dairy products.",
        status: "active",
        doctor: "Dr. Sarah Johnson",
        type: "Antibiotic",
        pharmacy: "City Pharmacy",
        prescriptionNumber: "RX-98765432",
        sideEffects: "May cause diarrhea, nausea, or vomiting. Contact your doctor if you experience severe side effects or allergic reactions.",
        refillCount: 0,
        maxRefills: 1
      };
      setMedication(mockMedication);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleEdit = () => {
    toast.success('Edit functionality will be available soon');
  };

  const handleMarkComplete = () => {
    toast.success('Medication marked as completed');
    setMedication(prev => ({ ...prev, status: 'completed', endDate: new Date().toISOString().split('T')[0] }));
  };

  const handleDelete = () => {
    toast.success('Medication deleted successfully');
    setTimeout(() => {
      navigate('/medications');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-center">
              <div className="h-8 w-48 bg-primary/20 rounded-md mx-auto mb-4"></div>
              <div className="h-4 w-32 bg-primary/10 rounded-md mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-1"
            onClick={() => navigate('/medications')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Medications
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full ${medication.status === 'active' ? 'bg-primary/10' : 'bg-muted/30'} flex items-center justify-center mr-4`}>
                <Pill className={`w-6 h-6 ${medication.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{medication.name}</h1>
                <div className="flex items-center">
                  <span className="text-muted-foreground">{medication.type}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    {medication.status === 'active' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        <span className="text-green-700">Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Completed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {medication.status === 'active' && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleMarkComplete}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </Button>
              )}
              <Button 
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button 
                variant="destructive"
                className="flex items-center gap-1"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-2">
            <Card className="p-6 border-border/50 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Medication Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Dosage</h3>
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-lg">{medication.dosage}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Frequency</h3>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-lg">{medication.frequency}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Duration</h3>
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-lg">
                        {new Date(medication.startDate).toLocaleDateString()} - 
                        {medication.endDate ? new Date(medication.endDate).toLocaleDateString() : ' Ongoing'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Prescribed By</h3>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-lg">{medication.doctor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Pharmacy</h3>
                    <p className="text-lg">{medication.pharmacy}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Prescription #</h3>
                    <p className="text-lg">{medication.prescriptionNumber}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Refills</h3>
                    <p className="text-lg">{medication.refillCount} of {medication.maxRefills} used</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Instructions</h3>
                <div className="flex items-start mt-2">
                  <MessageSquare className="w-5 h-5 mr-3 mt-1 text-primary" />
                  <p className="text-base leading-relaxed">{medication.instructions}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Potential Side Effects</h3>
                <p className="text-base leading-relaxed">{medication.sideEffects}</p>
              </div>
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.2} className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="p-6 border-border/50 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Medication Schedule</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="font-medium text-primary">Morning</p>
                    <p className="text-sm">8:00 AM</p>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="font-medium text-primary">Afternoon</p>
                    <p className="text-sm">4:00 PM</p>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="font-medium text-primary">Evening</p>
                    <p className="text-sm">12:00 AM</p>
                  </div>
                </div>
                
                <Button className="w-full mt-4">Set Reminders</Button>
              </Card>
              
              <Card className="p-6 border-border/50 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Similar Medications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                    <Pill className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Penicillin</p>
                      <p className="text-xs text-muted-foreground">Antibiotic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                    <Pill className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Cephalexin</p>
                      <p className="text-xs text-muted-foreground">Antibiotic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                    <Pill className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Azithromycin</p>
                      <p className="text-xs text-muted-foreground">Antibiotic</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default MedicationDetails;
