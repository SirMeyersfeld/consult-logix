
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Telemedicine: Benefits and Limitations",
      excerpt: "Telemedicine has revolutionized healthcare access, but it's important to understand when it's appropriate and when an in-person visit is necessary.",
      author: "Dr. Emily Chen",
      date: "June 15, 2023",
      readTime: "8 min read",
      image: "/placeholder.svg",
      categories: ["Telemedicine", "Healthcare"]
    },
    {
      id: 2,
      title: "Managing Chronic Conditions with Digital Health Tools",
      excerpt: "Digital health tools are transforming how patients with chronic conditions monitor and manage their health. Learn about the latest innovations.",
      author: "Dr. James Wilson",
      date: "May 22, 2023",
      readTime: "10 min read",
      image: "/placeholder.svg",
      categories: ["Digital Health", "Chronic Care"]
    },
    {
      id: 3,
      title: "The Importance of Medication Adherence",
      excerpt: "Medication adherence is crucial for treatment success. Discover effective strategies and tools to help you stay on track with your prescriptions.",
      author: "Lisa Thompson, PharmD",
      date: "April 30, 2023",
      readTime: "6 min read",
      image: "/placeholder.svg",
      categories: ["Medication", "Patient Care"]
    },
    {
      id: 4,
      title: "Preventive Health Screenings: What You Need to Know",
      excerpt: "Regular health screenings can detect problems before they start. Learn which screenings are recommended at different life stages.",
      author: "Dr. Sarah Johnson",
      date: "April 12, 2023",
      readTime: "7 min read",
      image: "/placeholder.svg",
      categories: ["Preventive Care", "Screenings"]
    },
    {
      id: 5,
      title: "Mental Health in the Digital Age",
      excerpt: "Digital tools are making mental healthcare more accessible than ever. Explore how technology is breaking down barriers to mental health support.",
      author: "Dr. Michael Ndlovu",
      date: "March 25, 2023",
      readTime: "9 min read",
      image: "/placeholder.svg",
      categories: ["Mental Health", "Digital Therapy"]
    },
    {
      id: 6,
      title: "Nutrition Myths Debunked by Medical Professionals",
      excerpt: "There's a lot of conflicting nutrition information online. Medical professionals clarify common misconceptions about diet and health.",
      author: "Dr. Anita Patel, Nutritionist",
      date: "February 18, 2023",
      readTime: "8 min read",
      image: "/placeholder.svg",
      categories: ["Nutrition", "Wellness"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Health Insights Blog</h1>
          <p className="text-muted-foreground mb-8">Expert articles and insights on health, wellness, and medical technology</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <div className="aspect-video relative bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-0">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get the latest health insights, tips, and medical news delivered to your inbox
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default Blog;
