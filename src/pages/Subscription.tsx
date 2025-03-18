
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Shield, CreditCard } from "lucide-react";

const Subscription = () => {
  useEffect(() => {
    document.title = "Subscription Plans - MediLog";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">MediLog Subscription Plans</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs. Unlock the full potential of MediLog with our premium subscriptions.
            </p>
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
