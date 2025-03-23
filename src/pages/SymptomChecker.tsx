
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  Search, 
  X, 
  Plus, 
  History, 
  Stethoscope, 
  Pill, 
  Calendar, 
  FileText, 
  AlertTriangle 
} from "lucide-react";
import { Label } from "@/components/ui/label";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Symptom {
  id: number;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description: string;
}

interface Condition {
  id: number;
  name: string;
  probability: number;
  description: string;
  symptoms: string[];
  urgency: 'low' | 'medium' | 'high';
  action: string;
}

interface SymptomHistory {
  id: number;
  date: string;
  symptoms: string[];
  condition: string;
}

const SymptomChecker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Shortness of breath", 
    "Nausea", "Dizziness", "Sore throat", "Chest pain", "Abdominal pain",
    "Rash", "Joint pain", "Muscle aches", "Chills", "Vomiting", 
    "Diarrhea", "Constipation", "Back pain", "Neck pain", "Eye pain"
  ];
  
  const symptomHistory: SymptomHistory[] = [
    {
      id: 1,
      date: "May 10, 2023",
      symptoms: ["Headache", "Fever", "Fatigue"],
      condition: "Common Cold"
    },
    {
      id: 2,
      date: "March 22, 2023",
      symptoms: ["Cough", "Shortness of breath", "Chest pain"],
      condition: "Bronchitis"
    }
  ];
  
  const [symptomForm, setSymptomForm] = useState<Omit<Symptom, 'id'>>({
    name: '',
    severity: 'mild',
    duration: '',
    description: ''
  });
  
  const filteredSymptoms = searchTerm 
    ? commonSymptoms.filter(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : commonSymptoms;
  
  const handleAddSymptom = (symptomName: string) => {
    // Check if already added
    if (selectedSymptoms.some(s => s.name === symptomName)) {
      toast.error(`${symptomName} is already added to your symptoms list`);
      return;
    }
    
    const newSymptom: Symptom = {
      id: selectedSymptoms.length + 1,
      name: symptomName,
      severity: 'moderate',
      duration: '1-2 days',
      description: ''
    };
    
    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    setSearchTerm('');
    toast.success(`${symptomName} added to your symptoms`);
  };
  
  const handleCustomSymptomSubmit = () => {
    if (!symptomForm.name.trim()) {
      toast.error("Please enter a symptom name");
      return;
    }
    
    const newSymptom: Symptom = {
      id: selectedSymptoms.length + 1,
      ...symptomForm
    };
    
    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    setSymptomForm({
      name: '',
      severity: 'mild',
      duration: '',
      description: ''
    });
    
    toast.success(`${symptomForm.name} added to your symptoms`);
  };
  
  const handleRemoveSymptom = (id: number) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom.id !== id));
  };
  
  const handleUpdateSymptom = (id: number, field: keyof Symptom, value: string) => {
    setSelectedSymptoms(selectedSymptoms.map(symptom => 
      symptom.id === id ? { ...symptom, [field]: value } : symptom
    ));
  };
  
  const handleAnalyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please add at least one symptom to analyze");
      return;
    }
    
    // Check for emergency symptoms
    const emergencySymptoms = ["Chest pain", "Shortness of breath", "Severe abdominal pain"];
    const hasEmergencySymptom = selectedSymptoms.some(symptom => 
      emergencySymptoms.includes(symptom.name) && symptom.severity === 'severe'
    );
    
    if (hasEmergencySymptom) {
      setShowEmergencyDialog(true);
      return;
    }
    
    toast.success("Analyzing your symptoms...");
    setTimeout(() => {
      setShowResults(true);
      toast.success("Analysis complete!");
    }, 2000);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-amber-100 text-amber-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Mock analysis results based on selected symptoms
  const analysisResults: Condition[] = [
    {
      id: 1,
      name: "Common Cold",
      probability: 85,
      description: "A viral infection affecting the upper respiratory tract, particularly the nose.",
      symptoms: ["Cough", "Sore throat", "Runny nose", "Congestion", "Mild fever"],
      urgency: 'low',
      action: "Rest, drink fluids, and consider over-the-counter medications for symptom relief."
    },
    {
      id: 2,
      name: "Seasonal Allergies",
      probability: 65,
      description: "An immune response to environmental triggers such as pollen, dust, or pet dander.",
      symptoms: ["Sneezing", "Itchy eyes", "Runny nose", "Congestion", "Headache"],
      urgency: 'low',
      action: "Avoid allergens, try over-the-counter antihistamines, and consult an allergist if symptoms persist."
    },
    {
      id: 3,
      name: "Migraine",
      probability: 40,
      description: "A neurological condition that causes severe, recurring headaches and other symptoms.",
      symptoms: ["Severe headache", "Sensitivity to light", "Nausea", "Vision changes", "Fatigue"],
      urgency: 'medium',
      action: "Rest in a dark, quiet room. Consider over-the-counter pain relievers or prescription medications if available."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check your symptoms to get a preliminary assessment and guidance on next steps.
            </p>
          </div>
          
          <Card className="border-primary/20 shadow-sm max-w-4xl mx-auto mb-8">
            <CardHeader className="bg-primary/5">
              <CardTitle>What symptoms are you experiencing?</CardTitle>
              <CardDescription>
                Add the symptoms you're experiencing to get a preliminary assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search for symptoms..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {searchTerm && filteredSymptoms.length > 0 && (
                  <div className="mt-2 border rounded-md p-2 max-h-60 overflow-y-auto">
                    {filteredSymptoms.map((symptom, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-2 hover:bg-slate-100 rounded-md cursor-pointer flex items-center justify-between"
                        onClick={() => handleAddSymptom(symptom)}
                      >
                        <span>{symptom}</span>
                        <Plus className="h-4 w-4 text-primary" />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {selectedSymptoms.length} symptoms selected
                  </span>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Symptom
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Custom Symptom</DialogTitle>
                        <DialogDescription>
                          Describe a symptom that's not in our common list.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="symptom-name">Symptom Name</Label>
                          <Input 
                            id="symptom-name" 
                            placeholder="e.g., Ringing in ears"
                            value={symptomForm.name}
                            onChange={(e) => setSymptomForm({...symptomForm, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="severity">Severity</Label>
                          <Select 
                            value={symptomForm.severity}
                            onValueChange={(value) => setSymptomForm({...symptomForm, severity: value as 'mild' | 'moderate' | 'severe'})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mild">Mild - Noticeable but not disruptive</SelectItem>
                              <SelectItem value="moderate">Moderate - Uncomfortable and somewhat disruptive</SelectItem>
                              <SelectItem value="severe">Severe - Very painful or disruptive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input 
                            id="duration" 
                            placeholder="e.g., 3 days, 2 weeks"
                            value={symptomForm.duration}
                            onChange={(e) => setSymptomForm({...symptomForm, duration: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Additional Details</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Describe any additional details about this symptom"
                            value={symptomForm.description}
                            onChange={(e) => setSymptomForm({...symptomForm, description: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button onClick={handleCustomSymptomSubmit}>Add Symptom</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {selectedSymptoms.length > 0 ? (
                <div className="space-y-4">
                  {selectedSymptoms.map((symptom) => (
                    <div 
                      key={symptom.id} 
                      className="border rounded-md p-4 bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{symptom.name}</h3>
                            <div className={`text-xs px-2 py-0.5 rounded-full ml-2 ${getSeverityColor(symptom.severity)}`}>
                              {symptom.severity}
                            </div>
                          </div>
                          
                          {symptom.duration && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Duration: {symptom.duration}
                            </div>
                          )}
                          
                          {symptom.description && (
                            <div className="text-sm mt-2">
                              {symptom.description}
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveSymptom(symptom.id)}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Select 
                          value={symptom.severity}
                          onValueChange={(value) => handleUpdateSymptom(symptom.id, 'severity', value)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue placeholder="Severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mild">Mild</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="severe">Severe</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Input 
                          placeholder="Duration" 
                          className="w-32 h-8 text-xs"
                          value={symptom.duration}
                          onChange={(e) => handleUpdateSymptom(symptom.id, 'duration', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center mt-6">
                    <Button onClick={handleAnalyzeSymptoms}>
                      Analyze Symptoms
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No symptoms added yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Search for common symptoms or add custom symptoms to get a preliminary assessment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {showResults && (
            <AnimatedTransition type="fadeInUp">
              <Card className="max-w-4xl mx-auto mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Based on the symptoms you provided, here are possible conditions to consider.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analysisResults.map((condition) => (
                      <div 
                        key={condition.id} 
                        className={`border rounded-md p-4 ${condition.probability > 70 ? 'border-primary/30 bg-primary/5' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-lg">{condition.name}</h3>
                              <div className="ml-3 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                                {condition.probability}% match
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mt-2">
                              {condition.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-1">Common Symptoms</div>
                            <div className="flex flex-wrap gap-1">
                              {condition.symptoms.map((symptom, index) => (
                                <span 
                                  key={index}
                                  className={`text-xs px-2 py-1 rounded-full bg-gray-100 
                                    ${selectedSymptoms.some(s => s.name.toLowerCase() === symptom.toLowerCase()) 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'text-gray-800'}`}
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Recommended Action</div>
                            <div className={`px-3 py-2 rounded-md ${getUrgencyColor(condition.urgency)}`}>
                              <div className="text-xs font-medium mb-1 capitalize">{condition.urgency} Urgency</div>
                              <p className="text-sm">{condition.action}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Appointment
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/5 border-t border-primary/10 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">Important Disclaimer</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This symptom checker provides information for educational purposes only and is not a qualified medical opinion. 
                    Always consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </CardFooter>
              </Card>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSymptoms([]);
                    setShowResults(false);
                    setSearchTerm('');
                  }}
                >
                  Start Over
                </Button>
              </div>
            </AnimatedTransition>
          )}
          
          {symptomHistory.length > 0 && !showResults && (
            <div className="max-w-4xl mx-auto mt-12">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Previous Symptom Checks</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {symptomHistory.map((history) => (
                  <Card key={history.id}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{history.condition}</span>
                        <span className="text-sm text-muted-foreground">{history.date}</span>
                      </div>
                      
                      <div>
                        <div className="text-sm mb-1">Reported Symptoms:</div>
                        <div className="flex flex-wrap gap-1">
                          {history.symptoms.map((symptom, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="ghost" size="sm">
                          <Pill className="h-4 w-4 mr-2" />
                          Medications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </AnimatedTransition>
      
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-red-600 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Emergency Warning
            </DialogTitle>
          </DialogHeader>
          
          <div className="border-2 border-red-200 rounded-md p-4 bg-red-50 text-center">
            <p className="font-medium mb-2">
              You've reported symptoms that may indicate a medical emergency.
            </p>
            <p className="text-sm mb-4">
              If you're experiencing severe chest pain, difficulty breathing, or other severe symptoms, 
              please seek immediate medical attention.
            </p>
            <div className="p-3 bg-white rounded-md mb-2">
              <p className="font-bold text-red-600 text-lg">Emergency Services: 911</p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="sm:w-1/2"
              onClick={() => setShowEmergencyDialog(false)}
            >
              I'll Seek Help
            </Button>
            <Button 
              variant="default" 
              className="sm:w-1/2"
              onClick={() => {
                setShowEmergencyDialog(false);
                setShowResults(true);
              }}
            >
              Continue with Analysis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SymptomChecker;
