import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Shield, CreditCard, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Subscription = () => {
  useEffect(() => {
    document.title = "Premium Plans - MediLog";
  }, []);

  // Business model highlights
  const standardFeatures = [
    "Basic health tracking", 
    "Limited appointment scheduling",
    "Medication reminders (max 5)",
    "Basic health tips"
  ];
  
  const premiumFeatures = [
    "Unlimited health tracking",
    "Priority appointment scheduling",
    "Unlimited medication reminders",
    "Premium health tips and personalized recommendations",
    "24/7 telemedicine access",
    "Priority customer support",
    "Health data exports",
    "Family account management"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Subscription Plans
              </span>
            </motion.div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Elevate Your Healthcare Experience
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their healthcare journey with our subscription plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <Card className="border-border/50 shadow-md transform transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">Standard Plan</CardTitle>
                <CardDescription>Basic healthcare management</CardDescription>
                <div className="mt-2 text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {standardFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {premiumFeatures.slice(4).map((feature, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 text-red-400 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.success("Standard plan selected. Proceeding to checkout...")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary shadow-lg bg-primary/5 transform transition-all duration-300 hover:shadow-xl relative">
              <div className="absolute -top-3 right-8 bg-primary text-white px-3 py-1 rounded-md text-sm font-medium">
                Most Popular
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl text-primary">Premium Plan</CardTitle>
                <CardDescription>Complete healthcare solution</CardDescription>
                <div className="mt-2 text-3xl font-bold">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[...standardFeatures, ...premiumFeatures].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => toast.success("Premium plan selected. Proceeding to checkout...")}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-10 p-4 bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-300">Demo Mode</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300/80">
                  This is a demonstration version. In a real application, you would be redirected to a payment processor. For now, just click "Subscribe Now" to simulate payment.
                </p>
              </div>
            </div>
          </div>
          
          <SubscriptionPlans />
          
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Secure Subscription Management</h2>
            <p className="text-muted-foreground">
              All subscriptions are managed securely. You can cancel anytime through your account settings. Your data is always protected and remains yours after cancellation.
            </p>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Subscription;
