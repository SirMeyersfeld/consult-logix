
import Navbar from '@/components/Navbar';
import ConsultationForm from '@/components/ConsultationForm';
import AnimatedTransition from '@/components/AnimatedTransition';

const Consultation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">New Medical Consultation</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Record all details of the current consultation including symptoms, diagnosis, and treatment plan.
            </p>
          </div>
        </AnimatedTransition>
        
        <ConsultationForm />
      </main>
    </div>
  );
};

export default Consultation;
