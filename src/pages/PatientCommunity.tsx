
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Share2, Filter, Users, HeartPulse, Calendar, Star } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  topic: string;
  time: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Group {
  id: number;
  name: string;
  members: number;
  description: string;
  icon: React.ReactNode;
}

const PatientCommunity = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&h=64&auto=format&fit=crop"
      },
      content: "Just had my annual check-up and all my numbers are looking good! Regular monitoring is so important for managing chronic conditions.",
      topic: "General Health",
      time: "2 hours ago",
      likes: 24,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: "Robert Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&h=64&auto=format&fit=crop"
      },
      content: "Has anyone tried the new glucose monitoring system? I'm thinking of switching but would like to hear some real experiences first.",
      topic: "Diabetes",
      time: "5 hours ago",
      likes: 15,
      comments: 8,
      isLiked: true
    },
    {
      id: 3,
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=64&h=64&auto=format&fit=crop"
      },
      content: "Found a great low-impact exercise routine that's been helping with my joint pain. Happy to share with anyone who's interested!",
      topic: "Arthritis",
      time: "1 day ago",
      likes: 32,
      comments: 12,
      isLiked: false
    }
  ]);
  
  const groups: Group[] = [
    {
      id: 1,
      name: "Diabetes Support",
      members: 1245,
      description: "A community for people managing diabetes to share tips and support.",
      icon: <HeartPulse className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      name: "Chronic Pain Management",
      members: 876,
      description: "Discuss strategies for living with and managing chronic pain.",
      icon: <Star className="h-5 w-5 text-purple-500" />
    },
    {
      id: 3,
      name: "Mental Health Wellness",
      members: 2103,
      description: "A safe space to discuss mental health topics and support each other.",
      icon: <Users className="h-5 w-5 text-green-500" />
    },
    {
      id: 4,
      name: "Heart Health",
      members: 932,
      description: "For patients with heart conditions to share experiences and advice.",
      icon: <HeartPulse className="h-5 w-5 text-red-500" />
    },
    {
      id: 5,
      name: "Caregiver Support",
      members: 654,
      description: "Support for those caring for family members with health conditions.",
      icon: <Users className="h-5 w-5 text-amber-500" />
    },
    {
      id: 6,
      name: "Health & Nutrition",
      members: 1876,
      description: "Discuss healthy eating patterns and nutritional advice.",
      icon: <Calendar className="h-5 w-5 text-teal-500" />
    }
  ];
  
  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast.error("Please enter something to post");
      return;
    }
    
    const newPostObj: Post = {
      id: posts.length + 1,
      author: {
        name: localStorage.getItem('userName') || "Anonymous User",
        avatar: ""
      },
      content: newPost,
      topic: "General",
      time: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    toast.success("Your post has been shared with the community!");
  };
  
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };
  
  const handleJoinGroup = (groupId: number) => {
    toast.success(`You've joined the group successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Patient Community</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with other patients, share experiences, and find support in your health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="feed">Community Feed</TabsTrigger>
                  <TabsTrigger value="groups">Support Groups</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feed" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <Textarea 
                        placeholder="Share your thoughts, questions, or experiences with the community..."
                        className="resize-none mb-3"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handlePostSubmit}>Post</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Recent Posts</h3>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  
                  {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardHeader className="px-4 py-4 flex flex-row items-start gap-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{post.time} · {post.topic}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 py-2">
                        <p className="text-sm">{post.content}</p>
                      </CardContent>
                      <CardFooter className="px-4 py-3 border-t flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? "text-primary" : ""}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="groups">
                  <div className="mb-6">
                    <Input placeholder="Search support groups..." />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {groups.map((group) => (
                      <Card key={group.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full p-2 bg-primary/10">
                                {group.icon}
                              </div>
                              <CardTitle className="text-lg">{group.name}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                          <p className="text-xs mt-2 font-medium">{group.members} members</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleJoinGroup(group.id)} 
                            className="w-full"
                            variant="outline"
                          >
                            Join Group
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>✓ Be respectful and supportive to other members</p>
                  <p>✓ Share your experiences but don't give medical advice</p>
                  <p>✓ Protect your privacy and personal information</p>
                  <p>✓ Report any concerns to community moderators</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-medium">Diabetes Management Webinar</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 6:00 PM</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-3">
                    <p className="font-medium">Mental Health Support Circle</p>
                    <p className="text-sm text-muted-foreground">Saturday, 11:00 AM</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-3">
                    <p className="font-medium">Nutrition for Heart Health</p>
                    <p className="text-sm text-muted-foreground">Next Tuesday, 7:30 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Events</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default PatientCommunity;
