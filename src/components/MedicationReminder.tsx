
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, Check, X } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

const MedicationReminder = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Lisinopril", dosage: "10mg", time: "8:00 AM", taken: false },
    { id: 2, name: "Vitamin D", dosage: "2000 IU", time: "9:00 AM", taken: true },
    { id: 3, name: "Metformin", dosage: "500mg", time: "1:00 PM", taken: false },
    { id: 4, name: "Atorvastatin", dosage: "20mg", time: "8:00 PM", taken: false }
  ]);

  const markAsTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    toast.success("Medication marked as taken!");
  };

  const markAsSkipped = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: false } : med
    ));
    toast.success("Medication marked as skipped!");
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const pendingMedications = medications.filter(med => !med.taken);

  return (
    <AnimatedTransition type="fadeInUp">
      <Card className="w-full shadow-sm border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Medication Reminders</h3>
            </div>
            <span className="text-sm text-muted-foreground">{currentDate}</span>
          </div>
          
          {pendingMedications.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <Check className="w-10 h-10 mx-auto text-green-500 mb-2" />
              <p className="text-muted-foreground">All medications taken for today!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {medications.map((medication) => (
                <div 
                  key={medication.id} 
                  className={`p-3 rounded-lg border ${
                    medication.taken 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-primary/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${medication.taken ? 'line-through text-muted-foreground' : ''}`}>
                        {medication.name} - {medication.dosage}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{medication.time}</span>
                      </div>
                    </div>
                    
                    {!medication.taken ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 border-green-500 text-green-500 hover:bg-green-50"
                          onClick={() => markAsTaken(medication.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Taken
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => markAsSkipped(medication.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Skip
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsSkipped(medication.id)}
                      >
                        Undo
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 py-4 bg-gray-50 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/medications')}
          >
            View All Medications
          </Button>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default MedicationReminder;
