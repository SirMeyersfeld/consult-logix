
import React from 'react';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      comment: "MediLog has transformed my practice. The digital prescription generator and patient history management tools have streamlined my workflow and reduced administrative tasks by 60%.",
      image: "/placeholder.svg",
      initials: "SJ",
      rating: 5
    },
    {
      name: "Michael Peterson",
      role: "Patient",
      comment: "I've been using MediLog for six months now, and it has made managing my chronic condition so much easier. The medication reminders are invaluable, and I love having all my health information in one place.",
      image: "/placeholder.svg",
      initials: "MP",
      rating: 5
    },
    {
      name: "Dr. Emily Chen",
      role: "General Practitioner",
      comment: "The telemedicine features are excellent. I can provide care to patients regardless of location, and the consultation recording feature helps both me and my patients review important information later.",
      image: "/placeholder.svg",
      initials: "EC",
      rating: 4
    },
    {
      name: "Thabo Molefe",
      role: "Patient",
      comment: "MediPort has been a lifesaver during my travels. When I needed emergency care abroad, I was able to show my medical history and allergies to the doctor immediately.",
      image: "/placeholder.svg",
      initials: "TM",
      rating: 5
    },
    {
      name: "Lerato Ndlovu",
      role: "Patient",
      comment: "I appreciate how easy it is to book appointments and communicate with my healthcare team. The health tracking features have helped me take better control of my wellbeing.",
      image: "/placeholder.svg",
      initials: "LN",
      rating: 4
    },
    {
      name: "Dr. James Wilson",
      role: "Pediatrician",
      comment: "As a pediatrician, I find the platform incredibly useful for helping parents track their children's vaccinations and development milestones. The user interface is intuitive and parent-friendly.",
      image: "/placeholder.svg",
      initials: "JW",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">What People Are Saying</h1>
          <p className="text-muted-foreground mb-8 text-center max-w-xl mx-auto">
            Discover how MediLog is transforming healthcare experiences for both patients and healthcare providers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-gray-200" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join thousands of satisfied users</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Experience the future of healthcare with MediLog's comprehensive platform
            </p>
            <a href="/sign-up" className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Sign Up Today
            </a>
          </div>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default Testimonials;
