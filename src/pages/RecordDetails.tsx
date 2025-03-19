
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Calendar, User, ArrowLeft, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const RecordDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get record details
    setTimeout(() => {
      const mockRecord = {
        id: parseInt(id),
        title: "Blood Test Results",
        date: "2024-04-15",
        doctor: "Dr. Sarah Johnson",
        category: "Lab Results",
        content: "Patient shows normal blood count levels. Cholesterol is within normal range. Vitamin D levels are slightly low, supplementation recommended. Follow-up in 6 months recommended.",
        measurements: [
          { name: "White Blood Cell Count", value: "7.8", unit: "10³/μL", normal: "4.5-11.0" },
          { name: "Red Blood Cell Count", value: "5.2", unit: "10⁶/μL", normal: "4.7-6.1" },
          { name: "Hemoglobin", value: "14.2", unit: "g/dL", normal: "13.5-17.5" },
          { name: "Cholesterol", value: "185", unit: "mg/dL", normal: "<200" },
          { name: "Vitamin D", value: "28", unit: "ng/mL", normal: "30-100" }
        ]
      };
      setRecord(mockRecord);
      setLoading(false);
    }, 800);
  }, [id]);

  const handlePrint = () => {
    toast.success('Preparing document for printing...');
    window.print();
  };

  const handleShare = () => {
    toast.success('Sharing options opened');
    // In a real app, this would open a sharing dialog
  };

  const handleDownload = () => {
    toast.success('Document downloaded successfully');
    // In a real app, this would trigger a download
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
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Records
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{record?.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(record?.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <User className="w-4 h-4 mr-1" />
                <span>{record?.doctor}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button 
                className="flex items-center gap-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-2">
            <Card className="p-6 border-border/50 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Medical Report</h2>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-base leading-relaxed">
                  {record?.content}
                </p>
              </div>
              
              {record?.measurements && record.measurements.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Test Results</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium">Measurement</th>
                          <th className="text-left py-3 px-4 font-medium">Value</th>
                          <th className="text-left py-3 px-4 font-medium">Unit</th>
                          <th className="text-left py-3 px-4 font-medium">Normal Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.measurements.map((item, index) => (
                          <tr key={index} className="border-b border-border/50 last:border-0">
                            <td className="py-3 px-4 font-medium">{item.name}</td>
                            <td className="py-3 px-4">{item.value}</td>
                            <td className="py-3 px-4">{item.unit}</td>
                            <td className="py-3 px-4">{item.normal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.2} className="lg:col-span-1">
            <Card className="p-6 border-border/50 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Related Records</h3>
              
              <div className="space-y-4">
                <div className="p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <h4 className="font-medium">Previous Blood Test</h4>
                  <p className="text-sm text-muted-foreground">October 15, 2023</p>
                </div>
                
                <div className="p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <h4 className="font-medium">Medical Consultation</h4>
                  <p className="text-sm text-muted-foreground">April 2, 2024</p>
                </div>
                
                <div className="p-3 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <h4 className="font-medium">Prescription Update</h4>
                  <p className="text-sm text-muted-foreground">April 16, 2024</p>
                </div>
              </div>
            </Card>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default RecordDetails;
