
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const AddMedication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    instructions: '',
    doctor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would save the medication to the database
    toast.success('Medication added successfully');
    
    // Navigate back to medications page
    setTimeout(() => {
      navigate('/medications');
    }, 1000);
  };

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
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Add New Medication</h1>
            <p className="text-muted-foreground max-w-2xl">
              Enter the details of your new medication
            </p>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.1}>
          <Card className="p-6 border-border/50 shadow-sm max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Medication Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Amoxicillin"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Medication Type</Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="e.g. Antibiotic"
                      value={formData.type}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dosage">Dosage *</Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      placeholder="e.g. 500mg"
                      value={formData.dosage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">Frequency *</Label>
                    <Input
                      id="frequency"
                      name="frequency"
                      placeholder="e.g. Every 8 hours"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        className="pl-10"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate">End Date (if applicable)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        className="pl-10"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="doctor">Prescribing Doctor</Label>
                    <Input
                      id="doctor"
                      name="doctor"
                      placeholder="e.g. Dr. Sarah Johnson"
                      value={formData.doctor}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      placeholder="e.g. Take with food"
                      className="w-full p-3 border border-input rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={formData.instructions}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8 gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => navigate('/medications')}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Medication</Button>
              </div>
            </form>
          </Card>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default AddMedication;
