
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, BookmarkPlus, Share2, ThumbsUp, MessageSquare, Filter, BookmarkCheck, TrendingUp, BadgeAlert, BookOpen } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Article {
  id: number;
  title: string;
  summary: string;
  source: string;
  date: string;
  image: string;
  category: string;
  isBookmarked: boolean;
  url: string;
  readTime: number;
}

interface Topic {
  id: number;
  name: string;
  count: number;
  isFollowed: boolean;
}

const HealthNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "New Study Shows Benefits of Mediterranean Diet for Heart Health",
      summary: "A recent large-scale study has found that following a Mediterranean diet rich in olive oil, nuts, and vegetables can significantly reduce the risk of cardiovascular events.",
      source: "Journal of Medical Research",
      date: "2023-05-15",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&h=350&auto=format&fit=crop",
      category: "Nutrition",
      isBookmarked: false,
      url: "#",
      readTime: 8
    },
    {
      id: 2,
      title: "FDA Approves New Breakthrough Treatment for Type 2 Diabetes",
      summary: "The Food and Drug Administration has approved a novel once-weekly injection that has shown promising results in controlling blood sugar levels in adults with type 2 diabetes.",
      source: "Health Innovations",
      date: "2023-05-10",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=350&auto=format&fit=crop",
      category: "Treatments",
      isBookmarked: true,
      url: "#",
      readTime: 6
    },
    {
      id: 3,
      title: "Mental Health Awareness: Recognizing Signs of Anxiety and Depression",
      summary: "Mental health experts discuss the importance of recognizing early signs of anxiety and depression, and when to seek professional help.",
      source: "Psychology Today",
      date: "2023-05-05",
      image: "https://images.unsplash.com/photo-1494774157363-9c7f5e53e3bc?q=80&w=600&h=350&auto=format&fit=crop",
      category: "Mental Health",
      isBookmarked: false,
      url: "#",
      readTime: 10
    },
    {
      id: 4,
      title: "The Science Behind Interval Training: Why HIIT Works",
      summary: "Research explains why high-intensity interval training (HIIT) is so effective for improving cardiovascular health and metabolic function in less time than traditional workouts.",
      source: "Fitness Science Review",
      date: "2023-05-02",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=350&auto=format&fit=crop",
      category: "Fitness",
      isBookmarked: false,
      url: "#",
      readTime: 7
    },
    {
      id: 5,
      title: "Advances in Telemedicine Improving Rural Healthcare Access",
      summary: "Telemedicine technologies are helping bridge the healthcare gap for rural communities, providing access to specialists and reducing the need for long-distance travel.",
      source: "Digital Health Today",
      date: "2023-04-28",
      image: "https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=600&h=350&auto=format&fit=crop",
      category: "Technology",
      isBookmarked: true,
      url: "#",
      readTime: 5
    }
  ]);
  
  const topics: Topic[] = [
    { id: 1, name: "Nutrition", count: 156, isFollowed: true },
    { id: 2, name: "Mental Health", count: 128, isFollowed: false },
    { id: 3, name: "Fitness", count: 104, isFollowed: true },
    { id: 4, name: "Chronic Diseases", count: 98, isFollowed: false },
    { id: 5, name: "Women's Health", count: 87, isFollowed: false },
    { id: 6, name: "Men's Health", count: 76, isFollowed: false },
    { id: 7, name: "Children's Health", count: 65, isFollowed: false },
    { id: 8, name: "Preventive Care", count: 59, isFollowed: true },
    { id: 9, name: "Alternative Medicine", count: 45, isFollowed: false },
    { id: 10, name: "Medical Research", count: 120, isFollowed: true }
  ];
  
  const trendingTopics = ["COVID-19 Updates", "Heart Disease Prevention", "Mental Wellness", "Diabetes Management", "Cancer Research"];
  
  const handleBookmarkToggle = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, isBookmarked: !article.isBookmarked } 
        : article
    ));
    
    const article = articles.find(article => article.id === id);
    if (article) {
      toast.success(article.isBookmarked 
        ? `Removed "${article.title}" from bookmarks` 
        : `Saved "${article.title}" to bookmarks`
      );
    }
  };
  
  const handleShare = (article: Article) => {
    toast.success(`Sharing "${article.title}" to your networks`);
  };
  
  const handleTopicFollow = (id: number) => {
    const topicName = topics.find(topic => topic.id === id)?.name;
    toast.success(`You are now following ${topicName}`);
  };
  
  const filteredArticles = searchTerm 
    ? articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;
  
  const bookmarkedArticles = articles.filter(article => article.isBookmarked);
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'treatments': return 'bg-blue-100 text-blue-800';
      case 'mental health': return 'bg-purple-100 text-purple-800';
      case 'fitness': return 'bg-orange-100 text-orange-800';
      case 'technology': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Health News & Articles</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest health news, research, and medical breakthroughs.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <div className="lg:w-3/4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for health news and topics..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" className="mb-6">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Articles</TabsTrigger>
                    <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <TabsContent value="all" className="mt-6">
                  <div className="space-y-6">
                    {filteredArticles.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Search className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-medium">No articles found</h3>
                          <p className="text-muted-foreground mt-1">
                            Try adjusting your search or explore different topics.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      filteredArticles.map((article) => (
                        <Card key={article.id} className="overflow-hidden">
                          <div className="sm:flex">
                            <div className="sm:w-1/3 h-48 sm:h-auto">
                              <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="sm:w-2/3 p-6">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className={getCategoryColor(article.category)}>
                                  {article.category}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {article.readTime} min read
                                </div>
                              </div>
                              
                              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {article.summary}
                              </p>
                              
                              <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs text-muted-foreground">
                                  {article.source} · {new Date(article.date).toLocaleDateString()}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleBookmarkToggle(article.id)}
                                  >
                                    {article.isBookmarked ? (
                                      <BookmarkCheck className="h-4 w-4 text-primary" />
                                    ) : (
                                      <BookmarkPlus className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleShare(article)}
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardFooter className="px-6 py-3 bg-gray-50 border-t flex justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Comment
                              </Button>
                            </div>
                            <Button size="sm">Read More</Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="bookmarked" className="mt-6">
                  <div className="space-y-6">
                    {bookmarkedArticles.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <BookmarkPlus className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-medium">No bookmarked articles</h3>
                          <p className="text-muted-foreground mt-1 mb-4">
                            Save articles to read later by clicking the bookmark icon.
                          </p>
                          <Button variant="outline" onClick={() => setSearchTerm('')}>
                            Browse Articles
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      bookmarkedArticles.map((article) => (
                        <Card key={article.id} className="overflow-hidden">
                          <div className="sm:flex">
                            <div className="sm:w-1/3 h-48 sm:h-auto">
                              <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="sm:w-2/3 p-6">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className={getCategoryColor(article.category)}>
                                  {article.category}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {article.readTime} min read
                                </div>
                              </div>
                              
                              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {article.summary}
                              </p>
                              
                              <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs text-muted-foreground">
                                  {article.source} · {new Date(article.date).toLocaleDateString()}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleBookmarkToggle(article.id)}
                                  >
                                    <BookmarkCheck className="h-4 w-4 text-primary" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleShare(article)}
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardFooter className="px-6 py-3 bg-gray-50 border-t flex justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Comment
                              </Button>
                            </div>
                            <Button size="sm">Read More</Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Articles</Button>
              </div>
            </div>
            
            <div className="lg:w-1/4 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Health Topics
                  </CardTitle>
                  <CardDescription>
                    Follow topics to get personalized updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {topics.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-medium">{topic.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {topic.count} articles
                          </span>
                        </div>
                        <Button 
                          variant={topic.isFollowed ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleTopicFollow(topic.id)}
                        >
                          {topic.isFollowed ? "Following" : "Follow"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <BadgeAlert className="h-5 w-5 mr-2 text-primary" />
                    Health Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                      <h4 className="font-medium text-amber-800">Flu Season Alert</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Flu activity is increasing in your area. Consider getting vaccinated.
                      </p>
                    </div>
                    <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                      <h4 className="font-medium text-blue-800">Medication Recall</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Check if your prescription is affected by the recent recall.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Alerts</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default HealthNews;
