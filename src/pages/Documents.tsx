
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, FileText, Download, Calendar, 
  Upload, File, PlusCircle, FolderOpen
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const documents = [
    { 
      id: 1, 
      title: "Medical Insurance Policy", 
      date: "2024-03-15", 
      category: "Insurance",
      type: "pdf",
      size: "1.2 MB",
      shared: true
    },
    { 
      id: 2, 
      title: "Annual Physical Summary", 
      date: "2024-02-10", 
      category: "Reports",
      type: "pdf",
      size: "850 KB",
      shared: false
    },
    { 
      id: 3, 
      title: "Cardiology Specialist Referral", 
      date: "2024-01-22", 
      category: "Referrals",
      type: "pdf",
      size: "520 KB",
      shared: true
    },
    { 
      id: 4, 
      title: "Laboratory Results - Blood Work", 
      date: "2023-12-05", 
      category: "Lab Results",
      type: "pdf",
      size: "1.5 MB",
      shared: false
    },
    { 
      id: 5, 
      title: "Allergy Test Results", 
      date: "2023-11-18", 
      category: "Lab Results",
      type: "pdf",
      size: "980 KB",
      shared: false
    },
    { 
      id: 6, 
      title: "Chest X-Ray Images", 
      date: "2023-10-30", 
      category: "Imaging",
      type: "jpg",
      size: "4.2 MB",
      shared: true
    },
    { 
      id: 7, 
      title: "Physical Therapy Plan", 
      date: "2023-09-12", 
      category: "Treatment Plans",
      type: "docx",
      size: "750 KB",
      shared: false
    },
    { 
      id: 8, 
      title: "Medication List", 
      date: "2023-08-05", 
      category: "Medications",
      type: "pdf",
      size: "320 KB",
      shared: true
    }
  ];
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDownload = (id: number, title: string) => {
    toast.success(`Downloading ${title}`);
  };
  
  const handleShare = (id: number, title: string) => {
    toast.success(`Sharing options opened for ${title}`);
  };
  
  const handleUpload = () => {
    toast.success('Document uploaded successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Health Documents</h1>
            <p className="text-muted-foreground max-w-2xl">
              Securely store and manage all your health-related documents
            </p>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <TabsList className="mb-0">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  title="Filter documents"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button 
                  className="flex items-center gap-1 whitespace-nowrap"
                  onClick={handleUpload}
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((document) => (
                  <Card 
                    key={document.id} 
                    className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {document.type === 'pdf' ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : document.type === 'jpg' ? (
                            <File className="w-5 h-5 text-blue-500" />
                          ) : (
                            <File className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-1">{document.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary" className="text-xs font-normal">
                              {document.category}
                            </Badge>
                            {document.shared && (
                              <Badge variant="outline" className="ml-2 text-xs font-normal">
                                Shared
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      
                      <span className="text-xs text-muted-foreground">
                        {document.size}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleShare(document.id, document.title)}
                      >
                        Share
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(document.id, document.title)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="p-5 border-border/50 border-dashed flex flex-col items-center justify-center min-h-[215px] hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={handleUpload}
                >
                  <PlusCircle className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground font-medium">Upload New Document</p>
                </Card>
              </div>
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Documents Found</h3>
                  <p className="text-muted-foreground mb-4">No documents match your search criteria.</p>
                  <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              )}
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent value="shared" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.filter(doc => doc.shared).map((document) => (
                  <Card 
                    key={document.id} 
                    className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {document.type === 'pdf' ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : document.type === 'jpg' ? (
                            <File className="w-5 h-5 text-blue-500" />
                          ) : (
                            <File className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-1">{document.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary" className="text-xs font-normal">
                              {document.category}
                            </Badge>
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              Shared
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      
                      <span className="text-xs text-muted-foreground">
                        {document.size}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleShare(document.id, document.title)}
                      >
                        Share
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(document.id, document.title)}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              {filteredDocuments.filter(doc => doc.shared).length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Shared Documents</h3>
                  <p className="text-muted-foreground mb-4">You haven't shared any documents yet.</p>
                </div>
              )}
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.slice(0, 3).map((document) => (
                  <Card 
                    key={document.id} 
                    className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {document.type === 'pdf' ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : document.type === 'jpg' ? (
                            <File className="w-5 h-5 text-blue-500" />
                          ) : (
                            <File className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-1">{document.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary" className="text-xs font-normal">
                              {document.category}
                            </Badge>
                            {document.shared && (
                              <Badge variant="outline" className="ml-2 text-xs font-normal">
                                Shared
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(document.date).toLocaleDateString()}</span>
                      </div>
                      
                      <span className="text-xs text-muted-foreground">
                        {document.size}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleShare(document.id, document.title)}
                      >
                        Share
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(document.id, document.title)}
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

export default Documents;
