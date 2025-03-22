
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Activity, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("documents");
  
  const records = [
    { id: 1, title: "Blood Test Results", date: "2024-04-15", doctor: "Dr. Sarah Johnson", category: "Lab Results", type: "documents" },
    { id: 2, title: "Annual Physical Checkup", date: "2024-03-10", doctor: "Dr. Michael Lee", category: "Checkup", type: "documents" },
    { id: 3, title: "X-Ray Report", date: "2024-02-22", doctor: "Dr. Emily Wong", category: "Imaging", type: "documents" },
    { id: 4, title: "Medication History", date: "2024-01-17", doctor: "Dr. Robert Chen", category: "Prescription", type: "documents" },
    { id: 5, title: "Therapy Session 1", date: "2024-04-05", doctor: "Dr. Jessica Wilson", category: "Therapy", type: "recordings" },
    { id: 6, title: "Consultation Recording", date: "2024-03-12", doctor: "Dr. Michael Lee", category: "Consultation", type: "recordings" },
    { id: 7, title: "Follow-up Recording", date: "2024-02-18", doctor: "Dr. Sarah Johnson", category: "Follow-up", type: "recordings" }
  ];

  const handleDownload = (recordId) => {
    toast.success(`Downloading record #${recordId}`);
    // In a real app, this would trigger a file download
  };

  const handleViewDetails = (recordId) => {
    navigate(`/record-details/${recordId}`);
  };

  const handleListen = (recordId) => {
    toast.success(`Playing recording #${recordId}`);
    // In a real app, this would play the audio recording
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
            <p className="text-muted-foreground max-w-2xl">
              All your medical documents and recordings in one secure place
            </p>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="documents" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.filter(record => record.type === "documents").map((record) => (
                  <Card key={record.id} className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">{record.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <User className="w-4 h-4 mr-1" />
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleViewDetails(record.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(record.id)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent value="recordings" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.filter(record => record.type === "recordings").map((record) => (
                  <Card key={record.id} className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">{record.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <User className="w-4 h-4 mr-1" />
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleListen(record.id)}
                      >
                        Listen
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(record.id)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedTransition>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MedicalRecords;
