
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

type PlanType = "doctor";

const SubscriptionPlans = () => {
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const [activePlan, setActivePlan] = useState<PlanType | null>(
    localStorage.getItem("subscriptionPlan") as PlanType | null
  );

  const handleSubscribe = (planType: PlanType) => {
    setLoadingPlan(planType);
    
    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem("subscriptionPlan", planType);
      setActivePlan(planType);
      setLoadingPlan(null);
      
      toast.success("Premium subscription activated successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Premium Doctor Plan */}
      <Card className={`p-6 shadow-lg border-2 ${activePlan === "doctor" ? "border-primary" : "border-border/30"}`}>
        <div className="relative">
          {activePlan === "doctor" && (
            <div className="absolute -top-2 -right-2 p-1 bg-primary rounded-full text-primary-foreground">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <ClipboardCheck className="h-5 w-5 text-green-500" />
              Premium Plan
            </div>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">R1,999</span>
              <span className="text-muted-foreground ml-1">/ month</span>
            </div>
          </div>
          
          <ul className="space-y-2 my-6">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>Unlimited patient consultations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>Advanced recording and transcription tools</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>Digital prescription generator</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>Patient history management</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>Priority support and updates</span>
            </li>
          </ul>
          
          <Button 
            onClick={() => handleSubscribe("doctor")}
            className="w-full"
            disabled={loadingPlan !== null || activePlan === "doctor"}
            variant={activePlan === "doctor" ? "outline" : "default"}
          >
            {loadingPlan === "doctor" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : activePlan === "doctor" ? (
              "Currently Active"
            ) : (
              "Subscribe Now"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
