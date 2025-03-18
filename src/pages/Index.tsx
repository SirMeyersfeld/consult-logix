
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <AnimatedTransition delay={0.2} type="fadeInUp">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Streamlined Healthcare
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transforming medical consultations with <span className="text-primary">MediLog</span>
                </h1>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.4} type="fadeInUp">
              <p className="text-lg text-muted-foreground">
                When you visit a doctor, MediLog records the entire consultation—capturing your symptoms, diagnosis, and treatment plan. It generates digital prescriptions and updates your medical history instantly.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.6} type="fadeInUp">
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  onClick={() => navigate('/consultation')}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/mediport')}
                  className="h-12 px-8 border-primary text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  View MediPort
                </Button>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.8} type="fadeInUp">
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white flex items-center justify-center font-medium text-blue-700">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">2,000+</span> medical professionals trust MediLog
                </p>
              </div>
            </AnimatedTransition>
          </div>
          
          <AnimatedTransition delay={0.5} type="popIn" className="flex-1">
            <div className="relative aspect-square max-w-lg w-full mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl transform rotate-6 shadow-subtle"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 backdrop-blur-sm rounded-3xl shadow-inner-glow"></div>
              
              {/* Main content area */}
              <div className="absolute inset-2 rounded-2xl bg-white shadow-lg overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-5 w-40 bg-primary/20 rounded-full"></div>
                    <div className="w-8"></div>
                  </div>
                  
                  {/* Content area */}
                  <div className="flex-grow p-6 space-y-4">
                    <div className="h-8 w-2/3 bg-gray-100 rounded-full"></div>
                    
                    <div className="space-y-2 mt-6">
                      <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-4 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-4 w-4/5 bg-gray-100 rounded-full"></div>
                    </div>
                    
                    <div className="pt-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 right-6">
                      <div className="h-10 w-10 rounded-full bg-primary shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-xl transform rotate-12 animate-float shadow-subtle"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full animate-float shadow-subtle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/4 -right-8 w-16 h-16 bg-primary/20 rounded-lg transform -rotate-12 animate-float shadow-subtle" style={{ animationDelay: '2s' }}></div>
            </div>
          </AnimatedTransition>
        </div>
        
        <section className="mt-32 mb-16">
          <AnimatedTransition type="fadeInUp" delay={0.3}>
            <h2 className="text-3xl font-bold text-center mb-16">Experience the future of medical records</h2>
          </AnimatedTransition>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Recording",
                description: "Capture every detail of your doctor's consultation, from symptoms to diagnosis.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                )
              },
              {
                title: "Digital Prescriptions",
                description: "No more paper prescriptions. Get digital prescriptions delivered instantly.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12h6"></path>
                    <path d="M12 9v6"></path>
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"></path>
                  </svg>
                )
              },
              {
                title: "MediPort Health Passport",
                description: "Your complete medical history, always up to date and accessible.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <AnimatedTransition key={index} delay={0.3 + index * 0.2} type="fadeInUp">
                <div className="p-6 rounded-xl bg-white shadow-subtle border border-border/40 hover:shadow-elevation transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        <section className="py-16">
          <div className="text-center space-y-4">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <h2 className="text-3xl font-bold mb-8">Ready to modernize your healthcare experience?</h2>
            </AnimatedTransition>
            
            <AnimatedTransition type="fadeInUp" delay={0.4}>
              <Button 
                onClick={() => navigate('/consultation')}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Now
              </Button>
            </AnimatedTransition>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                  <div className="absolute w-3 h-3 rounded-full bg-primary" />
                </div>
                <span className="text-xl font-semibold">MediLog</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Modernizing healthcare, one consultation at a time.</p>
            </div>
            
            <div className="flex gap-8">
              <div className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy Policy</div>
              <div className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms of Service</div>
              <div className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contact Us</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">© 2024 MediLog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
