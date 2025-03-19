
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, FileText, Calendar, Microscope, Activity, User,
  SortDesc, Filter, Download
} from 'lucide-react';
import { toast } from 'sonner';

const LabResults = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const labResults = [
    { 
      id: 1, 
      title: "Complete Blood Count (CBC)", 
      date: "2024-04-10", 
      doctor: "Dr. Sarah Johnson", 
      category: "Blood Test",
      status: "normal",
      urgent: false
    },
    { 
      id: 2, 
      title: "Lipid Panel", 
      date: "2024-03-15", 
      doctor: "Dr. Michael Lee", 
      category: "Blood Test",
      status: "abnormal",
      urgent: true
    },
    { 
      id: 3, 
      title: "Urinalysis", 
      date: "2024-02-22", 
      doctor: "Dr. Emily Wong", 
      category: "Urine Test",
      status: "normal",
      urgent: false
    },
    { 
      id: 4, 
      title: "Thyroid Panel", 
      date: "2024-01-30", 
      doctor: "Dr. Robert Chen", 
      category: "Blood Test",
      status: "pending",
      urgent: false
    },
    { 
      id: 5, 
      title: "Liver Function Test", 
      date: "2023-12-12", 
      doctor: "Dr. Sarah Johnson", 
      category: "Blood Test",
      status: "normal",
      urgent: false
    },
    { 
      id: 6, 
      title: "HbA1c Test", 
      date: "2023-11-05", 
      doctor: "Dr. Michael Lee", 
      category: "Blood Test",
      status: "abnormal",
      urgent: false
    }
  ];
  
  // Filter and sort lab results
  const filteredResults = labResults
    .filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const handleViewDetails = (id) => {
    navigate(`/lab-result/${id}`);
  };

  const handleDownload = (id, title) => {
    toast.success(`Downloading ${title} report`);
    // In a real app, this would trigger a file download
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Lab Results</h1>
            <p className="text-muted-foreground max-w-2xl">
              View and download your laboratory test results
            </p>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by test name, category, or doctor..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={toggleSortOrder}
            >
              <SortDesc className="h-4 w-4" />
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <Card 
                key={result.id} 
                className={`p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow ${
                  result.urgent ? 'border-l-4 border-l-red-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Microscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">{result.category}</p>
                    </div>
                  </div>
                  
                  {result.status === 'abnormal' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Abnormal
                    </span>
                  )}
                  
                  {result.status === 'pending' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                      Pending
                    </span>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(result.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>{result.doctor}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleViewDetails(result.id)}
                  >
                    <FileText className="w-4 h-4" />
                    View Details
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleDownload(result.id, result.title)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-4">No lab results match your search criteria.</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default LabResults;
